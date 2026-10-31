---
name: audio-speech-alignment
description: >-
  Procedures for text-to-speech voiceover generation, Faster-Whisper forced alignment, word-level
  timestamp extraction, natural phrase chunking, source/edit clock mapping, and configured-fps synchronization
  for raw video editing or optional synthesized voiceovers.
---

# Pipeline Stage: Audio Speech & Forced Alignment

This skill details the exact procedures for generating high-fidelity voiceovers, extracting word-level timestamps, and preparing time-synchronized subtitle data.

## Raw voice routing

For user-provided raw footage, preserve the recorded voice and follow
[raw-first-workflow.md](../ai-video-pipeline/references/raw-first-workflow.md). TTS below applies only when requested.
Keep source and edit clocks with an explicit cut map; derive caption and motion timing from the same timeline.
Respect media/file permissions in AGENTS.md; do not open unrelated raw, words/sentences or audio files.
ASR word timestamps and text reconciliation are estimates, not proof of exact forced alignment. Record source,
tool/model and uncertain spans; do not invent confidence values. Script text is not a license to replace what the
speaker actually said: reconcile discrepancies and flag missing or extra speech without silently rewriting raw voice.
Use a verified forced aligner only if required, available and permitted; keep interpolated spans marked approximate.

---

## 1. Voiceover Synthesis & Boundary Logging

1. **Text Normalization**:
   - Strip all Markdown headers, comments (lines starting with `#`), and punctuation that interferes with TTS cadence.
   - Expand numbers, dates, and abbreviations into spoken words when necessary for natural articulation.
2. **Sentence-by-Sentence Synthesis**:
   - Synthesize each line of the script individually.
   - Insert a consistent inter-sentence pause buffer (recommended: **0.25s to 0.30s**, standard: `0.28s`) between consecutive lines.
   - Concatenate all audio segments into a single lossless 16-bit PCM WAV file: `videos/<video-name>/voice.wav`.
3. **Sentence Timestamp Output (`sentences.json`)**:
   - Record the exact start second and end second for each sentence in sequence:
     ```json
     [
       { "id": 1, "text": "Sentence text...", "start": 0.0, "end": 4.82 },
       { "id": 2, "text": "Next sentence text...", "start": 5.10, "end": 9.45 }
     ]
     ```

---

## 2. ASR Word Timestamps and Script Reconciliation

1. **Model Selection**:
   - Use `faster-whisper` with the `medium` model (`device="cpu"`, `compute_type="int8"` or `float32`).
   - Select among available local models by language, hardware and prior measured accuracy. `medium` is an example, not a proven optimum for every raw.
2. **Timestamp Reconciliation for the Authorized TTS Route**:
   - Transcribe `voice.wav` with word timestamps enabled (`word_timestamps=True`).
   - Gióng hàng (align) the detected words against the canonical text in `script.md`.
   - **Ground-Truth Principle for TTS**: Preserve script spelling when it matches the generated speech. Missing/extra speech needs a discrepancy report; do not fabricate word times for unspoken text.
   - **Handling Discrepancies**:
     - For small uncertain spans with reliable surrounding anchors, proportional interpolation is a fallback estimate, not a measured timestamp. Mark approximate spans and verify consequential words before using them as exact animation cues.
     - Constrain words strictly within their respective sentence boundaries from `sentences.json` to prevent drift across pauses.
3. **Output Format (`words.json`)**:
   ```json
   [
     { "w": "Bạn", "s": 0.04, "e": 0.32 },
     { "w": "có", "s": 0.34, "e": 0.58 },
     { "w": "biết", "s": 0.60, "e": 0.96 }
   ]
   ```

---

## 3. Natural Phrase Clustering & Frame Mapping (`timing.txt`)

1. **Grouping Rules**:
   - Chunk sequential words into short phrases of **2 to 4 words** each.
   - Break phrases at natural syntactic pauses (commas, conjunctions, prepositional phrases).
   - Ensure no phrase straddles a sentence boundary.
2. **Configured-fps Frame Calculation**:
   - Calculate the integer starting frame for each phrase using:
     $$\text{startFrame} = \lfloor (\text{startMs} / 1000) \times fps \rfloor$$
3. **Output File Format (`timing.txt`)**:
   - Line 1: Total frames of the video (e.g., `855` for 28.5 seconds at 30 fps).
   - Subsequent lines: `<frame_number> <phrase text>`.
   ```text
   855
   0 Bạn có biết,
   22 chàng trai 22 tuổi
   59 Charles Darwin
   87 bước lên tàu
   ```

---

## 4. Legacy Subtitle Adapter Example

Derive caption timing from the canonical edit timeline. The following legacy `phrases` shape is an adapter example;
inspect the actual consumer instead of adopting an episode-specific filename as the shared schema:

```json
{
  "phrases": [
    {
      "id": 1,
      "text": "chàng trai 22 tuổi",
      "startFrame": 22,
      "endFrame": 59,
      "words": [
        { "w": "chàng", "s": 0.73, "e": 0.98 },
        { "w": "trai", "s": 0.98, "e": 1.18 },
        { "w": "22", "s": 1.18, "e": 1.62 },
        { "w": "tuổi", "s": 1.62, "e": 1.95 }
      ]
    }
  ]
}
```

In the caption component, determine the currently spoken word via:
$$\text{currentTime} = \frac{\text{frame}}{\text{fps}}$$
$$\text{isCurrent} = (\text{currentTime} \ge w.s) \land (\text{currentTime} < w_{\text{next}}.s)$$

## 5. Canonical Timeline & Change Synchronization

For new projects, `videos/<video-name>/edit/timeline.json` is the source of truth. Treat legacy `words.json`,
`sentences.json`, `timing.txt`, and scene/caption timing files as generated compatibility outputs. Do not edit
multiple timing files independently.

- Keep canonical event times in milliseconds with stable sentence/phrase/word IDs and input hashes; derive frames
  from the configured fps when exporting Remotion data.
- If script text changes but voice stays the same, rerun text alignment and regenerate affected captions/phrase cues.
- If voice changes, rerun audio inspection and forced alignment; update duration and shift scene, caption, animation,
  and transition events through semantic anchors (sentence/phrase IDs) where possible.
- Preserve manually authored visual overrides when their anchors still exist. Mark orphaned cues and low-confidence
  transcript ranges for review instead of silently moving or deleting them.
- Recompute only descendants of changed inputs. Keep the raw voice/footage unchanged and record provenance hashes.
- Never render the final video as a side effect of transcript or timing regeneration; follow the project approval gate.
