"""Canonical edit clock and source mapping; compatibility exports never own timing."""
from __future__ import annotations
import math
from pathlib import Path
from pipeline.project import read_json, sha256, write_json, write_text


def build_timeline(config: dict, transcript: dict, decisions: dict | None = None) -> dict:
    if transcript.get("sourceHash") != config["source"]["sha256"]:
        raise ValueError("Transcript/source hash mismatch")
    duration = config["source"]["durationMs"]
    if not math.isfinite(duration) or duration <= 0:
        raise ValueError("Invalid source duration")
    kept = (decisions or {}).get("keptSpans", [{"sourceStartMs": 0, "sourceEndMs": duration}])
    if not kept:
        raise ValueError("Edit cannot remove the whole raw")
    spans, anchors = [], []
    edit_ms, previous_end = 0, 0
    words = [w for s in transcript.get("segments", []) for w in s.get("words", [])]
    for index, item in enumerate(kept):
        start, end = item["sourceStartMs"], item["sourceEndMs"]
        if not all(isinstance(v, (int, float)) and math.isfinite(v) for v in [start, end]) or start < previous_end or start < 0 or end <= start or end > duration:
            raise ValueError("Kept spans must be ordered, non-overlapping and inside source")
        for boundary in [start, end]:
            if any(w["startMs"] < boundary < w["endMs"] for w in words):
                raise ValueError(f"Cut at {boundary}ms splits a spoken word")
        rate = item.get("playbackRate", 1)
        if rate != 1:
            raise ValueError("Raw voice speed stays at 1; speed changes require a separately reviewed edit policy")
        span = {"id": f"span-{index:03}", "sourceId": "raw", "sourceStartMs": start, "sourceEndMs": end,
                "editStartMs": edit_ms, "editEndMs": edit_ms + end - start, "playbackRate": 1}
        spans.append(span)
        for segment in transcript.get("segments", []):
            lo, hi = max(start, segment["startMs"]), min(end, segment["endMs"])
            if lo >= hi:
                continue
            selected = [w for w in segment.get("words", []) if w["startMs"] >= start and w["endMs"] <= end]
            if (lo != segment["startMs"] or hi != segment["endMs"]) and not selected:
                raise ValueError("A partial sentence cut needs word timestamps")
            text = segment["text"] if lo == segment["startMs"] and hi == segment["endMs"] else " ".join(w["text"] for w in selected)
            anchor = {"id": f"{segment['id']}@{index}", "text": text, "startMs": edit_ms + lo - start,
                      "endMs": edit_ms + hi - start, "sourceStartMs": lo, "sourceEndMs": hi, "words": []}
            for word in selected:
                anchor["words"].append({**word, "id": f"{word['id']}@{index}", "startMs": edit_ms + word["startMs"] - start,
                                        "endMs": edit_ms + word["endMs"] - start})
            anchors.append(anchor)
        edit_ms = span["editEndMs"]
        previous_end = end
    return {"schemaVersion": 1, "fps": config["fps"], "sourceHash": config["source"]["sha256"],
            "sourceDurationMs": duration, "durationMs": edit_ms, "spans": spans, "anchors": anchors}


def build(project: Path) -> dict:
    config = read_json(project / "project.json")
    transcript = read_json(project / "analysis/transcript.json")
    decision_file = project / "edit/decisions.json"
    timeline = build_timeline(config, transcript, read_json(decision_file) if decision_file.exists() else None)
    write_json(project / "edit/timeline.json", timeline)
    # Canonical exports with original confidence/provenance; no restricted words.json/sentences.json inputs.
    write_json(project / "edit/captions.json", {"schemaVersion": 1, "sourceHash": timeline["sourceHash"], "phrases": timeline["anchors"]})
    exports = project / 'analysis/text-exports.json'
    hashes = read_json(exports) if exports.exists() else {}
    content = {'script.md': "\n\n".join(a["text"] for a in timeline["anchors"]) + "\n",
               'timing.txt': "\n".join(f"{a['startMs']} - {a['endMs']} ms: {a['text']}" for a in timeline["anchors"]) + "\n"}
    for name, text in content.items():
        path = project / name
        if path.exists() and sha256(path) != hashes.get(name):
            raise ValueError(f'{name} was supplied/modified by the user; reconcile it explicitly, do not overwrite it')
        write_text(path, text)
        hashes[name] = sha256(path)
    write_json(exports, hashes)
    return timeline
