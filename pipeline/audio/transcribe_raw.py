"""Local ASR and measured audio QA. No TTS and no implicit model download."""
from __future__ import annotations
import json
import math
from pathlib import Path
from pipeline.project import capabilities, data_hash, local_model, read_json, run, source_permission, write_json


def transcribe(project: Path, model: str | None, allow_model_download: bool = False) -> dict:
    manifest, raw = source_permission(project)
    destination = project / "analysis/transcript.json"
    if destination.exists():
        cached = read_json(destination)
        if cached.get("sourceHash") != manifest["source"]["sha256"]:
            raise ValueError("Transcript has stale sourceHash")
        return cached
    model = model or (str(local_model()) if local_model() else None)
    if not model:
        raise RuntimeError("ASR needs --model LOCAL_DIRECTORY (or an explicit model name with --allow-model-download)")
    local = Path(model).is_dir()
    if not local and not allow_model_download:
        raise PermissionError("No local model found; model download requires the explicit flag")
    if not capabilities()["fasterWhisper"]:
        raise RuntimeError("faster-whisper is not installed in the selected Python environment; configure a project-local environment")
    from faster_whisper import WhisperModel
    whisper = WhisperModel(model, device="cpu", compute_type="int8", local_files_only=not allow_model_download)
    segments, info = whisper.transcribe(str(raw), language=manifest.get("language", "vi"), word_timestamps=True, vad_filter=True)
    records = []
    for index, segment in enumerate(segments):
        words = []
        for wi, word in enumerate(segment.words or []):
            item = {"id": f"s{index:04}-w{wi:03}", "text": word.word.strip(), "startMs": round(word.start * 1000), "endMs": round(word.end * 1000)}
            if math.isfinite(word.probability):
                item["confidence"] = word.probability
            words.append(item)
        records.append({"id": f"s{index:04}", "text": segment.text.strip(), "startMs": round(segment.start * 1000), "endMs": round(segment.end * 1000), "words": words})
    result = {"schemaVersion": 1, "sourceHash": manifest["source"]["sha256"], "language": info.language,
              "provenance": {"engine": "faster-whisper", "model": model, "device": "cpu", "timing": "ASR-estimate"}, "segments": records}
    write_json(destination, result)
    return result


def measure_audio(project: Path) -> dict:
    manifest, raw = source_permission(project)
    destination = project / "qa/audio.json"
    timeline = read_json(project / 'edit/timeline.json')
    timeline_hash = data_hash(timeline)
    if destination.exists():
        result = read_json(destination)
        if result.get("sourceHash") == manifest["source"]["sha256"] and result.get('timelineHash') == timeline_hash:
            return result
    executable = capabilities()["ffmpeg"]
    if not executable:
        raise RuntimeError("Missing local ffmpeg for audio signal measurement")
    spans = timeline['spans']
    filters = [f"[0:a:0]atrim=start={s['sourceStartMs']/1000}:end={s['sourceEndMs']/1000},asetpts=PTS-STARTPTS[a{i}]" for i, s in enumerate(spans)]
    chain = ''.join(f'[a{i}]' for i in range(len(spans)))
    filters.append(chain + f"concat=n={len(spans)}:v=0:a=1,loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json[measured]")
    command = [executable, "-hide_banner", "-nostdin", "-i", str(raw), '-filter_complex', ';'.join(filters),
               '-map', '[measured]', '-vn', "-f", "null", "-"]
    output = run(command).stderr
    start, end = output.rfind('{'), output.rfind('}')
    measurements = json.loads(output[start:end + 1])
    finite = all(math.isfinite(float(measurements[k])) for k in ["input_i", "input_tp"])
    result = {"status": "pass" if finite else "fail", "sourceHash": manifest["source"]["sha256"],
              'timelineHash': timeline_hash, 'clock': 'edit',
              "method": "ffmpeg-loudnorm-measurement-no-output-media", "measurements": measurements,
              "warnings": ["Potential clipping/overload; inspect before delivery"] if finite and float(measurements["input_tp"]) >= 0 else [],
              "listening": "pending", "normalizationApplied": False}
    write_json(destination, result)
    return result
