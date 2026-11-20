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

def extract_canonical_cues() -> list[dict]:
    js_extract = """
      import { NONDUAL_PARABLES } from './src/nondual-parables-data.js';
      import { createNonDualState, performContemplativeGesture } from './src/nondual-kernel.js';

      const cues = [];
      NONDUAL_PARABLES.forEach((p, idx) => {
        const controls = (p.choices || [])
          .map((c) => `Press ${c.key} to ${c.label.replace(/\\s*\\([^)]+\\)$/, '')}`)
          .join('. ');
        cues.push({
          id: `p${idx}-intro`,
          text: `${p.title}. ${p.koan} ${p.sceneOpening} Available gestures: ${controls}.`
        });
        (p.choices || []).forEach((c) => {
          const base = createNonDualState();
          base.stageIndex = idx;
          const next = performContemplativeGesture(base, c.id);
          cues.push({
            id: `p${idx}-${c.id}`,
            text: String(next.narration || '')
          });
        });
      });
      console.log(JSON.stringify(cues));
    """
    raw = subprocess.check_output(["node", "--input-type=module", "-e", js_extract], text=True)
    return json.loads(raw)

def main(model_path: str, out_dir: Path, length_scale: str = "1.28") -> None:
    cues = extract_canonical_cues()
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
    print(f"Rendered {len(cues)} canonical audio-text parity cues into {out_dir}")

if __name__ == "__main__":
    args = list(sys.argv)
    main(args.pop(1), Path(args.pop(1)), args.pop(1) if len(sys.argv) > 1 else "1.28")
