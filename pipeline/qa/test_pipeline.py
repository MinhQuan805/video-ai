"""Synthetic metadata tests. No real raw, WAV, MP4 or rendered composition is opened."""
from __future__ import annotations
import contextlib
import copy
import io
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

from pipeline.project import data_hash, read_json, sha256, within, write_json
from pipeline.timing.build_timeline import build, build_timeline
from pipeline.qa.validate_timeline import validate_timeline
from pipeline.qa.prepare_checks import fingerprint_project, static_qa
from pipeline.packaging.approval_packet import packet
from pipeline.creative.planning import fingerprint, scaffold
from pipeline.cli import main
from pipeline.timing.resolve_motion import resolve_motion
from pipeline.audio.transcribe_raw import measure_audio


class PipelineTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix='paper-runtime-')
        self.project = Path(self.temp.name)
        raw = self.project / 'synthetic.bin'
        raw.write_bytes(b'not media: synthetic input fingerprint')
        self.config = {'schemaVersion': 1, 'projectId': 'synthetic-test', 'version': 'v1', 'fps': 30,
                       'canvas': {'width': 1080, 'height': 1920}, 'state': 'REGISTERED',
                       'sourcePermission': {'localProcessing': True},
                       'source': {'path': str(raw), 'sha256': sha256(raw), 'durationMs': 4000}}
        self.transcript = {'schemaVersion': 1, 'sourceHash': self.config['source']['sha256'], 'segments': [
            {'id': 's0', 'text': 'Hello paper', 'startMs': 100, 'endMs': 900, 'words': [
                {'id': 'w0', 'text': 'Hello', 'startMs': 100, 'endMs': 400}, {'id': 'w1', 'text': 'paper', 'startMs': 450, 'endMs': 900}]},
            {'id': 's1', 'text': 'Move the card', 'startMs': 1100, 'endMs': 3500, 'words': [
                {'id': 'w2', 'text': 'Move', 'startMs': 1100, 'endMs': 1500}, {'id': 'w3', 'text': 'the', 'startMs': 1600, 'endMs': 1800},
                {'id': 'w4', 'text': 'card', 'startMs': 1900, 'endMs': 3500}]}]}
        write_json(self.project / 'project.json', self.config)
        write_json(self.project / 'analysis/transcript.json', self.transcript)

    def tearDown(self):
        self.temp.cleanup()

    def authored(self):
        timeline = build(self.project)
        plan = scaffold(self.project, timeline)
        plan['status'] = 'authored'
        (self.project / 'src').mkdir(exist_ok=True)
        (self.project / 'src/Scene.tsx').write_text('export const sceneLabel = "paper";\n', encoding='utf-8')
        for scene in plan['scenes']:
            scene.update(status='authored', componentPath='src/Scene.tsx', visualRationale='Keep the idea legible', primaryAction='queue')
        write_json(self.project / 'edit/scenes.json', plan)
        (self.project / 'edit/creative-brief.md').write_text('# Paper\nOne primary action, then hold.\n', encoding='utf-8')
        write_json(self.project / 'qa/audio.json', {'status': 'pass', 'sourceHash': self.config['source']['sha256'], 'timelineHash': data_hash(timeline), 'method': 'synthetic-test'})
        write_json(self.project / 'qa/typecheck.json', {'status': 'pass', 'fingerprint': data_hash(fingerprint_project(self.project)), 'method': 'test-fixture-only'})
        return timeline, plan

    def test_cut_map_projects_words_and_preserves_full_raw_by_default(self):
        original = build_timeline(self.config, self.transcript)
        self.assertEqual(original['durationMs'], 4000)
        cut = build_timeline(self.config, self.transcript, {'keptSpans': [
            {'sourceStartMs': 0, 'sourceEndMs': 900}, {'sourceStartMs': 1100, 'sourceEndMs': 4000}]})
        self.assertEqual(cut['durationMs'], 3800)
        self.assertEqual(cut['anchors'][1]['startMs'], 900)
        self.assertEqual(cut['anchors'][1]['words'][0]['startMs'], 900)
        self.assertEqual(validate_timeline(cut), [])

    def test_word_split_speed_change_and_reorder_are_rejected(self):
        for spans in [[{'sourceStartMs': 200, 'sourceEndMs': 4000}],
                      [{'sourceStartMs': 0, 'sourceEndMs': 4000, 'playbackRate': 2}],
                      [{'sourceStartMs': 1100, 'sourceEndMs': 4000}, {'sourceStartMs': 0, 'sourceEndMs': 900}]]:
            with self.assertRaises(ValueError):
                build_timeline(self.config, self.transcript, {'keptSpans': spans})

    def test_wrong_source_and_nonfinite_clock_fail(self):
        wrong = copy.deepcopy(self.transcript); wrong['sourceHash'] = 'changed'
        with self.assertRaises(ValueError): build_timeline(self.config, wrong)
        bad = build_timeline(self.config, self.transcript); bad['spans'][0]['editEndMs'] = float('nan')
        self.assertTrue(validate_timeline(bad))

    def test_restricted_legacy_inputs_and_path_escape_are_rejected(self):
        with self.assertRaises(ValueError): read_json(self.project / 'words.json')
        with self.assertRaises(ValueError): within(self.project, '../outside.json')

    def test_user_text_is_not_silently_overwritten(self):
        build(self.project)
        text = self.project / 'script.md'
        text.write_text('A user correction', encoding='utf-8')
        with self.assertRaises(ValueError): build(self.project)
        self.assertEqual(text.read_text(encoding='utf-8'), 'A user correction')

    def test_scaffold_cannot_pass_as_authored_video(self):
        timeline = build(self.project); scaffold(self.project, timeline)
        qa = static_qa(self.project)
        self.assertEqual(qa['status'], 'fail')
        self.assertIn('un-authored', ' '.join(qa['errors']))
        receipt = packet(self.project, qa)
        self.assertEqual(receipt['state'], 'NEEDS_WORK')
        self.assertFalse(receipt['renderApproved'])

    def test_prepared_packet_is_bound_to_content_and_never_grants_render(self):
        self.authored()
        qa = static_qa(self.project)
        self.assertEqual(qa['errors'], [])
        receipt = packet(self.project, qa)
        self.assertEqual(receipt['state'], 'READY_FOR_APPROVAL')
        self.assertFalse(receipt['renderApproved'])
        self.assertEqual(receipt['pixelQA'], 'pending-approved-render')
        self.assertIn('Scene plan', (self.project / 'approval/packet.md').read_text(encoding='utf-8'))

    def test_transitive_component_and_raw_changes_invalidate_fingerprint(self):
        self.authored()
        before = data_hash(fingerprint_project(self.project))
        (self.project / 'src/helper.ts').write_text('export const value = 1;\n', encoding='utf-8')
        self.assertNotEqual(before, data_hash(fingerprint_project(self.project)))
        before = data_hash(fingerprint_project(self.project))
        (self.project / 'src/helper.json').write_text('{"value": 1}\n', encoding='utf-8')
        self.assertNotEqual(before, data_hash(fingerprint_project(self.project)))
        before = data_hash(fingerprint_project(self.project))
        Path(self.config['source']['path']).write_bytes(b'changed synthetic input')
        self.assertNotEqual(before, data_hash(fingerprint_project(self.project)))

    def test_cli_has_no_render_or_approve_entrypoint(self):
        with contextlib.redirect_stderr(io.StringIO()):
            for command in ['render', 'approve', 'publish']:
                with self.assertRaises(SystemExit): main([command])

    def test_prepare_directs_agent_to_author_motion_without_asking_user(self):
        with patch('pipeline.cli.project_path', return_value=self.project), patch('pipeline.cli.transcribe'), \
             patch('pipeline.cli.measure_audio'), patch('pipeline.cli.mount', return_value='videos/synthetic/raw.bin'), \
             patch('pipeline.cli.history_candidates', return_value=[]), contextlib.redirect_stdout(io.StringIO()) as output:
            result = main(['prepare', '--project', 'synthetic-test'])
        self.assertEqual(result, 0)
        data = json.loads(output.getvalue())
        self.assertEqual(data['state'], 'NEEDS_CREATIVE_WORK')
        self.assertEqual(len(data['nextAgentActions']), 3)
        self.assertFalse((self.project / 'approval/manifest.json').exists())

    def test_design_memory_tracks_shape_relationship_not_label_color(self):
        design = {'concept': 'delegate', 'silhouette': 'paper-helper', 'material': 'paper', 'layout': 'handoff', 'choreography': 'reach-grip-release'}
        first = {'id': 'a', 'label': 'One', 'design': design}
        second = {'id': 'b', 'label': 'Two', 'color': 'red', 'design': dict(design)}
        self.assertEqual(fingerprint(first), fingerprint(second))
        second['design']['silhouette'] = 'long-neck'
        self.assertNotEqual(fingerprint(first), fingerprint(second))

    def test_motion_phases_retime_from_the_same_semantic_anchor(self):
        timeline = build_timeline(self.config, self.transcript)
        cues = {'safeBounds': {'x': 0, 'y': 0, 'width': 1080, 'height': 940}, 'interactions': [
            {'id': 'press', 'kind': 'press', 'anchorId': 's1@0', 'spec': {'targetWidth': 300},
             'timeOffsetsMs': {'contactMs': 0, 'loadedMs': 200, 'releaseMs': 800}}]}
        first = resolve_motion(cues, timeline)
        shifted = copy.deepcopy(timeline); shifted['anchors'][1]['startMs'] += 300
        second = resolve_motion(cues, shifted)
        for key in ['contactMs', 'loadedMs', 'releaseMs']:
            self.assertEqual(second['interactions'][0]['spec'][key] - first['interactions'][0]['spec'][key], 300)
        cues['interactions'][0]['anchorId'] = 'missing'
        with self.assertRaises(ValueError): resolve_motion(cues, timeline)

    def test_audio_qa_measures_edit_spans_and_invalidates_after_edit_change(self):
        timeline = build(self.project)
        payload = {'input_i': '-18.0', 'input_tp': '-2.0', 'input_lra': '4.0'}
        calls = []
        def fake_run(command):
            calls.append(command)
            return type('Result', (), {'stderr': 'ffmpeg log\n' + json.dumps(payload)})()
        with patch('pipeline.audio.transcribe_raw.run', side_effect=fake_run):
            first = measure_audio(self.project)
            measure_audio(self.project)
            self.assertEqual(len(calls), 1)
            timeline['spans'][0]['sourceEndMs'] = 3900
            timeline['spans'][0]['editEndMs'] = 3900
            timeline['durationMs'] = 3900
            write_json(self.project / 'edit/timeline.json', timeline)
            second = measure_audio(self.project)
        self.assertEqual(len(calls), 2)
        self.assertNotEqual(first['timelineHash'], second['timelineHash'])
        self.assertIn('end=3.9', calls[1][calls[1].index('-filter_complex') + 1])


if __name__ == '__main__':
    unittest.main()
