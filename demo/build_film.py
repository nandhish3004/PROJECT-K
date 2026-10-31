#!/usr/bin/env python3
"""Inject generated voice-over clips into the demo film as base64 data URIs,
producing a single self-contained HTML file that works offline."""
import base64, json, pathlib, sys

HERE = pathlib.Path(__file__).resolve().parent
SRC = HERE / "propcare-demo-film.src.html"
OUT = HERE / "propcare-demo-film.html"
AUDIO = HERE / "audio"

manifest = {}
if AUDIO.is_dir():
    for p in sorted(AUDIO.glob("scene-*.mp3")):
        idx = p.stem.split("-")[1]
        manifest[str(int(idx) - 1)] = (
            "data:audio/mpeg;base64," + base64.b64encode(p.read_bytes()).decode()
        )

src = SRC.read_text(encoding="utf-8")
if "__AUDIO_MANIFEST__" not in src:
    sys.exit("marker __AUDIO_MANIFEST__ not found in source")

src = src.replace("__AUDIO_MANIFEST__", json.dumps(manifest))
OUT.write_text(src, encoding="utf-8")
print(f"wrote {OUT} with {len(manifest)} voice-over clips, {OUT.stat().st_size/1e6:.2f} MB")
