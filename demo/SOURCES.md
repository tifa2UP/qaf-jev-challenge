# Sources, provenance and rights registry

Created 6 October 2026 for this standalone public demonstration.

| Component | Origin | Use and rights |
|---|---|---|
| HTML, CSS, browser logic, topic engine, tests, Node server and provider adapter | Independently authored for this demonstration | MIT license in `LICENSE`; no copied private Qaf implementation |
| Six Arabic passages in `data.mjs` | Original synthetic educational writing for this demonstration | MIT; not real source quotations, scripture, religious opinions, user conversations or corpus data |
| Interface examples | Original synthetic questions about research methodology | MIT; no production user data |
| Qaf visual identity | Authentic Qaf logomark, wordmark and design references, used at the project owner’s request | Artwork remains Qaf property and is excluded from the code license; new HTML/CSS implementation, with no private application code copied. See `assets/brand/README.md`. |
| IBM Plex Sans Arabic and Inter | Qaf production font assets | Redistributed under SIL Open Font License 1.1; full notices in `assets/brand/OFL.txt` and `assets/brand/Inter-OFL.txt` |
| Jev HTTP request shape | [Official TypeSafe quick start](https://docs.typesafe.ai/introduction/quickstart) (checked 6 October 2026) | API-interface reference; no SDK or provider source code copied; provider terms govern optional calls |
| Structured decision concept | [Official TypeSafe introduction](https://docs.typesafe.ai/introduction) | Public design reference; Jev is a third-party service, not a bundled or self-trained model |
| Qaf/Jev architectural context | [Public comparison report](https://qaf-jev-v4-vs-prod.pages.dev/) | Prior-work reference only. No report questions, answers, corpus extracts, internal prompts or benchmark datasets copied |
| Competition constraints | [Official challenge website](https://islamicaich.org/) and its participant/scientific documents | Reference for scope and reporting; no claim of organizer endorsement |

There are **no third-party runtime packages**, redistributed corpus editions, external photographic assets or bundled models in this directory. MIT covers this new source and synthetic fixtures only; it does not grant rights over Qaf's brand artwork or existing product, TypeSafe's services, third-party books, or the public comparison report.

## Source boundaries

- The demo has no Quran/hadith passages and cannot establish religious rulings.
- It uses no real beneficiary records and no production logs.
- Its optional live adapter sends only the operator's supplied question and these synthetic fixtures. The README instructs operators to use synthetic questions.
- The static page makes no third-party API requests and stores no question history.
- Referencing public architectural ideas is not a claim that this small example reproduces the private production system.

## Review and limitations

No human scholarly audit, model quality evaluation or live provider test is claimed. Deterministic software tests verify specific gates; they do not certify factual or religious accuracy. Original benchmark metrics remain historical results from a different system and dataset.
