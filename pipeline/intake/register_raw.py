"""Register only the explicitly selected, authorized raw. Never rewrite or copy it."""
from __future__ import annotations
from datetime import datetime, timezone
from pathlib import Path
import json
from pipeline.project import capabilities, new_project, run, sha256, write_json


def register(raw_path: str, slug: str, allow_media: bool, version: str = "v1") -> Path:
    if not allow_media:
        raise PermissionError("Use --allow-media only after the user has supplied/authorized this raw for local processing")
    raw = Path(raw_path).resolve(strict=True)
    if not raw.is_file():
        raise ValueError("Raw must be a file")
    project = new_project(slug)
    caps = capabilities()
    if not caps["ffprobe"]:
        raise RuntimeError("Missing local ffprobe; no input was registered")
    probe = json.loads(run([caps["ffprobe"], "-v", "error", "-show_format", "-show_streams", "-of", "json", str(raw)]).stdout)
    streams = probe.get("streams", [])
    duration_ms = round(float(probe["format"]["duration"]) * 1000)
    if duration_ms <= 0 or not any(s.get("codec_type") == "audio" for s in streams):
        raise ValueError("Raw must have a positive duration and an audio stream")
    video = next((s for s in streams if s.get("codec_type") == "video"), None)
    for directory in ["analysis", "input", "edit", "research", "assets/generated", "src", "qa", "snapshots", "output"]:
        (project / directory).mkdir(parents=True, exist_ok=True)
    manifest = {"schemaVersion": 1, "projectId": slug, "version": version, "createdAt": datetime.now(timezone.utc).isoformat(),
                "source": {"id": "raw", "path": str(raw), "sha256": sha256(raw), "durationMs": duration_ms},
                "sourcePermission": {"localProcessing": True, "basis": "explicitly supplied raw; --allow-media acknowledged", "externalUpload": False},
                "fps": 30, "canvas": {"width": video.get("width", 1080) if video else 1080, "height": video.get("height", 1920) if video else 1920},
                "language": "vi", "visualSystem": "paper", "state": "REGISTERED"}
    write_json(project / "project.json", manifest)
    write_json(project / "analysis/probe.json", probe)
    write_json(project / "analysis/capabilities.json", caps)
    return project
