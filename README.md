# قاف AI مع Jev

Arabic materials for the Islamic AI Challenge, submitted by **Abdellatif Abdelfattah** as an individual participant in the knowledge dialogue and trustworthy answers track.

**[Reviewer hub and video](https://tifa2up.github.io/qaf-jev-challenge/)** · **[Existing Qaf product](https://qaf.ai)** · **[Synthetic reference demo](https://tifa2up.github.io/qaf-jev-challenge/demo/)**

## What this repository contains

This is a new, independently written public reference and submission package. It contains a small, runnable Arabic evidence-workflow demonstration with synthetic fixtures, tests, operating documentation, an Arabic presentation, and the source of a Remotion explanatory video. It does **not** contain Qaf's proprietary production implementation, retrieval prompts, book corpus, credentials, or user conversations.

The reviewer hub includes an original Arabic narrated film, selectable English captions, a downloadable transcript, an interactive explanation of the evidence workflow, and the study's results with their limitations. Approved voice clips, original visual assets, caption timing, and sound-design source are included so the film can be rendered without access to synthesis credentials.

The static reference demo is explicitly an educational simulation. It demonstrates selecting evidence, handling missing coverage, and resolving citations only to allowed passage identifiers. It does not call Jev or Gemini and is not a deployment of the historical v4 experiment. Any optional server-side integration is documented separately in `demo/README.md`.

Qaf's existing public product is available at [qaf.ai](https://qaf.ai). Its production deployment must not be interpreted as proof that the v4 experimental path is live.

## Historical study and new work

The user-provided [Jev v4 versus production study](https://qaf-jev-v4-vs-prod.pages.dev/) is dated **17 September 2026**. The study describes Jev making typed retrieval decisions while program code controls retrieval and the language model writes from a bounded, numbered evidence pack. This repository summarizes aggregate public results; no original study questions, conversations, or answer records are redistributed.

| Publicly reported measure | Jev experiment | Production replay |
|---|---:|---:|
| Mean estimated cost per turn | $0.0251 | $0.0420 |
| Median time to first answer text | 9.65 s | 13.05 s |
| Median time to complete answer | 14.96 s | 26.43 s |
| Invented citation identifiers | 0/48 | 4/48 |

These are results from a 48-question historical experiment, not measurements of this reference demo. Automated pairwise judging found 20 wins, 16 losses, and 12 undecided cases; the 95% interval for the decided win rate was 39.6–70.5%, so superior answer quality was not established. A separate audit found serious errors in 6 of 18 sampled answers in each arm. Preventing invented citation identifiers does not establish that an answer is correct or that a citation supports its claim.

The new work created **6 October 2026** consists of the independently authored public reference, synthetic test cases, evidence-ID validation tests, operation and source documentation, presentation, and Remotion video. The earlier product and September experiment are disclosed as prior work; their results are not attributed to the October competition window.

## Run and inspect

See [`demo/README.md`](demo/README.md) for the reference application and tests and [`video/README.md`](video/README.md) for rendering the video. The reviewer website is static and published from `docs/`.

The reference corpus is newly authored teaching material about checking sources. It is not a religious source collection and does not contain Quran or hadith quotations. The demo is not a source of fatwas. Its synthetic cases test software behavior, not religious correctness, scholarly approval, or production quality.

## Rights and sources

Newly authored source code in this repository is offered under the MIT license. Third-party dependencies and fonts retain their own licenses. Qaf, Jev, TypeSafe, Gemini and Remotion names identify the relevant products; no third-party endorsement is claimed. See [`SOURCES.md`](SOURCES.md) and the component documentation for scope and attribution. No rights to Qaf's private implementation or underlying corpus are granted by this repository.
