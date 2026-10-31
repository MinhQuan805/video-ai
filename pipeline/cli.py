"""Local preparation CLI. No renderer, publish command, or implicit render approval."""
from __future__ import annotations
import argparse
from pathlib import Path
import sys

if __package__ in {None, ''}:
    sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from pipeline.project import capabilities, data_hash, project_path, read_json, write_json
from pipeline.intake.register_raw import register
from pipeline.intake.mount_source import mount
from pipeline.audio.transcribe_raw import transcribe, measure_audio
from pipeline.timing.build_timeline import build
from pipeline.timing.resolve_motion import resolve
from pipeline.creative.planning import scaffold, history_candidates, remember_candidates
from pipeline.qa.prepare_checks import static_qa, fingerprint_project
from pipeline.packaging.approval_packet import packet


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest='command', required=True)
    sub.add_parser('capabilities')
    intake = sub.add_parser('intake')
    intake.add_argument('--raw', required=True); intake.add_argument('--slug', required=True)
    intake.add_argument('--allow-media', action='store_true'); intake.add_argument('--version', default='v1')
    prepare = sub.add_parser('prepare')
    prepare.add_argument('--project', required=True); prepare.add_argument('--model')
    prepare.add_argument('--allow-model-download', action='store_true')
    qa = sub.add_parser('qa'); qa.add_argument('--project', required=True); qa.add_argument('--typecheck', action='store_true')
    status = sub.add_parser('status'); status.add_argument('--project', required=True)
    args = parser.parse_args(argv)
    import json
    try:
        if args.command == 'capabilities':
            result = capabilities()
        elif args.command == 'intake':
            project = register(args.raw, args.slug, args.allow_media, args.version)
            result = {'project': str(project), 'state': 'REGISTERED'}
        else:
            project = project_path(args.project)
            config = read_json(project / 'project.json')
            if args.command == 'prepare':
                write_json(project / 'analysis/capabilities.json', capabilities(args.model))
                transcribe(project, args.model, args.allow_model_download)
                timeline = build(project)
                resolve(project, timeline)
                plan = scaffold(project, timeline)
                measure_audio(project)
                public_path = mount(project)
                matches = history_candidates(project, plan['scenes'])
                write_json(project / 'analysis/design-history-check.json', matches)
                config = read_json(project / 'project.json')
                config['state'] = 'NEEDS_CREATIVE_WORK' if plan.get('status') != 'authored' else 'IMPLEMENTED'
                write_json(project / 'project.json', config)
                result = {'state': config['state'], 'project': str(project), 'publicSource': public_path, 'nextAgentActions': [
                    'Read script.md, timing.txt and edit/scenes.json; author the brief and scene plan using the skills.',
                    'Build project-local scene components using src/motion and src/interactions; write interaction specs when used.',
                    'Run qa --typecheck and fix failures until READY_FOR_APPROVAL. Do not stop at this scaffold or render.']}
            elif args.command == 'qa':
                checked = static_qa(project, args.typecheck)
                result = packet(project, checked)
                if checked['status'] == 'pass':
                    remember_candidates(project, read_json(project / 'edit/scenes.json')['scenes'])
            else:
                state = config.get('state', 'UNKNOWN')
                prepared = config.get('preparedFingerprint')
                stale = bool(prepared and prepared != data_hash(fingerprint_project(project)))
                result = {'projectId': config['projectId'], 'version': config['version'], 'state': 'STALE_PREPARATION' if stale else state,
                          'renderApproved': False, 'stale': stale}
        print(json.dumps(result, ensure_ascii=False, indent=2))
        return 1 if result.get('state') in {'NEEDS_WORK', 'STALE_PREPARATION'} else 0
    except Exception as exc:
        print(json.dumps({'state': 'BLOCKED', 'error': str(exc), 'rendererInvoked': False}, ensure_ascii=False, indent=2))
        return 1


if __name__ == '__main__':
    raise SystemExit(main())
