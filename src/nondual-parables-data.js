/**
 * src/nondual-parables-data.js — Four Unified Contemplative Parables & Parallel Design Reflections
 *
 * Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>
 */

export const NONDUAL_PARABLES = [
  {
    id: 1,
    slug: "sound-of-one-hand",
    title: "I. The Sound of One Hand (Master Hakuin)",
    koan: "“Two hands clap and there is a sound. What is the sound of one hand?”",
    sceneOpening:
      "Darkness settles around a quiet cedar courtyard. High mountain air moves gently through the eaves. Two gestures wait beneath your hands: striking two bells together, or listening to a single breath of stillness.",
    parallelCritique:
      "Dualist Coordinate Struggle: A bolted-on screen reader announces 'east, 37% proximity' while you steer across a pixel grid—splitting perception from meaning. Here, the gesture itself IS the koan: collision creates noise; solitary listening dissolves the mist.",
    ambient: { river: 0.04, wind: 0.35, flutter: 0 },
    choices: [
      { id: "CLAP_TWO", key: "A", label: "Clap Two Hands Together (A)" },
      { id: "ONE_HAND", key: "D", label: "Listen to One Hand (D)" },
    ],
  },
  {
    id: 2,
    slug: "raft-and-the-shore",
    title: "II. The Raft and the Shore (Majjhima Nikāya 22)",
    koan: "“A raft is for crossing over, not for carrying upon your shoulders once you reach the far shore.”",
    sceneOpening:
      "A cool mountain river flows steadily across the dark room from left to right. A cedar raft rests by the near bank, ready to carry you across—and waiting to be left behind once dry moss is beneath your feet.",
    parallelCritique:
      "Dualist Coordinate Struggle: Walking between two coordinate boxes reduces non-attachment to an inventory errand. Here, you hear and feel the river carry you across, then feel the heavy creak of cedar if you try to walk onward without letting go.",
    ambient: { river: 0.65, wind: 0.20, flutter: 0 },
    choices: [
      { id: "BOARD_RAFT", key: "A", label: "Board the Cedar Raft (A)" },
      { id: "STEP_ASHORE", key: "W", label: "Step Onto the Far Shore (W)" },
      { id: "WALK_CARRYING", key: "D", label: "Walk Onward Still Carrying It (D)" },
      { id: "RELEASE_RAFT", key: "R", label: "Let Go of the Raft (R)" },
    ],
  },
  {
    id: 3,
    slug: "two-monks-and-the-flag",
    title: "III. Two Monks and the Flag (Mumonkan Case 29)",
    koan: "“Not the wind, not the flag; it is mind that moves.”",
    sceneOpening:
      "Above the dark courtyard, silk temple banners ripple and snap in shifting mountain gusts. Two voices debate whether the wind moves or the flag moves, while a moss-covered stillness stone waits at the center.",
    parallelCritique:
      "Dualist Coordinate Struggle: Treating inner stillness as a 'hit-box target' turns contemplation into button-mashing. Here, arguing external causes amplifies the wind or silk flutter, while resting in stillness settles the entire soundscape into a single heartbeat.",
    ambient: { river: 0.10, wind: 0.55, flutter: 1.0 },
    choices: [
      { id: "ARGUE_WIND", key: "A", label: "Argue: “The Wind Moves” (A)" },
      { id: "ARGUE_FLAG", key: "D", label: "Argue: “The Flag Moves” (D)" },
      { id: "REST_STILL", key: "Space", label: "Rest in Stillness (Space)" },
    ],
  },
  {
    id: 4,
    slug: "the-empty-cup",
    title: "IV. The Empty Cup (Master Nan-in)",
    koan: "“How can I show you Zen unless you first empty your cup?”",
    sceneOpening:
      "A carved granite Tsukubai water basin sits in darkness, brimming full to its stone lip (four measures of four). Each drop added spills over the edge; each measure poured out creates quiet room to receive.",
    parallelCritique:
      "Dualist Coordinate Struggle: Conventional games reward accumulating points and telemetry. Here, subtraction is the only opening: pouring out each excess measure deepens the resonant clarity of the sanctuary.",
    ambient: { river: 0.16, wind: 0.18, flutter: 0 },
    choices: [
      { id: "ADD_OPINION", key: "A", label: "Add Another Opinion (A)" },
      { id: "POUR_MEASURE", key: "R", label: "Pour Out a Measure (R)" },
    ],
  },
];
