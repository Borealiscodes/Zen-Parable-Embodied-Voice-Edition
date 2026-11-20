import json
import re
import subprocess
import sys
from pathlib import Path

LEXICON = [
    ("Tōrō", "TOH-roh"),
    ("Bonshō", "BON-shoh"),
    ("rasa-darśan", "RAH-sah DAR-shahn"),
    ("Shakuhachi", "shah-koo-HAH-chee"),
    ("Taiko", "TY-koh"),
    ("Majjhima Nikāya", "MAH-jee-mah nih-KAH-yah"),
    ("Mumonkan", "moo-MON-kahn"),
    ("Hakuin", "HAH-koo-een"),
    ("Nan-in", "NAHN-een"),
]

def normalize(text: str) -> str:
    out = str(text or "")
    for term, spoken in LEXICON:
        out = re.sub(rf"(?<![\w]){re.escape(term)}(?![\w])", spoken, out)
    return out

def fnv1a_32(text: str) -> str:
    h = 0x811c9dc5
    for b in text.encode("utf-8"):
        h ^= b
        h = (h * 0x01000193) & 0xffffffff
    return f"{h:08x}"

def extract_all_branch_cues() -> list[dict]:
    js_extract = """
      import { NONDUAL_PARABLES } from './src/nondual-parables-data.js';
      import { createNonDualState, performContemplativeGesture } from './src/nondual-kernel.js';

      const texts = new Set();

      const formatStageIntro = (p) => {
        const controls = (p.choices || [])
          .map((c) => `Press ${c.key} to ${c.label.replace(/\\s*\\([^)]+\\)$/, '')}`)
          .join('. ');
        return `${p.title}. ${p.koan} ${p.sceneOpening} Available gestures: ${controls}.`;
      };

      NONDUAL_PARABLES.forEach((p) => texts.add(formatStageIntro(p)));

      // Exhaustive BFS over all reachable states in the 4-parable state machine
      const init = createNonDualState();
      const queue = [init];
      const visited = new Set([JSON.stringify([init.stageIndex, init.onRiver, init.onFarShore, init.carryingRaft, init.stillnessCount, init.cupMeasures])]);

      while (queue.length > 0) {
        const cur = queue.shift();
        const p = NONDUAL_PARABLES[cur.stageIndex];
        if (!p || !p.choices) continue;
        for (const c of p.choices) {
          const next = performContemplativeGesture(cur, c.id);
          const raw = String(next.narration || '').trim();
          if (next.stageIndex !== cur.stageIndex && raw.includes(' — ')) {
            const [resolutionPart] = raw.split(' — ');
            texts.add(resolutionPart.trim() + '.');
          } else if (raw) {
            texts.add(raw);
          }
          const sig = JSON.stringify([next.stageIndex, next.onRiver, next.onFarShore, next.carryingRaft, next.stillnessCount, next.cupMeasures]);
          if (!visited.has(sig) && visited.size < 200) {
            visited.add(sig);
            queue.push(next);
          }
        }
      }

      console.log(JSON.stringify(Array.from(texts)));
    """
    raw = subprocess.check_output(["node", "--input-type=module", "-e", js_extract], text=True)
    lines = json.loads(raw)
    return [{"id": f"cue_{fnv1a_32(line)}", "text": line} for line in lines]

def main(model_path: str, out_dir: Path, length_scale: str = "1.28") -> None:
    cues = extract_all_branch_cues()
    out_dir.mkdir(parents=True, exist_ok=True)
    for old in out_dir.glob("*.wav"):
        old.unlink()
    for cue in cues:
        wav_file = out_dir / f"{cue['id']}.wav"
        spoken = normalize(cue["text"]).strip() + "\n"
        subprocess.run(
            [
                sys.executable, "-m", "piper",
                "--model", model_path,
                "--data-dir", ".",
                "--length-scale", length_scale,
                "--sentence-silence", "0.50",
                "--output_file", str(wav_file),
            ],
            input=spoken.encode("utf-8"),
            check=True,
        )
    print(f"Rendered {len(cues)} exhaustive content-hashed audio cues into {out_dir}")

if __name__ == "__main__":
    args = list(sys.argv)
    main(args.pop(1), Path(args.pop(1)), args.pop(1) if len(sys.argv) > 1 else "1.28")
