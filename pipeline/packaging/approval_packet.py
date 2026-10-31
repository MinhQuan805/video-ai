"""Prepare a hash-bound review packet. This module never invokes a renderer."""
from __future__ import annotations
from datetime import datetime, timezone
from pathlib import Path
from pipeline.project import data_hash, read_json, write_json


def packet(project: Path, qa: dict) -> dict:
    config = read_json(project / "project.json")
    state = "READY_FOR_APPROVAL" if qa["status"] == "pass" else "NEEDS_WORK"
    receipt = {"schemaVersion": 1, "projectId": config["projectId"], "version": config["version"], "state": state,
               "preparedAt": datetime.now(timezone.utc).isoformat(), "fingerprint": qa["fingerprint"], "checks": qa,
               "renderApproved": False, "pixelQA": "pending-approved-render", "playbackQA": "pending-approved-render"}
    write_json(project / "approval/manifest.json", receipt)
    lines = [f"# {config['projectId']} / {config['version']}", "", f"State: **{state}**", "",
             f"Fingerprint: `{qa['fingerprint']}`", "", "## Static QA", "", f"Status: {qa['status']}"]
    lines += [f"- {error}" for error in qa.get("errors", [])]
    timeline = read_json(project / 'edit/timeline.json')
    plan = read_json(project / 'edit/scenes.json')
    lines += ['', '## Source / edit / settings', '',
              f"Raw: {config['source']['durationMs']} ms; edit: {timeline['durationMs']} ms; {config['fps']} fps; canvas: {config['canvas']['width']} × {config['canvas']['height']}.",
              '', '## Creative direction', '', (project / 'edit/creative-brief.md').read_text(encoding='utf-8'),
              '', '## Scene plan', '', '| Scene | Edit ms | Coverage | Action | Rationale |', '| --- | --- | --- | --- | --- |']
    clean = lambda value: str(value).replace('|', '/').replace('\n', ' ')
    for scene in plan.get('scenes', []):
        lines.append(f"| {clean(scene['id'])} | {scene['startMs']}–{scene['endMs']} | {clean(scene.get('coverage', ''))} | {clean(scene.get('primaryAction', ''))} | {clean(scene.get('visualRationale', ''))} |")
    lines += ['', '## Audio warnings', ''] + [f'- {warning}' for warning in qa.get('audio', {}).get('warnings', [])]
    lines += ['', '## Asset provenance', '', 'See image-sources.md for any downloaded standalone assets. Code-drawn artwork and configured fonts must match the creative brief.']
    lines += ["", "## Chưa xác minh bằng output render", "", "Pixel, font appearance, actual motion playback and final audio/video sync remain pending.",
              "", "Render requires explicit project/version approval in chat; prepare and QA cannot grant it."]
    (project / "approval/packet.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    config["state"] = state
    config["preparedFingerprint"] = qa["fingerprint"]
    write_json(project / "project.json", config)
    snapshot = project / "snapshots" / ("prepare-" + data_hash(qa)[:16] + ".json")
    if not snapshot.exists():
        write_json(snapshot, receipt)
    return receipt
