/**
 * src/nondual-kernel.js — Unified Zero-Coordinate Q16.16 Contemplative State Machine (Ledger 1)
 * Every physical gesture directly enacts the parable's meaning—zero (x, y) pixel chasing
 * and zero out-of-band coordinate telemetry.
 *
 * Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>
 */

import { toQ16, sha256Hex } from "./core.js";
import { NONDUAL_PARABLES } from "./nondual-parables-data.js";

export function createNonDualState() {
  const first = NONDUAL_PARABLES.at(0);
  return {
    stepCount: 0,
    stageIndex: 0,
    parable: first,
    completedAll: false,
    // Embodied parable states
    onRiver: false,
    onFarShore: false,
    carryingRaft: false,
    stillnessCount: 0, // 0 .. 3
    cupMeasures: 4,    // 4 -> 0
    harmonicLayers: 1,
    turbulenceQ16: toQ16(0.4),
    narration: first.sceneOpening,
    narrationSeq: 1,
    acousticCue: "BREATH_OPEN",
  };
}

function transitionStage(state, closingLine, cue) {
  if (state.stageIndex >= NONDUAL_PARABLES.length - 1) {
    return {
      ...state,
      completedAll: true,
      harmonicLayers: 4,
      turbulenceQ16: 0,
      narrationSeq: state.narrationSeq + 1,
      narration:
        closingLine +
        " Darkness and sound rest in unbroken stillness. All four parables have dissolved into presence.",
      acousticCue: "SANCTUARY_COMPLETE",
    };
  }

  const nextIdx = state.stageIndex + 1;
  const nextParable = NONDUAL_PARABLES.at(nextIdx);
  return {
    ...state,
    stageIndex: nextIdx,
    parable: nextParable,
    onRiver: false,
    onFarShore: false,
    carryingRaft: false,
    stillnessCount: 0,
    cupMeasures: 4,
    harmonicLayers: nextIdx + 1,
    turbulenceQ16: nextIdx === 2 ? toQ16(0.85) : toQ16(0.3),
    narrationSeq: state.narrationSeq + 1,
    narration: closingLine + " — " + nextParable.title + ". " + nextParable.sceneOpening,
    acousticCue: cue,
  };
}

