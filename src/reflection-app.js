/**
 * src/reflection-app.js — Unified Storyteller, Gesture Deck & Experience Parallel Inspector
 *
 * Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>
 */

import {
  createNonDualState,
  performContemplativeGesture,
  buildReflectionReceipt,
} from "./nondual-kernel.js";
import { createRoundhouseSoundscape } from "./roundhouse-soundscape.js";

function initNonDualSanctuary() {
  const soundscape = createRoundhouseSoundscape();

  const hudStageEl = document.getElementById("hud-stage");
  const parableTitleEl = document.getElementById("parable-title");
  const parableKoanEl = document.getElementById("parable-koan");
  const storyVoiceEl = document.getElementById("storyteller-voice");
  const gestureDeckEl = document.getElementById("gesture-deck");
  const parallelCritiqueEl = document.getElementById("parallel-critique");

  const audioBtn = document.getElementById("btn-audio");
  const speechBtn = document.getElementById("btn-speech");
  const resetBtn = document.getElementById("btn-reset");
  const receiptBox = document.getElementById("receipt-output");

  let state = createNonDualState();
  let spokenEnabled = false;
  let lastSpokenSeq = 0;
  let lastRenderedStage = -1;
  let cueQueue = ["p0-intro"];

  const cuePlayer = typeof Audio !== "undefined" ? new Audio() : null;
  if (cuePlayer) cuePlayer.volume = 0.92;

  const speakStory = (text, cues = []) => {
    if (!spokenEnabled || typeof window === "undefined") return;
    if (cuePlayer) {
      cuePlayer.pause();
      cuePlayer.onended = null;
    }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();

    const fallbackSpeech = () => {
      if (!("speechSynthesis" in window)) return;
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.86;
      utter.pitch = 0.95;
      window.speechSynthesis.speak(utter);
    };

    const list = Array.isArray(cues) ? cues.filter(Boolean) : (cues ? [cues] : []);
    if (list.length > 0 && cuePlayer) {
      const playAt = (idx) => {
        if (!spokenEnabled || idx >= list.length) return;
        cuePlayer.src = `audio/${list[idx]}.wav`;
        cuePlayer.onended = () => {
          if (idx + 1 < list.length) playAt(idx + 1);
        };
        cuePlayer.play().catch(fallbackSpeech);
      };
      playAt(0);
      return;
    }
    fallbackSpeech();
  };

  const triggerGesture = (actionId) => {
    const prevStage = state.stageIndex;
    state = performContemplativeGesture(state, actionId);
    cueQueue = state.stageIndex !== prevStage
      ? [`p${prevStage}-${actionId}`, `p${state.stageIndex}-intro`]
      : [`p${state.stageIndex}-${actionId}`];
    soundscape.playCue(state.acousticCue);
    soundscape.syncAmbience(state);
    renderSanctuary();
  };

  const renderGestureButtons = () => {
    if (!gestureDeckEl) return;
    gestureDeckEl.innerHTML = "";
    for (const choice of state.parable.choices) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "gesture-btn";
      btn.textContent = choice.label;
      btn.addEventListener("click", () => triggerGesture(choice.id));
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

    if (storyVoiceEl && storyVoiceEl.textContent !== state.narration) {
      storyVoiceEl.textContent = state.narration;
    }

    if (state.stageIndex !== lastRenderedStage) {
      lastRenderedStage = state.stageIndex;
      renderGestureButtons();
    }

    if (state.narrationSeq !== lastSpokenSeq) {
      lastSpokenSeq = state.narrationSeq;
      speakStory(state.narration, cueQueue);
    }
  };

  renderSanctuary();

  // Keyboard shortcuts mapped directly to the active parable's gestures
  window.addEventListener("keydown", (ev) => {
    const k = ev.key === " " ? "Space" : ev.key.toUpperCase();
    const matched = state.parable.choices.find((c) => c.key.toUpperCase() === k);
    if (matched) {
      ev.preventDefault();
      triggerGesture(matched.id);
    }
  });

  audioBtn?.addEventListener("click", () => {
    const muted = soundscape.toggleMute();
    audioBtn.textContent = muted ? "Soundscape: Muted" : "🌊 Sanctuary Soundscape: ON";
    if (!muted) {
      soundscape.syncAmbience(state);
      soundscape.playCue("BREATH_OPEN");
    }
  });

  speechBtn?.addEventListener("click", () => {
    spokenEnabled = !spokenEnabled;
    speechBtn.textContent = spokenEnabled ? "🗣️ Storyteller Voice: ON" : "🗣️ Storyteller Voice: OFF";
    if (spokenEnabled) speakStory(state.narration, cueQueue);
  });

  resetBtn?.addEventListener("click", () => {
    state = createNonDualState();
    lastRenderedStage = -1;
    cueQueue = ["p0-intro"];
    soundscape.syncAmbience(state);
    renderSanctuary();
  });

  document.getElementById("btn-receipt")?.addEventListener("click", () => {
    if (receiptBox) receiptBox.value = JSON.stringify(buildReflectionReceipt(state), null, 2);
  });
}

window.addEventListener("DOMContentLoaded", initNonDualSanctuary);
