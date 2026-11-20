import { createNonDualState, performContemplativeGesture, buildReflectionReceipt } from "./nondual-kernel.js";
import { NONDUAL_PARABLES } from "./nondual-parables-data.js";
import { createRoundhouseSoundscape } from "./roundhouse-soundscape.js";

function fnv1a32(str) {
  const bytes = new TextEncoder().encode(String(str || ""));
  let h = 0x811c9dc5;
  for (let i = 0; i < bytes.length; i += 1) {
    h ^= bytes[i];
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}

function formatStageIntro(p) {
  if (!p) return "";
  const controls = (p.choices || [])
    .map((c) => `Press ${c.key} to ${c.label.replace(/\s*\([^)]+\)$/, "")}`)
    .join(". ");
  return `${p.title}. ${p.koan} ${p.sceneOpening} Available gestures: ${controls}.`;
}

export function initNonDualReflectionApp() {
  const soundscape = createRoundhouseSoundscape();

  const hudStageEl = document.getElementById("hud-stage");
  const resetBtn = document.getElementById("btn-reset");
  const parableTitleEl = document.getElementById("parable-title");
  const parableKoanEl = document.getElementById("parable-koan");
  const storyVoiceEl = document.getElementById("storyteller-voice");
  const gestureDeckEl = document.getElementById("gesture-deck");
  const parallelCritiqueEl = document.getElementById("parallel-critique");
  const receiptBtn = document.getElementById("btn-receipt");
  const receiptBox = document.getElementById("receipt-output");

  let state = createNonDualState();
  let lastSpokenSeq = -1;
  let lastRenderedStage = -1;
  let hasStartedIntro = false;
  let spokenLinesQueue = [formatStageIntro(NONDUAL_PARABLES)];

  const cuePlayer = typeof Audio !== "undefined" ? new Audio() : null;
  if (cuePlayer) cuePlayer.volume = 0.94;

  const ensureSoundscapeUnmuted = () => {
    try {
      if (soundscape.isMuted()) {
        soundscape.toggleMute();
        soundscape.syncAmbience(state);
      }
    } catch (_) {}
  };

  const speakLines = (lines) => {
    if (typeof window === "undefined") return;
    if (cuePlayer) {
      cuePlayer.pause();
      cuePlayer.onended = null;
    }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();

    const list = (Array.isArray(lines) ? lines : [lines]).map((s) => String(s || "").trim()).filter(Boolean);
    if (list.length === 0) return;

    const fallbackSpeech = (startIdx = 0) => {
      if (!("speechSynthesis" in window)) return;
      const fullText = list.slice(startIdx).join(" ");
      const utter = new SpeechSynthesisUtterance(fullText);
      utter.rate = 0.86;
      utter.pitch = 0.95;
      window.speechSynthesis.speak(utter);
    };

    if (cuePlayer) {
      const playAt = (idx) => {
        if (idx >= list.length) return;
        const hashId = fnv1a32(list[idx]);
        cuePlayer.src = `audio/cue_${hashId}.wav`;
        cuePlayer.onended = () => {
          if (idx + 1 < list.length) playAt(idx + 1);
        };
        cuePlayer.play()
          .then(() => {
            hasStartedIntro = true;
          })
          .catch(() => {
            // Autoplay blocked prior to first user touch; unlockAudio will trigger on first gesture
          });
      };
      playAt(0);
      return;
    }
    fallbackSpeech(0);
  };

  const triggerGesture = (actionId) => {
    ensureSoundscapeUnmuted();
    hasStartedIntro = true;
    const prevStage = state.stageIndex;
    state = performContemplativeGesture(state, actionId);
    const raw = String(state.narration || "").trim();

    if (state.stageIndex !== prevStage) {
      const resolutionPart = raw.includes(" — ") ? raw.split(" — ").trim() + "." : raw;
      const nextStageIntro = formatStageIntro(state.parable);
      spokenLinesQueue = [resolutionPart, nextStageIntro];
    } else {
      spokenLinesQueue = [raw];
    }

    soundscape.playCue(state.acousticCue);
    soundscape.syncAmbience(state);
    renderSanctuary();
  };

  const renderGestureButtons = () => {
    if (!gestureDeckEl) return;
    gestureDeckEl.innerHTML = "";
    const choices = (state.parable && state.parable.choices) || [];
    for (const choice of choices) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "gesture-btn";
      btn.textContent = choice.label;
      btn.addEventListener("click", (ev) => {
        ev.stopPropagation();
        triggerGesture(choice.id);
      });
      gestureDeckEl.appendChild(btn);
    }
  };

  const renderSanctuary = () => {
    if (hudStageEl) {
      hudStageEl.textContent =
        "Parable " + (state.stageIndex + 1) + " of 4 • Harmonic Layers: " + state.harmonicLayers + "/4";
    }
    if (parableTitleEl) parableTitleEl.textContent = state.parable.title;
    if (parableKoanEl) parableKoanEl.textContent = state.parable.koan;
    if (parallelCritiqueEl) parallelCritiqueEl.textContent = state.parable.parallelCritique;

    const displayNarration = spokenLinesQueue.join(" ");
    if (storyVoiceEl && storyVoiceEl.textContent !== displayNarration) {
      storyVoiceEl.textContent = displayNarration;
    }

    if (state.stageIndex !== lastRenderedStage) {
      lastRenderedStage = state.stageIndex;
      renderGestureButtons();
    }

    if (state.narrationSeq !== lastSpokenSeq) {
      lastSpokenSeq = state.narrationSeq;
      speakLines(spokenLinesQueue);
    }
  };

  renderSanctuary();
  ensureSoundscapeUnmuted();

  // If browser blocks immediate autoplay on load, start intro voice & soundscape on the first tap anywhere
  const unlockOnFirstTouch = () => {
    ensureSoundscapeUnmuted();
    if (!hasStartedIntro) {
      hasStartedIntro = true;
      speakLines(spokenLinesQueue);
    }
  };
  window.addEventListener("pointerdown", unlockOnFirstTouch, { once: true });

  window.addEventListener("keydown", (ev) => {
    const k = ev.key === " " ? "Space" : ev.key.toUpperCase();
    const match = (state.parable.choices || []).find((c) => c.key.toUpperCase() === k);
    if (match) {
      ev.preventDefault();
      triggerGesture(match.id);
    }
  });

  resetBtn?.addEventListener("click", (ev) => {
    ev.stopPropagation();
    ensureSoundscapeUnmuted();
    hasStartedIntro = true;
    state = createNonDualState();
    lastRenderedStage = -1;
    lastSpokenSeq = -1;
    spokenLinesQueue = [formatStageIntro(state.parable)];
    soundscape.syncAmbience(state);
    renderSanctuary();
  });

  receiptBtn?.addEventListener("click", () => {
    if (receiptBox) receiptBox.value = buildReflectionReceipt(state);
  });
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNonDualReflectionApp);
  } else {
    initNonDualReflectionApp();
  }
}