export function performContemplativeGesture(state, actionId) {
  const stepCount = state.stepCount + 1;
  const base = { ...state, stepCount };

  // Parable I: The Sound of One Hand
  if (state.stageIndex === 0) {
    if (actionId === "CLAP_TWO") {
      return {
        ...base,
        turbulenceQ16: toQ16(0.9),
        narrationSeq: state.narrationSeq + 1,
        narration:
          "Two heavy bronze bells collide—a sharp clap echoes and thick mist rises around you. Listen instead for what sounds without collision.",
        acousticCue: "TWO_HAND_CLAP",
      };
    }
    if (actionId === "ONE_HAND") {
      return transitionStage(
        base,
        "A single breath of Shakuhachi flute and one clear stone chime dissolve the mist without effort",
        "ONE_HAND_CHIME"
      );
    }
  }

  // Parable II: The Raft and the Shore
  if (state.stageIndex === 1) {
    if (actionId === "BOARD_RAFT") {
      return {
        ...base,
        onRiver: true,
        onFarShore: false,
        carryingRaft: true,
        turbulenceQ16: toQ16(0.65),
        narrationSeq: state.narrationSeq + 1,
        narration:
          "You step onto the cedar raft. Cool river currents carry you steadily across the dark water toward the far bank.",
        acousticCue: "RIVER_CROSSING",
      };
    }
    if (actionId === "STEP_ASHORE") {
      if (!state.carryingRaft && !state.onRiver) {
        return {
          ...base,
          narrationSeq: state.narrationSeq + 1,
          narration: "The river still flows before you. Board the cedar raft first to cross the current.",
          acousticCue: "GENTLE_PULSE",
        };
      }
      return {
        ...base,
        onRiver: false,
        onFarShore: true,
        carryingRaft: true,
        turbulenceQ16: toQ16(0.25),
        narrationSeq: state.narrationSeq + 1,
        narration:
          "Soft moss meets your feet on the far shore, yet the heavy cedar raft still rests upon your shoulders.",
        acousticCue: "SHORE_ARRIVAL",
      };
    }
    if (actionId === "WALK_CARRYING") {
      return {
        ...base,
        narrationSeq: state.narrationSeq + 1,
        narration: state.carryingRaft
          ? "Timber groans under your step—carrying the raft across dry land turns a helpful vessel into dead weight. Let it go."
          : "You walk lightly along the quiet bank.",
        acousticCue: "HEAVY_WOOD",
      };
    }
    if (actionId === "RELEASE_RAFT") {
      if (!state.onFarShore) {
        return {
          ...base,
          narrationSeq: state.narrationSeq + 1,
          narration: "Cross to the far shore before releasing the raft back to the water.",
          acousticCue: "GENTLE_PULSE",
        };
      }
      return transitionStage(
        { ...base, carryingRaft: false },
        "You set the cedar raft down at the water's edge and walk forward unburdened",
        "RAFT_RELEASED"
      );
    }
  }

  // Parable III: Two Monks and the Flag
  if (state.stageIndex === 2) {
    if (actionId === "ARGUE_WIND") {
      return {
        ...base,
        turbulenceQ16: toQ16(0.95),
        narrationSeq: state.narrationSeq + 1,
        narration:
          "“The wind moves!” Mountain gusts surge across left and right ears, whipping the silk banners faster.",
        acousticCue: "WIND_SURGE",
      };
    }
    if (actionId === "ARGUE_FLAG") {
      return {
        ...base,
        turbulenceQ16: toQ16(0.95),
        narrationSeq: state.narrationSeq + 1,
        narration:
          "“The flag moves!” Rapid silk flutter ripples overhead without bringing peace.",
        acousticCue: "FLAG_FLUTTER",
      };
    }
    if (actionId === "REST_STILL") {
      const nextStill = Math.min(3, state.stillnessCount + 1);
      if (nextStill >= 3) {
        return transitionStage(
          { ...base, stillnessCount: 3, turbulenceQ16: 0 },
          "Neither wind nor flag moves; attention settles into a single quiet heartbeat",
          "STILLNESS_HEARTBEAT"
        );
      }
      return {
        ...base,
        stillnessCount: nextStill,
        turbulenceQ16: toQ16(Math.max(0.15, 0.85 - nextStill * 0.28)),
        narrationSeq: state.narrationSeq + 1,
        narration: `You pause in stillness (${nextStill} of 3 breaths). The restless flutter softens into quiet air.`,
        acousticCue: "STILLNESS_BREATH",
      };
    }
  }

  // Parable IV: The Empty Cup
  if (state.stageIndex === 3) {
    if (actionId === "ADD_OPINION") {
      return {
        ...base,
        turbulenceQ16: toQ16(0.8),
        narrationSeq: state.narrationSeq + 1,
        narration:
          "More water spills noisily over the brim of the already full basin—there is no room left to receive.",
        acousticCue: "CUP_OVERFLOW",
      };
    }
    if (actionId === "POUR_MEASURE") {
      const nextCup = Math.max(0, state.cupMeasures - 1);
      if (nextCup === 0) {
        return transitionStage(
          { ...base, cupMeasures: 0, turbulenceQ16: 0 },
          "The fourth measure pours away; the empty granite basin reflects the stillness of the whole sanctuary",
          "BONSHO_STILLNESS"
        );
      }
      return {
        ...base,
        cupMeasures: nextCup,
        turbulenceQ16: toQ16(nextCup * 0.15),
        narrationSeq: state.narrationSeq + 1,
        narration: `Clear spring water pours from the bamboo ladle (${nextCup} of 4 measures remaining).`,
        acousticCue: "WATER_POUR",
      };
    }
  }

  return base;
}

export function buildReflectionReceipt(state) {
  const payload = {
    schema: "ndh.zen.parable.nondual.reflection.v1",
    stageReached: state.stageIndex + 1,
    parableSlug: state.parable.slug,
    completedAll: state.completedAll,
    harmonicLayers: state.harmonicLayers,
    gesturesTaken: state.stepCount,
  };
  return {
    ...payload,
    sha256: sha256Hex(JSON.stringify(payload)),
  };
}
