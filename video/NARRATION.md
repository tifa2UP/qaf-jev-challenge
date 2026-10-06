# Arabic narration — Qaf and Jev competition film

Created 6 October 2026 from the approved original nine-scene Arabic script. Prebuilt voice: Algieba. Synthesis: Google Gemini 3.8 Flash TTS via the Interactions API. No voice cloning, borrowed recordings, private Qaf passages, customer conversations, or private project assets were used.

The delivery combines a warm opening and closing with a clear conversational explanation. The Jev name introduces the experimental path once; subsequent Arabic references keep the explanation flowing. Numerical findings receive a more measured pace. The nine approved clips total **105.84 seconds**. Each scene is a complete generated utterance; no word splicing, time stretching, or artificial pitch changes were applied.

Delivery: numbered 48 kHz mono 16-bit PCM WAVs; two-pass loudness normalization to -18 LUFS integrated with a -3.5 dBTP ceiling. Per-scene loudness can vary slightly because short material is measured over different windows. The finished film is checked separately for integrated loudness, true peak and audio continuity.

The public clip register is `audio-generation.json`, which includes approved text, measured duration, processing and a SHA-256 digest for each delivered WAV. Captions use the approved text in `src/film/content.ts`; their timings are stored in `src/film/timing.json`. Automated Whisper-1 timestamps were timing aids, not the text source of truth. Acoustic checks and timing corrections addressed name recognition, number normalization, and the opening Jev and closing Qaf cues.

Production review used speech recognition, blind pronunciation-reference comparisons, Arabic number checks, delivery comparisons, and whole-film audiovisual review. These are automated production checks. Audio continuity is checked against the approved source clips after rendering so an earlier take or a dropped ending can be detected.

Service-calling synthesis scripts and configuration, credentials, casting tests, rejected takes and provider responses are excluded from the public package. Render, timeline and procedural soundscape scripts are included so the approved film can be reproduced without a synthesis service. The approved narration and finished WAVs are the reusable output.
