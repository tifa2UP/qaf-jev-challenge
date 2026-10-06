# قاف — مختبر الدليل / Public evidence demonstrator

An independently written public teaching implementation, created on **6 October 2026**. It contains no copied Qaf application code, proprietary prompts, corpus extracts, production conversations, or credentials. Qaf’s authentic logomark, wordmark, typefaces and visual identity are used at the project owner’s request; the interface implementation is original.

## What runs in the public page

The static Arabic RTL page is explicitly a **deterministic educational simulation**. It does **not call Jev or another language model**. Six original synthetic Arabic passages explain research and citation methodology; they are not Quran, hadith, religious rulings, or quotations from real books.

The runnable flow is question → transparent topic rules → candidate grades → topic coverage → exact extractive passages → fixed-ID citation validation. Supported, partially supported and unsupported examples are included. The invalid-citation button exercises the same publication gate used by the result renderer. Matching a citation ID does not establish that a passage semantically supports an inference.

## Run and test

Requirements: Node.js 20 or later. No packages, database, account or API key needed for the public demo.

```sh
cd demo
npm start
# Open http://127.0.0.1:4178
npm test
```

`DEMO_PORT=4180 npm start` selects another local port. The local server binds only to `127.0.0.1` and serves an explicit allowlist. It never serves provider code or environment files. No user questions are stored, logged or sent from the static browser demo.

## Static hosting

Copy only these files to a static directory such as `docs/demo/`:

`index.html`, `style.css`, `app.mjs`, `engine.mjs`, `data.mjs`, `README.md`, `SOURCES.md`, `LICENSE`, and the `assets/brand/` directory containing Qaf artwork, IBM Plex Sans Arabic, Inter and their license/provenance notices.

All page asset URLs are relative. No build step is required. Keep `provider/`, `scripts/`, `test/`, `server.mjs` and all environment files out of the static deployment. They remain in the source repository for inspection and local use.

## Optional actual Jev evaluation (server/CLI only)

`provider/jev.mjs` is a small independently authored adapter for the documented TypeSafe `POST /v1/systemone` endpoint. It asks one Noul coverage question and one Score question per synthetic passage. It validates returned identifiers and score ranges and returns evidence only if its explicit coverage gate passes. It produces no generated answer text.

The operator must supply a TypeSafe key in their **local server environment**. The browser has no API key field. Do not add a key to source files or commit an `.env` file.

```sh
# With TYPESAFE_API_KEY already set in your shell:
npm run jev -- "كيف أتحقق من الاقتباس قبل نقله؟"
```

This command sends its question and the six synthetic passages to TypeSafe; provider terms, network availability and charges apply. Use synthetic questions only. It is independent of the static UI. The 0.85 coverage threshold is an illustrative implementation choice, not a calibrated accuracy guarantee. `jev-latest` is a moving model alias, and the returned model identifier is preserved.

**Validation:** deterministic behavior and provider contract/error handling have automated tests. Provider tests use explicit mocks. No live TypeSafe request was made during preparation; no existing private keys were accessed. The adapter is therefore documented and contract-tested, but live integration is unverified.

## Scope, dates and earlier work

The independently authored source in this directory is the new October 6 educational deliverable. Qaf's existing service and the September 17 Jev comparison are prior work. This demo does not reproduce that experimental pipeline, benchmark, speed or cost figures, and is not a production Qaf deployment. It does not provide scholarly approval or religious accuracy certification.

See [SOURCES.md](./SOURCES.md) for references, provenance and licensing. The human-facing workflow can be extended with suitable licensed sources and evaluated models, but those future capabilities are not claimed here.
