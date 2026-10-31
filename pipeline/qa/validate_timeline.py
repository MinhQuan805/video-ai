"""Numeric timeline validation, no media access and no renderer."""
from __future__ import annotations
import math


def validate_timeline(timeline: dict) -> list[str]:
    errors = []
    def number(value):
        return isinstance(value, (int, float)) and not isinstance(value, bool) and math.isfinite(value)
    if timeline.get("schemaVersion") != 1 or not number(timeline.get("durationMs")) or timeline["durationMs"] <= 0 or not number(timeline.get("fps")) or timeline["fps"] <= 0:
        return ["Invalid timeline envelope"]
    source_duration = timeline.get("sourceDurationMs")
    if not number(source_duration) or source_duration <= 0:
        return ["Invalid source duration"]
    previous_edit, previous_source = 0, 0
    for span in timeline.get("spans", []):
        keys = ["sourceStartMs", "sourceEndMs", "editStartMs", "editEndMs", "playbackRate"]
        if any(not number(span.get(k)) for k in keys):
            errors.append("Span has non-finite/missing timing"); continue
        if span["playbackRate"] <= 0 or span["sourceStartMs"] < previous_source or span["sourceEndMs"] > source_duration or span["sourceEndMs"] <= span["sourceStartMs"]:
            errors.append("Invalid source span order/range")
        if span["editStartMs"] != previous_edit or span["editEndMs"] <= span["editStartMs"]:
            errors.append("Edit spans must cover the edit clock contiguously")
        if span["playbackRate"] > 0 and abs((span["sourceEndMs"] - span["sourceStartMs"]) / span["playbackRate"] - (span["editEndMs"] - span["editStartMs"])) > 0.01:
            errors.append("Source/edit duration mismatch")
        previous_edit, previous_source = span["editEndMs"], span["sourceEndMs"]
    if previous_edit != timeline["durationMs"]:
        errors.append("Spans do not cover duration")
    ids = set()
    for anchor in timeline.get("anchors", []):
        if not anchor.get("id") or anchor["id"] in ids:
            errors.append("Duplicate/missing anchor id")
        ids.add(anchor.get("id"))
        for entry in [anchor] + anchor.get("words", []):
            start, end = entry.get("startMs"), entry.get("endMs")
            if not number(start) or not number(end) or start < 0 or end <= start or end > timeline["durationMs"]:
                errors.append("Anchor/word outside edit clock")
                continue
            if entry is not anchor and (start < anchor["startMs"] or end > anchor["endMs"]):
                errors.append("Word outside sentence anchor")
    if not timeline.get("anchors"):
        errors.append("No transcript anchors")
    return errors
