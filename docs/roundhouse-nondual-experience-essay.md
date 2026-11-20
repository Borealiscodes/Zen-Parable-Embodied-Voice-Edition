# 🌑 Beyond Bolted-On Screen Readers: Narrative Phenomenology, the RNIB Roundhouse Sensory Dark, and Perceptual-Cognitive Unity (*Rasa-Darśan*)

**Preprint & Narrative Architectural Companion:** `Zen-Parable-NonDual-Reflection v1.0.0`  
**Author:** Borealis Serenity Hedling (`NDH-RESEARCH-PILOT` • County Dublin, Ireland)  
**ORCID:** [`0009-0004-7968-5707`](https://orcid.org)  
**Upstream Theoretical Anchor:** *Non-Dual Epistemic Architectures and Geometric Stabilization in High-Dimensional Transformer Systems (v3.1)* (`DOI: 10.5281/zenodo.24240994`)  
**Date:** November 20, 2026  

---

## Abstract

When software designers attempt to make visual games accessible to blind and low-vision players by bolting an `aria-live` coordinate announcer onto a 2D pixel map, they often solve a technical checklist while fracturing the human experience. Tracing a three-part creative and engineering journey across [`Zen-Parable-Geometry-Odyssey`](https://github.com), [`Zen-Parable-Audio-Sanctuary`](https://github.com), and [`Zen-Parable-NonDual-Reflection`](https://github.com), this preprint examines the lived phenomenology of three ways of encountering classical Zen parables. Drawing on the **Royal National Institute of Blind People (RNIB) and London Roundhouse sensory-darkness storytelling collaborations** (featuring author Patrick Ness), Michael Oliver's **Social Model of Disability**, and the non-dual concept of perceptual-cognitive unity (*rasa-darśan*; `DOI: 10.5281/zenodo.24240994`), we argue that true contemplative accessibility begins when sound, breath, gesture, and story share one primary medium rather than translating visual coordinates after the fact.

---

## 1. Three Rooms, Three Ways of Listening

Imagine stepping into three different rooms to encounter the same four Zen stories—Master Hakuin's *Sound of One Hand*, the Pāli Canon's *Raft and the Shore*, Huineng's *Two Monks and the Flag*, and Master Nan-in's *Empty Cup*.

### Room One: The Painted Scroll (`Zen-Parable-Geometry-Odyssey`)
In the first room, the walls are painted with drifting *sumi-e* mountains, bronze temple bells, and vermilion Torii gates. If your eyes can trace the ink lines, the metaphor unfolds gracefully: you steer a small traveler across a parallax valley, board a wooden raft, press a key to leave it behind on the far bank, and watch a stone water basin empty drop by drop. Yet for anyone entering that room without sight, the scroll is silent glass. The poetry of letting go is locked behind a visual hitbox.

### Room Two: The Telemetry Translator (`Zen-Parable-Audio-Sanctuary`)
Determined to open the door, we built a second room. We kept the `640 × 380` coordinate grid intact, added high-contrast geometric shapes, wired up a 5-cell Unicode Braille spatial bar, and attached a live screen-reader announcer (`aria-live="polite"`) alongside stereo proximity pings.

On paper, the engineering worked: a blind player could steer purely by ear and Braille from stage one to stage four. **In lived experience, however, something vital broke.** Instead of sitting quietly by a cedar courtyard contemplating what *one hand* sounds like, the player found themselves chased by an anxious telemetry voice: *"Solitary Toro Lantern: east, 37% proximity… 48% proximity… 62% proximity."*

Every step required mental trigonometry—translating spoken compass bearings back into an invisible Cartesian grid while trying to remember the koan at the top of the page. Perception, physical action, and philosophical meaning had been split into three competing streams. In trying to translate a visual game after the fact, we had inadvertently reproduced the exact **epistemic dualism** critiqued in *Non-Dual Epistemic Architectures* (`DOI: 10.5281/zenodo.24240994`): an external observer-classifier bolted onto a separate generative engine.

### Room Three: The Roundhouse Dark (`Zen-Parable-NonDual-Reflection`)
In the third room, we turned off the 2D coordinate grid altogether—and asked what happens when **sound, stillness, and spoken story are the architecture itself**.

---

## 2. Lessons from the RNIB & Roundhouse Sensory-Darkness Collaborations

Our redesign drew directly from the **RNIB and London Roundhouse sensory-darkness storytelling collaborations**, including live performances with author **Patrick Ness** (*A Monster Calls*). In those sessions, blind and sighted audience members entered a darkened performance space together. Rather than handing sighted guests a visual spectacle and handing blind guests a headset with dry audio description, the creators built a **single, shared sensory world**:

1. **Acoustic & Tactile Primacy:** Wind moving across the space, the creak of wood, the cadence of breath, and the storyteller's voice *were* the room. Nothing was missing when the lights went out because nothing had been designed as an afterthought.
2. **Co-Presence of Voice and Environment:** The narrator did not interrupt the atmosphere like a screen reader reading UI widgets; the voice lived *inside* the soundscape, rising and resting with the ambient river and temple resonance.
3. **Shared Vulnerability and Unhurried Time:** Deprived of visual scanning and frantic interface clutter, both sighted and blind listeners slowed down—inhabiting the emotional tension of the story rather than rushing to "optimize" a puzzle.

---

## 3. Comparative Phenomenology & Architecture Across Three Iterations

| Dimension of Experience | Room 1: `Zen-Parable-Geometry-Odyssey` | Room 2: `Zen-Parable-Audio-Sanctuary` | Room 3: `Zen-Parable-NonDual-Reflection` |
| :--- | :--- | :--- | :--- |
| **How the World Exists** | A visual 2D *sumi-e* parallax landscape with musical accompaniment. | A visual coordinate grid translated through `aria-live` distance readouts and pings. | **A unified darkness-first acoustic room** shaped by mountain air, river current, silk flutter, and voice. |
| **What the Player Actually Does** | Steers an `(x, y)` avatar toward graphical collision boxes. | Chases `(dx, dy)` bearings while decoding spoken proximity percentages. | **Enacts direct, embodied gestures** (*Clap Two Hands*, *Listen to One Hand*, *Let Go of the Raft*, *Rest in Stillness*, *Pour Out a Measure*). |
| **How Screen Readers Experience It** | Silent / inaccessible canvas. | Fragmented telemetry alerts competing with narrative prose. | Co-present poetic narration where every gesture triggers one unified voice + soundscape response. |
| **Philosophical Alignment** | Illustrates Zen koans visually (`koan-interpretations-guide.md`). | **Dualist Split:** separates mechanical navigation from contemplative meaning. | **Perceptual-Cognitive Unity (*Rasa-Darśan*):** gesture, acoustic shift, and insight arise together (`DOI: 10.5281/zenodo.24240994`). |
| **Computational Substrate (`Ledger 1`)** | Zero-float `Q16.16` 2D physics + `SHA-256` receipt. | Zero-float `Q16.16` 2D physics + `07`/`08` accessibility envelope. | Zero-float `Q16.16` contemplative state machine (`src/nondual-kernel.js`) + `SHA-256` reflection receipt. |

---

## 4. Embodied Parables: When the Gesture *Is* the Story

In `Zen-Parable-NonDual-Reflection`, each of the four classical stories is rebuilt so that the user's physical key press or tap, the WebAudio synthesis (`<= 780 Hz` low-pass filtered), and the spoken reflection form a single indivisible arc:

* **In *The Sound of One Hand* (Master Hakuin):** Pressing **`Clap Two Hands` (`A`)** triggers a sharp stereo collision across left and right channels, raising a veil of mist. Pressing **`Listen to One Hand` (`D`)** releases a single, unhurried *Shakuhachi* breath and *Tōrō* stone chime that dissolves the mist without friction.
* **In *The Raft and the Shore* (Majjhima Nikāya 22):** Boarding the cedar raft (`A`) immerses the listener in a warm, flowing river current. Stepping onto the far shore (`W`) brings quiet moss underfoot—yet attempting to walk onward while still clinging to the raft (`D`) produces the heavy groan of dragged timber until the player chooses **`Let Go of the Raft` (`R`)**.
* **In *Two Monks and the Flag* (Mumonkan Case 29):** Arguing that *"the wind moves"* (`A`) or *"the flag moves"* (`D`) whips turbulent gusts and silk banner flutter across the stereo field, whereas choosing **`Rest in Stillness` (`Space`)** three times quiets wind and banner together into a single *Taiko* heartbeat.
* **In *The Empty Cup* (Master Nan-in):** Adding another opinion (`A`) spills water noisily over the brimming stone rim (`4/4`), while **`Pour Out a Measure` (`R`)** releases clear descending bamboo ladle streams (`4/4 → 3/4 → 2/4 → 1/4 → 0/4`) until the empty basin resonates with the final *Bonshō* temple bell.

An embedded **Experience Parallel Inspector** accompanies every stage—inviting developers, researchers, and players to compare the old coordinate-chasing struggle directly against the unified non-dual design.

---

## 5. Conclusion: Designing for Dignity Under the Social Model

Under Oliver's (1990) **Social Model of Disability**, exclusion is never an intrinsic trait of a blind, low-vision, or neurodivergent person—it is an artifact of environments built around a single privileged sensory channel. Retrofitting a screen reader onto a coordinate grid grants *navigational permission*, yet true aesthetic equity requires **reimagining the medium itself** so that every participant enters the same coherent room. By uniting deterministic `Q16.16` state transitions with low-pass filtered procedural soundscapes and unhurried storytelling, `Zen-Parable-NonDual-Reflection` offers a small, reproducible blueprint for non-dual, sensory-respectful software craft.

---

## References (APA 7th Edition)

* Hedling, B. S. (2026). What is a koan? (And the playful irony of turning Zen riddles into literal game mechanics) [Companion documentation]. GitHub. github.com
* Hedling, B. S. (2026a). Non-dual epistemic architectures and geometric stabilization in high-dimensional transformer systems (v3.1) [Preprint]. Zenodo. doi.org
* Hedling, B. S. (2026b). NDH Game Dev Kit (v2.1.0-exp): Social model sensory regulation and non-visual spatial bridge [Computer software]. GitHub. github.com
* Oliver, M. (1990). The politics of disablement. Macmillan.
* Royal National Institute of Blind People (RNIB) & Roundhouse. (2015–2024). Sensory-darkness live storytelling and accessible arts collaborations (featuring Patrick Ness). RNIB / Roundhouse London.
* World Wide Web Consortium (W3C). (2023). Accessible Rich Internet Applications (WAI-ARIA) 1.2. W3C Recommendation. w3.org

