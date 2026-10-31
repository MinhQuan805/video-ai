"""Creative scaffold and metadata-only design memory. The agent authors the actual visual ideas."""
from __future__ import annotations
from pathlib import Path
from pipeline.project import ROOT, data_hash, read_json, write_json


def scaffold(project: Path, timeline: dict):
    destination = project / "edit/scenes.json"
    if destination.exists():
        return read_json(destination)
    scenes = [{"id": f"scene-{i:03}", "startMs": a["startMs"], "endMs": a["endMs"], "anchorIds": [a["id"]],
               "coverage": "graphic", "status": "draft", "visualRationale": "", "primaryAction": "", "componentPath": "",
               "interactionIds": []} for i, a in enumerate(timeline["anchors"])]
    # Preserve pauses/lead-in in scene coverage while leaving semantic anchors unchanged.
    for i, scene in enumerate(scenes):
        scene["startMs"] = 0 if i == 0 else scenes[i - 1]["endMs"]
        scene["endMs"] = timeline["durationMs"] if i == len(scenes) - 1 else timeline["anchors"][i + 1]["startMs"]
    result = {"schemaVersion": 1, "status": "NEEDS_AUTHORING", "timelineHash": data_hash(timeline), "visualSystem": "paper", "scenes": scenes}
    write_json(destination, result)
    brief = project / "edit/creative-brief.md"
    if not brief.exists():
        brief.write_text("# Creative brief\n\nStatus: NEEDS_AUTHORING\n\n"
                         "Paper continuation: #FAF8F5 / #1A1816 / #C6532A; Fraunces + Inter.\n"
                         "Agent: choose the takeaway, visual rationale, primary actions and any new actor design from this raw.\n"
                         "Use source-linked cues and the runtime; do not repeat every sentence as a static card.\n", encoding="utf-8")
    return result


def fingerprint(scene: dict) -> str:
    keys = ["concept", "silhouette", "material", "layout", "choreography"]
    design = scene.get("design", {})
    if not all(isinstance(design.get(k), str) and design[k].strip() for k in keys):
        raise ValueError(f"{scene.get('id')}: supply concept/silhouette/material/layout/choreography for design memory")
    return data_hash({k: design[k].strip().casefold() for k in keys})


def history_candidates(project: Path, scenes: list[dict]) -> list[dict]:
    path = ROOT / "pipeline/creative/design-history.jsonl"
    history = []
    if path.exists():
        import json
        history = [json.loads(line) for line in path.read_text(encoding="utf-8").splitlines() if line.strip()]
    config = read_json(project / "project.json")
    output = []
    for scene in scenes:
        if not scene.get("design"):
            continue
        value = fingerprint(scene)
        similar = [r for r in history if r["fingerprint"] == value and r["projectId"] != config["projectId"]]
        output.append({"sceneId": scene["id"], "fingerprint": value, "matches": similar,
                       "historyStatus": "metadata-available" if history else "history-incomplete"})
    return output


def remember_candidates(project: Path, scenes: list[dict]):
    import json
    config = read_json(project / "project.json")
    path = ROOT / "pipeline/creative/design-history.jsonl"
    existing = path.read_text(encoding="utf-8").splitlines() if path.exists() else []
    records = [json.loads(line) for line in existing if line.strip()]
    keys = {r["recordId"] for r in records}
    for scene in scenes:
        if not scene.get("design"):
            continue
        value = fingerprint(scene)
        record_id = data_hash([config["projectId"], config["version"], scene["id"], value])
        if record_id not in keys:
            records.append({"recordId": record_id, "projectId": config["projectId"], "version": config["version"],
                            "sceneId": scene["id"], "fingerprint": value, "design": scene["design"], "verification": "candidate"})
            keys.add(record_id)
    # Atomic replace, records append semantically. Never invent approval/visual verification.
    from pipeline.project import write_text
    text = "\n".join(json.dumps(r, ensure_ascii=False, sort_keys=True) for r in records) + ("\n" if records else "")
    write_text(path, text)
