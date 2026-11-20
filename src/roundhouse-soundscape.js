/**
 * src/roundhouse-soundscape.js — Acoustic-First Roundhouse WebAudio Stage (Ledger 2)
 * Softly filtered (<= 800 Hz) continuous sanctuary ambience (mountain wind, river flow,
 * silk banner flutter) unified with resonant gesture responses and 4-layer Yo-scale harmonics.
 *
 * Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>
 */

import { fromQ16 } from "./core.js";

const YO_NOTES = [293.66, 329.63, 392.00, 440.00, 493.88, 587.33]; // D4, E4, G4, A4, B4, D5

export function createRoundhouseSoundscape() {
  let muted = true;
  let ctx = null;
  let masterFilter = null;
  let masterGain = null;
  let riverGain = null;
  let windGain = null;
  let windFilter = null;
  let droneTimer = null;
  let step = 0;
  let layers = 1;

  const ensureAudio = () => {
    if (!ctx && typeof window !== "undefined") {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      if (!Ctor) return null;
      ctx = new Ctor();

      masterFilter = ctx.createBiquadFilter();
      masterFilter.type = "lowpass";
      masterFilter.frequency.setValueAtTime(780, ctx.currentTime);

      masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);

      masterFilter.connect(masterGain);
      masterGain.connect(ctx.destination);

      // Smooth brown-noise loop for river & mountain wind
      const len = ctx.sampleRate * 3;
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buf.getChannelData(0);
      let last = 0;
      for (let i = 0; i < len; i++) {
        const w = Math.random() * 2 - 1;
        last = (last + 0.03 * w) / 1.03;
        data[i] = last * 2.6;
      }

      const riverSrc = ctx.createBufferSource();
      riverSrc.buffer = buf;
      riverSrc.loop = true;
      const riverLp = ctx.createBiquadFilter();
      riverLp.type = "lowpass";
      riverLp.frequency.setValueAtTime(310, ctx.currentTime);
      riverGain = ctx.createGain();
      riverGain.gain.setValueAtTime(0.005, ctx.currentTime);
      riverSrc.connect(riverLp);
      riverLp.connect(riverGain);
      riverGain.connect(masterFilter);
      riverSrc.start();

      const windSrc = ctx.createBufferSource();
      windSrc.buffer = buf;
      windSrc.loop = true;
      windFilter = ctx.createBiquadFilter();
      windFilter.type = "bandpass";
      windFilter.frequency.setValueAtTime(420, ctx.currentTime);
      windFilter.Q.setValueAtTime(2.0, ctx.currentTime);
      windGain = ctx.createGain();
      windGain.gain.setValueAtTime(0.015, ctx.currentTime);
      windSrc.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(masterFilter);
      windSrc.start();
    }
    if (ctx && ctx.state === "suspended") ctx.resume();
    return ctx;
  };

  const playTone = (freq, type, peak, attack, decay, pan = 0) => {
    const ac = ensureAudio();
    if (!ac || muted || !freq) return;
    const now = ac.currentTime;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    const panner = ac.createStereoPanner ? ac.createStereoPanner() : null;

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(peak, now + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

    osc.connect(gain);
    if (panner) {
      panner.pan.setValueAtTime(Math.max(-1, Math.min(1, pan)), now);
      gain.connect(panner);
      panner.connect(masterFilter);
    } else {
      gain.connect(masterFilter);
    }

    osc.start(now);
    osc.stop(now + decay + 0.06);
  };

  const startSanctuaryDrone = () => {
    if (droneTimer && typeof window !== "undefined") {
      window.clearInterval(droneTimer);
      droneTimer = null;
    }
    if (muted || typeof window === "undefined") return;

    droneTimer = window.setInterval(() => {
      if (muted) return;
      const idx = step % YO_NOTES.length;
      if (step % 4 === 0) playTone(YO_NOTES.at(idx), "sine", 0.05, 0.35, 2.2, -0.15);
      if (layers >= 2 && step % 2 === 0) playTone(YO_NOTES.at((idx + 2) % 6), "triangle", 0.04, 0.04, 1.1, 0.2);
      if (layers >= 3 && step % 4 === 2) playTone(73.42, "sine", 0.075, 0.03, 0.8, 0);
      if (layers >= 4 && step % 8 === 0) playTone(587.33, "sine", 0.045, 0.06, 2.8, 0);
      step++;
    }, 640);
  };

  return {
    isMuted: () => muted,
    toggleMute: () => {
      muted = !muted;
      if (!muted) {
        ensureAudio();
        startSanctuaryDrone();
      } else {
        if (droneTimer && typeof window !== "undefined") {
          window.clearInterval(droneTimer);
          droneTimer = null;
        }
        if (riverGain && ctx) riverGain.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.15);
        if (windGain && ctx) windGain.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.15);
      }
      return muted;
    },
    syncAmbience: (state) => {
      layers = state.harmonicLayers;
      if (muted || !ctx) return;
      const now = ctx.currentTime;
      const amb = state.parable.ambient;
      const turb = fromQ16(state.turbulenceQ16);

      const riverTarget = state.onRiver ? 0.14 : amb.river * 0.09;
      if (riverGain) riverGain.gain.setTargetAtTime(riverTarget, now, 0.25);

      const windTarget = (amb.wind * 0.06) + (amb.flutter * turb * 0.08);
      if (windGain) windGain.gain.setTargetAtTime(windTarget, now, 0.25);
      if (windFilter) windFilter.frequency.setTargetAtTime(340 + turb * 260, now, 0.25);
    },
    playCue: (cue) => {
      if (muted) return;
      if (cue === "TWO_HAND_CLAP") {
        playTone(220, "triangle", 0.08, 0.01, 0.35, -0.75);
        playTone(233.08, "triangle", 0.08, 0.01, 0.35, 0.75);
      } else if (cue === "ONE_HAND_CHIME") {
        playTone(587.33, "sine", 0.075, 0.04, 1.9, 0);
      } else if (cue === "RIVER_CROSSING") {
        playTone(329.63, "sine", 0.055, 0.12, 1.4, -0.4);
        setTimeout(() => playTone(392.00, "sine", 0.055, 0.12, 1.4, 0.4), 240);
      } else if (cue === "SHORE_ARRIVAL") {
        playTone(440.00, "sine", 0.06, 0.08, 1.2, 0.3);
      } else if (cue === "HEAVY_WOOD") {
        playTone(110.00, "triangle", 0.075, 0.02, 0.5, 0);
      } else if (cue === "RAFT_RELEASED") {
        playTone(493.88, "sine", 0.065, 0.05, 1.6, 0);
      } else if (cue === "WIND_SURGE" || cue === "FLAG_FLUTTER") {
        playTone(311.13, "triangle", 0.06, 0.05, 0.7, cue === "WIND_SURGE" ? -0.6 : 0.6);
      } else if (cue === "STILLNESS_BREATH" || cue === "STILLNESS_HEARTBEAT") {
        playTone(73.42, "sine", 0.09, 0.04, 1.2, 0);
      } else if (cue === "CUP_OVERFLOW") {
        playTone(523.25, "triangle", 0.06, 0.01, 0.3, 0);
      } else if (cue === "WATER_POUR") {
        playTone(493.88, "sine", 0.055, 0.03, 0.7, 0);
        setTimeout(() => playTone(392.00, "sine", 0.055, 0.03, 0.8, 0), 150);
      } else if (cue === "BONSHO_STILLNESS" || cue === "SANCTUARY_COMPLETE") {
        [293.66, 392.00, 440.00, 587.33].forEach((f, i) => {
          setTimeout(() => playTone(f, "sine", 0.065, 0.08, 2.2, 0), i * 220);
        });
      }
    },
  };
}
