> ### ✅ RELEASE v1.0.0 — UNIFIED NON-DUAL ACOUSTIC & REFLECTIVE PARABLE EXPERIENCE
> **Status:** `v1.0.0` Verified Interactive Audio Essay & Proof of Concept (`2/2` Tests Passing) • Zero-Float `Q16.16` • Zero Dependencies  
> 
> **Release Scope (Nov 2026):** A contemplative, blind- and sighted-shared interactive sanctuary inspired by **RNIB & London Roundhouse** sensory-darkness storytelling collaborations (Patrick Ness) and grounded in [`DOI: 10.5281/zenodo.24240994`](https://doi.org) (*Non-Dual Epistemic Architectures*). Replaces bolted-on screen-reader coordinate telemetry with unified, embodied gestures (*rasa-darśan*).

# 🌑 Zen Parable Non-Dual Reflection — Unified Acoustic Sanctuary & Experience Parallel

**An open, zero-dependency, darkness-first interactive audio essay and contemplative experience replacing dualist 2D coordinate-chasing and bolted-on screen-reader telemetry with unified, embodied gestures where physical action, soundscape, and koan meaning arise together.**

[![License: MIT](https://shields.io)](LICENSE)
[![Status: v1.0.0 Verified](https://shields.io)](#-quickstart--verification)
[![Design: RNIB Roundhouse Parallel](https://shields.io)](#-why-the-rnib-roundhouse-parallel-matters)
[![Tests: 2/2 Passing](https://shields.io)](#-quickstart--verification)

---

## 📖 Companion Preprint & Explainer Tile

* **Narrative Phenomenology & Architectural Preprint (APA 7th Ed.):** [`docs/roundhouse-nondual-experience-essay.md`](docs/roundhouse-nondual-experience-essay.md) — *Beyond Bolted-On Screen Readers: Narrative Phenomenology, the RNIB Roundhouse Sensory Dark, and Perceptual-Cognitive Unity (Rasa-Darśan)*.
* **Plain-Language Explainer Tile:** [`tiles/bill-nye-unified-experience-explainer.md`](tiles/bill-nye-unified-experience-explainer.md) — Altitude `A7` plain-language walkthrough of why unified audio and story work better together than bolted-on coordinate telemetry.

---

## 🕯️ Why the RNIB Roundhouse Parallel Matters

In earlier prototypes like [`Zen-Parable-Audio-Sanctuary`](https://github.com), bolting an `aria-live` distance announcer onto a 2D pixel grid severed perception from meaning. Drawing from **RNIB and Roundhouse sensory-darkness performances**, this project unites audio, physical action, and narrative into a single primary medium:

1. **Shared Acoustic-First Medium:** Sound, spatial resonance, breath, and voice *are* the room—nothing important exists solely on a screen waiting to be translated into coordinates.
2. **Co-Presence of Voice and Environment:** The storyteller voice emerges naturally from the low-pass filtered ambient soundscape (`<= 780 Hz`) rather than interrupting like a cold system alert.
3. **Reflective Parallel Inspector:** An embedded **Experience Parallel** panel compares *Dualist Coordinate Telemetry* directly against *Non-Dual Embodied Gestures* across every parable.

---

## 🍵 Embodied Non-Dual Parable Matrix

| Stage & Koan | Dualist Coordinate Struggle (Retired) | Unified Non-Dual Experience |
| :--- | :--- | :--- |
| **1. *The Sound of One Hand***<br>*(Master Hakuin)* | Steer `(x, y)` east while a screen reader announces distance percentages. | **Clap Two Hands** (`A` — stereo collision + rising mist) vs. **Listen to One Hand** (`D` — *Shakuhachi* breath + *Tōrō* stone chime). |
| **2. *The Raft & The Shore***<br>*(Majjhima Nikāya 22)* | Walk between coordinate boxes and press inventory keys. | **Board the Raft** (`A`), **Step Onto Shore** (`W`), feel creaking timber if walking burdened (`D`), and **Let Go of the Raft** (`R`). |
| **3. *Two Monks & The Flag***<br>*(Mumonkan Case 29)* | Walk to a center hitbox and press `Space` repeatedly. | **Argue: Wind** (`A`), **Argue: Flag** (`D`), or **Rest in Stillness** (`Space` ×3 — settling wind and silk into a single *Taiko* heartbeat). |
| **4. *The Empty Cup***<br>*(Master Nan-in)* | Walk to a basin sprite and press `R` four times. | **Add Another Opinion** (`A` — overflowing rim splash) vs. **Pour Out a Measure** (`R` ×4 — descending bamboo ladle to *Bonshō* temple bell). |

---

## 📁 Repository Structure

```text
Zen-Parable-NonDual-Reflection/
├── index.html                                     # Single-column Roundhouse sanctuary + Experience Parallel panel
├── style.css                                      # Calm darkness-first typography & generous tactile action keys
├── package.json                                   # Zero-dependency ESM manifest (`npm test` -> `node --test`)
├── LICENSE                                        # MIT License
├── README.md                                      # Unified experience overview, RNIB Roundhouse parallel & quickstart
├── docs/
│   └── roundhouse-nondual-experience-essay.md     # Full narrative preprint comparing all 3 prototypes + APA references
├── tiles/
│   └── bill-nye-unified-experience-explainer.md   # Altitude A7 plain-language explainer of unified vs. dualist design
├── src/
│   ├── core.js                                    # Zero-float Q16.16 fixed-point math & synchronous SHA-256 receipt
│   ├── nondual-parables-data.js                   # 4 Parables designed as unified poetic gestures + parallel critiques
│   ├── nondual-kernel.js                          # Deterministic Q16.16 contemplative state machine (zero 2D coordinates)
│   ├── roundhouse-soundscape.js                   # Acoustic-first WebAudio stage (river, wind, silk flutter & Yo-scale)
│   └── reflection-app.js                          # Unified aria-live + Web Speech storyteller & Experience Parallel UI
└── test/
    └── nondual-kernel.test.mjs                    # Built-in `node --test` suite verifying all 4 parables & SHA-256 receipt
```

---

## 🚀 Quickstart & Verification

```bash
# 1. Run deterministic 4-parable & SHA-256 reflection receipt tests (2/2 passing)
node --test test/nondual-kernel.test.mjs

# 2. Launch locally over IPv4 in browser
python3 -m http.server 8088 --bind 127.0.0.1
```

Open **`http://127.0.0.1:8088`**, tap **`Soundscape: Muted`** and **`🗣️ Storyteller Voice: OFF`** to enter the unhurried acoustic chamber, and interact directly using the tactile gesture buttons or keys (`A`, `D`, `W`, `R`, `Space`).

---

## 🤝 Provenance & License

* **Lineage:** Grounded in [`Borealiscodes/Zen-Parable-Geometry-Odyssey`](https://github.com), [`Borealiscodes/Zen-Parable-Audio-Sanctuary`](https://github.com), *Non-Dual Epistemic Architectures* (`DOI: 10.5281/zenodo.24240994`), and [`Borealiscodes/ndh-game-dev-kit`](https://github.com).
* **Author & License:** Borealis Serenity Hedling (`NDH-RESEARCH-PILOT` • County Dublin, Ireland) • MIT License • `Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>`.
