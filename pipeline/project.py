"""Shared project IO, fingerprints and capability checks (standard library only)."""
from __future__ import annotations

import hashlib
import importlib.util
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]


def read_json(path: Path):
    if path.name in {"words.json", "sentences.json"}:
        raise ValueError("Legacy restricted timing files are not pipeline inputs")
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, value):
    write_text(path, json.dumps(value, ensure_ascii=False, indent=2, allow_nan=False) + "\n")


def write_text(path: Path, content: str):
    path.parent.mkdir(parents=True, exist_ok=True)
    handle, temporary = tempfile.mkstemp(prefix=path.name, suffix=".tmp", dir=path.parent)
    try:
        with os.fdopen(handle, "w", encoding="utf-8", newline="\n") as stream:
            stream.write(content)
        os.replace(temporary, path)
    finally:
        if Path(temporary).exists():
            Path(temporary).unlink()


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def data_hash(value) -> str:
    return hashlib.sha256(json.dumps(value, sort_keys=True, ensure_ascii=False, allow_nan=False).encode()).hexdigest()


def project_path(value: str) -> Path:
    result = (ROOT / "videos" / value).resolve()
    videos = (ROOT / "videos").resolve()
    if result == videos or videos not in result.parents:
        raise ValueError("Project must be a specific folder inside videos/")
    return result


def new_project(slug: str) -> Path:
    if not re.fullmatch(r"[a-z0-9][a-z0-9/-]*", slug) or any(p in {"", ".", ".."} for p in slug.split("/")):
        raise ValueError("Use a lowercase video slug, optionally grouped by style")
    path = project_path(slug)
    if path.exists():
        raise FileExistsError(f"Project already exists: {path}. Resume it instead of overwriting.")
    return path


def within(project: Path, relative: str) -> Path:
    path = (project / relative).resolve()
    if project.resolve() not in path.parents:
        raise ValueError(f"Path outside project: {relative}")
    return path


def run(command: list[str]) -> subprocess.CompletedProcess:
    return subprocess.run(command, capture_output=True, text=True, encoding="utf-8", errors="replace", check=True, cwd=ROOT)


def capabilities(model: str | None = None) -> dict:
    cached = local_model()
    return {"schemaVersion": 1, "ffprobe": shutil.which("ffprobe"), "ffmpeg": shutil.which("ffmpeg"),
            "node": shutil.which("node"), "npm": shutil.which("npm.cmd") or shutil.which("npm"),
            "fasterWhisper": importlib.util.find_spec("faster_whisper") is not None,
            "localModel": str(Path(model).resolve()) if model and Path(model).is_dir() else str(cached) if cached else None,
            "motionValidator": (ROOT / "pipeline/qa/validate_motion.mjs").is_file(),
            "rendererInvokedByPrepare": False}


def local_model() -> Path | None:
    """Discover complete cached CTranslate2 models by metadata only; never download."""
    roots = [ROOT / 'models', Path(os.environ.get('HF_HOME', str(Path.home() / '.cache/huggingface'))) / 'hub']
    for key in ['HF_HUB_CACHE', 'HUGGINGFACE_HUB_CACHE']:
        if os.environ.get(key):
            roots.insert(0, Path(os.environ[key]))
    for name in ['medium', 'small', 'base', 'large-v3-turbo', 'large-v3', 'tiny']:
        for base in roots:
            candidates = [base / name]
            candidates += sorted((base / f'models--Systran--faster-whisper-{name}' / 'snapshots').glob('*'))
            for candidate in candidates:
                if all((candidate / f).is_file() for f in ['model.bin', 'config.json', 'tokenizer.json']):
                    return candidate.resolve()
    return None


def source_permission(project: Path) -> tuple[dict, Path]:
    manifest = read_json(project / "project.json")
    if not manifest.get("sourcePermission", {}).get("localProcessing"):
        raise PermissionError("Local processing of the selected raw has not been authorized")
    raw = Path(manifest["source"]["path"]).resolve()
    if not raw.is_file():
        raise FileNotFoundError(raw)
    if sha256(raw) != manifest["source"]["sha256"]:
        raise ValueError("Raw changed since registration; register a new version, do not reuse old timing")
    return manifest, raw
