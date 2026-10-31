"""Publish an authorized local copy for staticFile; never modify the user's original."""
from __future__ import annotations
from pathlib import Path
import os
import shutil
from pipeline.project import ROOT, sha256, source_permission, write_json


def mount(project: Path) -> str:
    config, raw = source_permission(project)
    suffix = raw.suffix.lower()
    if suffix not in {'.mp4', '.mov', '.mkv', '.webm', '.m4v', '.mp3', '.wav', '.flac', '.m4a', '.ogg'}:
        raise ValueError('Unsupported raw suffix for Remotion source mounting')
    public = (ROOT / 'public').resolve()
    relative = Path('videos') / config['projectId'] / 'input' / (config['source']['sha256'] + suffix)
    destination = (public / relative).resolve()
    if public not in destination.parents:
        raise ValueError('Public source path escaped public/')
    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.exists():
        if sha256(destination) != config['source']['sha256']:
            raise ValueError('Mounted source was changed; preserve it for diagnosis rather than overwriting')
    else:
        temporary = destination.with_suffix(destination.suffix + '.tmp')
        try:
            shutil.copyfile(raw, temporary)
            if sha256(temporary) != config['source']['sha256']:
                raise ValueError('Source changed during mounting')
            os.replace(temporary, destination)
        finally:
            if temporary.exists():
                temporary.unlink()
    config['source']['publicPath'] = relative.as_posix()
    write_json(project / 'project.json', config)
    return relative.as_posix()
