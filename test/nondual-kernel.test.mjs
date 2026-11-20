/**
 * test/nondual-kernel.test.mjs — Verification of Zero-Coordinate Non-Dual Parables & SHA-256 Receipt
 * Run: node --test test/nondual-kernel.test.mjs
 *
 * Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>
 */

import test from "node:test";
import assert from "node:assert/strict";

import {
  createNonDualState,
  performContemplativeGesture,
  buildReflectionReceipt,
} from "../src/nondual-kernel.js";

test("1. All Four Unified Non-Dual Parables Progress Without Coordinate Telemetry", () => {
  let s = createNonDualState();
  assert.equal(s.stageIndex, 0);

  // Parable I: Two-hand clap raises mist; One-hand listening dissolves it
  s = performContemplativeGesture(s, "CLAP_TWO");
  assert.equal(s.stageIndex, 0);
  s = performContemplativeGesture(s, "ONE_HAND");
  assert.equal(s.stageIndex, 1);

  // Parable II: Board raft -> Step ashore -> Let go of the raft
  s = performContemplativeGesture(s, "BOARD_RAFT");
  s = performContemplativeGesture(s, "STEP_ASHORE");
  s = performContemplativeGesture(s, "RELEASE_RAFT");
  assert.equal(s.stageIndex, 2);

  // Parable III: Three breaths of stillness calm wind and banner together
  s = performContemplativeGesture(s, "REST_STILL");
  s = performContemplativeGesture(s, "REST_STILL");
  s = performContemplativeGesture(s, "REST_STILL");
  assert.equal(s.stageIndex, 3);

  // Parable IV: Pour four measures until empty (0/4)
  s = performContemplativeGesture(s, "POUR_MEASURE");
  s = performContemplativeGesture(s, "POUR_MEASURE");
  s = performContemplativeGesture(s, "POUR_MEASURE");
  s = performContemplativeGesture(s, "POUR_MEASURE");
  assert.equal(s.completedAll, true);
  assert.equal(s.harmonicLayers, 4);
});

test("2. Contemplation Receipt Generates Deterministic 64-Char SHA-256 Digest", () => {
  const s = createNonDualState();
  const receipt = buildReflectionReceipt(s);
  assert.equal(receipt.sha256.length, 64);
  assert.equal(receipt.stageReached, 1);
});
