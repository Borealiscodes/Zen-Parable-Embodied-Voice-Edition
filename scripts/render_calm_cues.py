import json
import re
import subprocess
import sys
from pathlib import Path

LEXICON = [("Tōrō", "TOH-roh"), ("Bonshō", "BON-shoh"), ("rasa-darśan", "RAH-sah DAR-shahn")]

def normalize(text: str) -> str:
    out = text
    for term, spoken in LEXICON:
        out = re.sub(rf"(?<![\w]){re.escape(term)}(?![\w])", spoken, out)
    return out

def main(model_path: str, out_dir: Path, length_scale: str = "1.35") -> None:
    data = json.loads(Path("scripts/calm-narration-cues.json").read_text(encoding="utf-8"))
    out_dir.mkdir(parents=True, exist_ok=True)
    for cue in data["cues"]:
        wav_file = out_dir / f"{cue['id']}.wav"
        spoken = normalize(cue["text"]).strip() + "\n"
        subprocess.run(
            [sys.executable, "-m", "piper", "--model", model_path, "--data-dir", ".", "--length-scale", length_scale, "--sentence-silence", "0.60", "--output_file", str(wav_file)],
            input=spoken.encode("utf-8"),
            check=True,
        )

if __name__ == "__main__":
    args = list(sys.argv)
    main(args.pop(1), Path(args.pop(1)), args.pop(1) if len(sys.argv) > 1 else "1.35")
