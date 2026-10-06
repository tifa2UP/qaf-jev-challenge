# Qaf AI / Jev Arabic explainer

An original 90-second Arabic video, authored on 6 October 2026 with Remotion. It explains a public study and the scope of the new educational submission materials. It is **not a recording of a live Jev deployment** and does not assert that the private Jev implementation was built during the competition.

## Render

```sh
npm ci
npm run render
npm run poster
```

Outputs:

- `out/qaf-jev-ar.mp4`: 1920 × 1080, 30 fps, 90 seconds, H.264, Arabic text, no audio.
- `out/qaf-jev-ar-poster.png`: cover image at 5 seconds.

The text is editable in `src/index.tsx`. The bundled Arabic font is loaded before rendering. The project does not require API keys, private services, production traces, or access to the Qaf repository. Network access is required only to install npm dependencies and, if necessary, the renderer's browser.

## Evidence and boundaries

The source is the public report [Jev search vs production](https://qaf-jev-v4-vs-prod.pages.dev/), dated **17 September 2026**. The video uses only its aggregate results and a newly drawn explanatory workflow. It copies no report examples, real questions, conversations, prompts, Qaf source code, internal paths, source documents, or credentials.

The comparison is the report's `jev_v4w` candidate (v4 with extra retrieval and query writing) against `current`, on the same 48 questions. Displayed values are rounded:

| Measure | Jev candidate | Production replay |
| --- | ---: | ---: |
| Mean estimated cost per question | $0.0251 | $0.0420 |
| Median first readable answer text | 9.65 seconds | 13.05 seconds |
| Agreed pairwise preferences | 20 | 16 |
| Undecided comparisons | 12 total | 12 total |
| Audited answers with serious errors | 6 of 18 | 6 of 18 |

The judges and auditors were language models. Quality superiority is inconclusive. Costs exclude embeddings that were identical across arms. Timing came from a laptop on a shared network. The video does not claim zero hallucinations, scholarly review, a live Jev rollout, or performance on an independently verified competition-period implementation.

The source study used real questions. Those questions and answers are **not included** in this video or source package. The new educational reference demonstration elsewhere in this repository uses separate synthetic material and must not be conflated with the study.

## Originality and assets

- All Arabic copy, timeline, CSS animation, diagrams, and charts in this folder were newly authored for this submission. No proprietary Qaf code was used.
- Readex Pro was obtained from [Google Fonts](https://github.com/google/fonts/tree/main/ofl/readexpro) under SIL Open Font License 1.1. Its complete license is included in `public/fonts/OFL.txt`.
- No photographs, screenshots, logos, music, recorded voices, or real user examples are embedded.
- Remotion and other npm packages retain their own licenses. The Remotion license and applicable usage terms are available at [remotion.dev/license](https://www.remotion.dev/license). New presentation source follows the repository's license; it does not relicense third-party dependencies or the Qaf product.

## Primary implementation references

- [Remotion fundamentals](https://www.remotion.dev/docs/the-fundamentals)
- [Remotion Sequence](https://www.remotion.dev/docs/sequence)
- [Remotion render CLI](https://www.remotion.dev/docs/cli/render)

## Scene timing

| Time | Content |
| --- | --- |
| 00:00–00:12 | Project and scope |
| 00:12–00:24 | Research needs |
| 00:24–00:42 | Explanatory architecture |
| 00:42–01:00 | Cost and latency comparison |
| 01:00–01:18 | Inconclusive quality and serious errors |
| 01:18–01:30 | Previous study versus new educational materials |
