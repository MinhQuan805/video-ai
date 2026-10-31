"""Resolve shared motion event times from stable transcript anchors."""
from __future__ import annotations
import math
from pathlib import Path
from pipeline.project import data_hash, read_json, write_json


def resolve_motion(cues: dict, timeline: dict) -> dict:
    anchors = {item['id']: item for item in timeline['anchors']}
    anchors.update({w['id']: w for item in timeline['anchors'] for w in item.get('words', [])})
    interactions = []
    for cue in cues.get('interactions', []):
        if cue.get('anchorId') not in anchors or cue.get('anchorEdge', 'start') not in {'start', 'end'}:
            raise ValueError(f"{cue.get('id')}: unknown anchor or edge")
        anchor = anchors[cue['anchorId']]
        time = anchor['startMs' if cue.get('anchorEdge', 'start') == 'start' else 'endMs']
        spec = dict(cue['spec'])
        offsets = cue.get('timeOffsetsMs', {})
        if not offsets:
            raise ValueError('An anchored interaction needs phase offsets')
        for key, offset in offsets.items():
            if not key.endswith('Ms') or not isinstance(offset, (int, float)) or not math.isfinite(offset):
                raise ValueError('Phase offsets must be finite milliseconds')
            if key in spec:
                raise ValueError('Phase time must come from its anchor, not two sources')
            spec[key] = time + offset
        interactions.append({'id': cue['id'], 'kind': cue['kind'], 'spec': spec})
    return {'schemaVersion': 1, 'durationMs': timeline['durationMs'], 'safeBounds': cues['safeBounds'],
            'timelineHash': data_hash(timeline), 'cuesHash': data_hash(cues), 'interactions': interactions}


def resolve(project: Path, timeline: dict) -> dict | None:
    path = project / 'edit/interaction-cues.json'
    if not path.exists():
        return None
    result = resolve_motion(read_json(path), timeline)
    write_json(project / 'edit/interactions.json', result)
    return result
