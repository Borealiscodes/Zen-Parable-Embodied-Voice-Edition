import { createNonDualState, performContemplativeGesture, buildReflectionReceipt } from "./nondual-kernel.js";
import { NONDUAL_PARABLES } from "./nondual-parables-data.js";
import { createRoundhouseSoundscape } from "./roundhouse-soundscape.js";

function fnv1a32(str) {
  const bytes = new TextEncoder().encode(str);
  let h = 0x811c9dc5;
  for (let i = 0; i < bytes.length; i += 1) {
    h ^= bytes[i];
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}

function formatStageIntro(p) {
  const controls = (p.choices || [])
    .map((c) => `Press ${c.key} to ${c.label.replace(/\s*\([^)]+\)$/, "")}`)
    .join(". ");
  return `${p.title}. ${p.koan} ${p.sceneOpening} Available gestures: ${controls}.`;
}

export function initNonDualReflectionApp() {
  const soundscape = createRoundhouseSoundscape();

  const entryGateEl = document.getElementById("entry-gate");
  const enterBtn = document.getElementById("btn-enter-sanctuary");
  const hudStageEl = document.getElementById("hud-stage");
  const audioBtn = document.getElementById("btn-audio");
  const speechBtn = document.getElementById("btn-speech");
  const resetBtn = document.getElementById("btn-reset");
  const parableTitleEl = document.getElementById("parable-title");
  const parableKoanEl = document.getElementById("parable-koan");
  const storyVoiceEl = document.getElementById("storyteller-voice");
  const gestureDeckEl = document.getElementById("gesture-deck");
  const parallelCritiqueEl = document.getElementById("parallel-critique");
  const receiptBtn = document.getElementById("btn-receipt");
  const receiptBox = document.getElementById("receipt-output");

  let state = createNonDualState();
  let spokenEnabled = false;
  let lastSpokenSeq = 0;
  let lastRenderedStage = -1;
  let spokenLinesQueue = [formatStageIntro(NONDUAL_PARABLES[0])];

  const cuePlayer = typeof Audio !== "undefined" ? new Audio() : null;
  if (cuePlayer) cuePlayer.volume = 0.92;

  const speakLines = (lines) => {
    if (!spokenEnabled || typeof window === "undefined") return;
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
        if (!spokenEnabled || idx >= list.length) return;
        const hashId = fnv1a32(list[idx]);
        cuePlayer.src = `audio/cue_${hashId}.wav`;
        cuePlayer.onended = () => {
          if (idx + 1 < list.length) playAt(idx + 1);
        };
        cuePlayer.play().catch(() => fallbackSpeech(idx));
      };
      playAt(0);
      return;
    }
    fallbackSpeech(0);
  };

  const awakenFullAudio = () => {
    if (!soundscape.isEnabled()) {
      soundscape.enable();
      soundscape.syncAmbience(state);
      if (audioBtn) audioBtn.textContent = "Sanctuary Soundscape: ON";
    }
    if (!spokenEnabled) {
      spokenEnabled = true;
      if (speechBtn) speechBtn.textContent = "🗣️ Storyteller Voice: ON";
    }
    if (entryGateEl) entryGateEl.style.display = "none";
  };

  const triggerGesture = (actionId) => {
    const prevStage = state.stageIndex;
    state = performContemplativeGesture(state, actionId);
    const raw = String(state.narration || "").trim();

    if (state.stageIndex !== prevStage) {
      const resolutionPart = raw.includes(" — ") ? raw.split(" — ")[0].trim() + "." : raw;
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
    for (const choice of state.parable.choices) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "gesture-btn";
      btn.textContent = choice.label;
      btn.addEventListener("click", () => triggerGesture(choice.id));
if (state.narrationSeq !== lastSpokenSeq) {
lastSpokenSeq = state.narrationSeq;
speakLines(spokenLinesQueue);
}
};
renderSanctuary();
enterBtn?.addEventListener("click", () => {
awakenFullAudio();
soundscape.playCue("BREATH_OPEN");
spokenLinesQueue = [formatStageIntro(state.parable)];
speakLines(spokenLinesQueue);
});
window.addEventListener("keydown", (ev) => {
const k = ev.key === " " ? "Space" : ev.key.toUpperCase();
const match = state.parable.choices.find((c) => c.key.toUpperCase() === k);
if (match) {
ev.preventDefault();
if (!soundscape.isEnabled() && !spokenEnabled && entryGateEl?.style.display !== "none") {
awakenFullAudio();
}
triggerGesture(match.id);
}
});
audioBtn?.addEventListener("click", () => {
if (soundscape.isEnabled()) {
soundscape.disable();
audioBtn.textContent = "Sanctuary Soundscape: Muted";
} else {
soundscape.enable();
soundscape.syncAmbience(state);
audioBtn.textContent = "Sanctuary Soundscape: ON";
soundscape.playCue("BREATH_OPEN");
}
});
speechBtn?.addEventListener("click", () => {
spokenEnabled = !spokenEnabled;
speechBtn.textContent = spokenEnabled ? "🗣️ Storyteller Voice: ON" : "🗣️ Storyteller Voice: OFF";
if (spokenEnabled) {
if (entryGateEl) entryGateEl.style.display = "none";
speakLines(spokenLinesQueue);
} else if (cuePlayer) {
cuePlayer.pause();
}
});
resetBtn?.addEventListener("click", () => {
state = createNonDualState();
lastRenderedStage = -1;
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
