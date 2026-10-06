# Qaf / Jev — Arabic product film

An original **118-second Arabic film**, authored on 6 October 2026 with Remotion. It introduces the existing Qaf research experience, explains a previous experimental Jev workflow, and demonstrates a new independent educational reference using synthetic material. It is **not a recording of a live Jev deployment** and does not assert that the private Jev implementation was built during the competition.

## Render

Requires Node.js 22+, npm, and FFmpeg on `PATH`.

```sh
npm ci
npm run render
npm run poster
```

The finished, approved narration WAVs and measured timeline are included, so rendering requires no synthesis service or API key. Network access is needed only to install npm dependencies and, if necessary, the renderer's browser.

Outputs:

- `out/qaf-jev-ar.mp4`: 1920 × 1080, 30 fps, 118 seconds, H.264/AAC, Arabic narration and burned Arabic captions. MP4 metadata is moved to the front for progressive web playback.
- `out/qaf-jev-ar-poster.png`: a dedicated cover with the opening question and Qaf × Jev identity, without burned narration captions.
- `out/qaf-jev-ar.vtt` and `out/qaf-jev-en.vtt`: synchronized selectable caption tracks.
- `out/qaf-jev-ar.srt` and `out/qaf-jev-en.srt`: matching portable subtitle files.

Copy and translations are in `src/film/content.ts`; compositions and motion are in `src/film/scenes.tsx`. `src/film/timing.json` contains the measured narration and caption timeline. `scripts/prepare-timeline.mjs` can regenerate timing and subtitle files from approved numbered WAVs and word-timestamp files supplied as an input directory. The delivered timeline already includes the acoustic correction for the final spoken Qaf name, which automated transcription incorrectly marked as zero duration.

## Evidence and boundaries

The source study is the public [Jev search vs production report](https://qaf-jev-v4-vs-prod.pages.dev/), dated **17 September 2026**. The video uses its aggregate results and a newly drawn explanatory workflow. It copies no study examples, real user conversations, Qaf source code, system prompts, credentials, or private configuration.

The comparison is the report's `jev_v4w` candidate (v4 with extra retrieval and query writing) against `current`, on the same 48 questions. Displayed values are rounded:

| Measure | Jev candidate | Production replay |
| --- | ---: | ---: |
| Mean estimated cost per question | $0.0251 | $0.0420 |
| Median first readable answer text | 9.65 seconds | 13.05 seconds |
| Agreed pairwise preferences | 20 | 16 |
| Undecided comparisons | 12 total | 12 total |
| Audited answers with serious errors | 6 of 18 | 6 of 18 |

The judges and auditors were language models. Quality superiority is inconclusive. Costs exclude embeddings that were identical across arms. Timing came from a laptop on a shared network. The video does not claim zero hallucinations, scholarly review, a live Jev rollout, or performance on an independently verified competition-period implementation.

The source study used real questions. Those questions and answers are **not included** in this video or source package. The trace demonstration uses the separately authored `DEMO-02` fixture from this repository's `demo/data.mjs`. Its passage is an original educational text about checking quotations, not scripture. The film labels it as synthetic. Matching an evidence identifier permits opening a known passage; it does not prove that every claim is supported.

## Assets and provenance

- The Arabic script, English translations, timeline, diagrams, charts, captions, and CSS motion were newly authored for this submission. No proprietary Qaf code was used.
- `public/visuals/hero-library.webp` and `evidence-pages.webp` are original generated editorial images created for this film. They are atmospheric visuals, not scans of source manuscripts.
- `public/visuals/qaf-public-answer-focus.jpg` is a cropped capture of the public Qaf interface answering a new neutral question authored for this demonstration. It is labelled as the existing product. It is not a real user's conversation and does not show the private Jev experiment or a long source excerpt. Qaf product identity and interface rights remain with their owner.
- `public/audio/scene-01.wav` through `scene-09.wav` are newly synthesized Arabic narration using the preset Algieba voice through Google Gemini 3.8 Flash TTS. No voice was cloned. The delivery combines a warm opening and closing with a brisk factual body; no tempo or pitch changes were applied. Approved spoken audio totals 105.84 seconds. Production configuration, credentials, provider responses, casting tests, and rejected recordings are excluded.
- Narration was normalized to a target of −18 LUFS, with headroom for the mix. Automated transcription and separate acoustic checks informed name, number, and caption timing corrections. These are production checks, not human certification.
- `public/audio/sfx-*.wav` are restrained original procedural sound textures. `scripts/generate-soundscape.py` contains their synthesizer; no music or third-party audio samples were used.
- Readex Pro comes from [Google Fonts](https://github.com/google/fonts/tree/main/ofl/readexpro) under SIL Open Font License 1.1. Its complete license is included in `public/fonts/OFL.txt`.
- Remotion and other npm packages retain their own licenses. See [Remotion's license](https://www.remotion.dev/license). New source follows the repository's license; it does not relicense dependencies or the Qaf product.

## Scene timing

| Approximate start | Content |
| --- | --- |
| 00:00 | Where did this answer come from? |
| 00:13 | Existing Qaf interface and source context |
| 00:25 | Jev's experimental retrieval decisions |
| 00:38 | Evidence pack, writing, and citation resolution |
| 00:49 | Synthetic quotation-to-passage trace |
| 01:02 | Previous cost and latency results |
| 01:19 | Quality remains inconclusive |
| 01:32 | Study date, automated audit, and boundaries |
| 01:41 | New educational materials and closing |

## Primary implementation references

- [Remotion fundamentals](https://www.remotion.dev/docs/the-fundamentals)
- [Remotion Sequence](https://www.remotion.dev/docs/sequence)
- [Remotion Html5Audio](https://www.remotion.dev/docs/html5-audio)
- [Remotion render CLI](https://www.remotion.dev/docs/cli/render)
