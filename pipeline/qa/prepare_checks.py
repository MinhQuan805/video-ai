"""Bind timeline, authored creative plan, motion, audio and compiler evidence before approval."""
from __future__ import annotations
import json
from pathlib import Path
import subprocess
from pipeline.project import ROOT, capabilities, data_hash, read_json, sha256, source_permission, within, write_json
from pipeline.qa.validate_timeline import validate_timeline
from pipeline.timing.resolve_motion import resolve


def fingerprint_project(project: Path) -> dict:
    config = read_json(project / "project.json")
    names = ["edit/timeline.json", "edit/scenes.json", "edit/creative-brief.md", "edit/interactions.json", "edit/interaction-cues.json", "edit/captions.json", "edit/decisions.json", "qa/audio.json"]
    hashes = {name: sha256(project / name) if (project / name).is_file() else None for name in names}
    scene_file = project / "edit/scenes.json"
    if scene_file.exists():
        for scene in read_json(scene_file).get("scenes", []):
            if scene.get("componentPath"):
                path = within(project, scene["componentPath"])
                hashes[scene["componentPath"]] = sha256(path) if path.is_file() else None
    for directory in [project / 'src', ROOT / "src/motion", ROOT / "src/interactions", ROOT / 'src/shared', ROOT / 'src/visual-systems/paper']:
        if directory.is_dir():
            for path in sorted(directory.rglob('*')):
                if path.is_file() and path.suffix in {'.ts', '.tsx', '.json', '.mjs', '.js'} and not path.name.startswith('.'):
                    key = str(path.relative_to(project)) if project in path.parents else str(path.relative_to(ROOT))
                    hashes[key] = sha256(path)
    for name in ['package.json', 'package-lock.json', 'tsconfig.json']:
        if (ROOT / name).is_file():
            hashes[name] = sha256(ROOT / name)
        if (project / name).is_file():
            hashes[f'project:{name}'] = sha256(project / name)
    public_rel = config.get('source', {}).get('publicPath')
    if public_rel:
        mounted = ROOT / 'public' / public_rel
        if mounted.is_file():
            hashes['mounted_source'] = sha256(mounted)
    actual_source_hash = sha256(Path(config['source']['path'])) if config.get('sourcePermission', {}).get('localProcessing') and Path(config['source']['path']).is_file() else None
    return {"projectId": config["projectId"], "version": config["version"], "sourceHash": actual_source_hash,
            "fps": config["fps"], "canvas": config["canvas"], "hashes": hashes}


def static_qa(project: Path, typecheck: bool = False) -> dict:
    config, _ = source_permission(project)
    errors = []
    timeline = read_json(project / "edit/timeline.json")
    resolve(project, timeline)
    errors.extend(validate_timeline(timeline))
    if timeline.get("sourceHash") != config["source"]["sha256"]:
        errors.append("Timeline sourceHash is stale")
    plan = read_json(project / "edit/scenes.json")
    if plan.get("status") != "authored" or plan.get("timelineHash") != data_hash(timeline):
        errors.append("Scene plan is un-authored or stale; agent must design scenes, not present scaffold as finished")
    brief_file = project / "edit/creative-brief.md"
    if not brief_file.exists() or "NEEDS_AUTHORING" in brief_file.read_text(encoding='utf-8'):
        errors.append("Creative brief still needs authoring")
    ids = {a["id"] for a in timeline.get("anchors", [])}
    previous = 0
    interaction_ids = set()
    motion_file = project / "edit/interactions.json"
    motion = None
    if motion_file.exists():
        motion = read_json(motion_file)
        interaction_ids = {i.get("id") for i in motion.get("interactions", [])}
        if motion.get("durationMs") != timeline["durationMs"]:
            errors.append("Motion duration differs from canonical timeline")
        if motion.get('timelineHash') and motion['timelineHash'] != data_hash(timeline):
            errors.append('Motion events have a stale timeline hash')
    scenes = plan.get("scenes", [])
    for scene in scenes:
        if scene.get("startMs") != previous or not isinstance(scene.get("endMs"), (int, float)) or scene["endMs"] <= previous:
            errors.append(f"{scene.get('id')}: scene coverage gap/order")
        previous = scene.get("endMs", previous)
        if not scene.get("visualRationale") or scene.get("status") != "authored":
            errors.append(f"{scene.get('id')}: missing authored visual rationale")
        if not scene.get("anchorIds") or any(a not in ids for a in scene["anchorIds"]):
            errors.append(f"{scene.get('id')}: unknown/missing semantic anchors")
        if scene.get("coverage") == "graphic" and not scene.get("primaryAction"):
            errors.append(f"{scene.get('id')}: graphic beat requires a primary motion")
        if not scene.get("componentPath"):
            errors.append(f"{scene.get('id')}: missing component source")
        elif not within(project, scene["componentPath"]).is_file():
            errors.append(f"{scene.get('id')}: component source not found")
        if any(i not in interaction_ids for i in scene.get("interactionIds", [])):
            errors.append(f"{scene.get('id')}: missing interaction spec")
    if previous != timeline["durationMs"]:
        errors.append("Scene plan does not cover edited duration")
    caps = capabilities()
    motion_report = {"status": "not-used", "pixel": "pending"}
    if motion:
        if not caps["node"]:
            errors.append("Node required to check declared interactions")
        else:
            result = subprocess.run([caps["node"], str(ROOT / "pipeline/qa/validate_motion.mjs"), "--input", str(motion_file)],
                                    capture_output=True, text=True, encoding="utf-8", errors="replace", cwd=ROOT)
            try:
                motion_report = json.loads(result.stdout)
            except ValueError:
                motion_report = {"status": "fail", "diagnostic": result.stderr[-3000:]}
            if result.returncode or motion_report["status"] != "pass":
                errors.append("Numeric motion QA failed")
    audio_file = project / "qa/audio.json"
    audio = read_json(audio_file) if audio_file.exists() else {"status": "missing"}
    if audio.get("status") != "pass" or audio.get("sourceHash") != config["source"]["sha256"] or audio.get('timelineHash') != data_hash(timeline):
        errors.append("Audio signal QA missing, failed or stale")
    signature = fingerprint_project(project)
    fingerprint = data_hash(signature)
    compiler = project / "qa/typecheck.json"
    if typecheck:
        if not caps["npm"]:
            errors.append("npm unavailable for typecheck")
        else:
            result = subprocess.run([caps["npm"], "exec", "--no", "--", "tsc", "--noEmit"], cwd=ROOT, capture_output=True,
                                    text=True, encoding="utf-8", errors="replace")
            write_json(compiler, {"fingerprint": fingerprint, "status": "pass" if result.returncode == 0 else "fail",
                                  "method": "npm exec --no -- tsc --noEmit", "diagnostic": (result.stdout + result.stderr)[-8000:]})
    receipt = read_json(compiler) if compiler.exists() else {}
    if receipt.get("status") != "pass" or receipt.get("fingerprint") != fingerprint:
        errors.append("Matching TypeScript check required; use qa --typecheck after authoring")
    result = {"schemaVersion": 1, "status": "fail" if errors else "pass", "fingerprint": fingerprint,
              "inputs": signature, "errors": errors, "motion": motion_report, "audio": audio,
              "pixel": "pending-approved-render", "playback": "pending-approved-render"}
    write_json(project / "qa/static.json", result)
    return result
