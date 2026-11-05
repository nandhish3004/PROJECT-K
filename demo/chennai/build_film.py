#!/usr/bin/env python3
"""
Build the Chennai Mobility AI film into ONE self-contained HTML file.

    python3 demo/chennai/build_film.py

No CDN, no build toolchain, no server: three.js r160 is inlined from
demo/film3/vendor/three.min.js and every audio stem is inlined as a base64 data
URL. The result is byte-for-byte offline-openable, which is the house pattern
for this repository (see README.md).

Inputs
    demo/chennai/index.src.html      shell + CSS, carries the three placeholders
    demo/chennai/src/*.js            concatenated in filename order
    demo/chennai/audio/*.mp3         narration, Tamil dialogue
    demo/film3/vendor/three.min.js   the pinned UMD build

Outputs
    demo/chennai/chennai-mobility-film.html
    docs/chennai/index.html          GitHub Pages
"""
import base64
import pathlib
import re
import sys
import datetime
import subprocess

ROOT = pathlib.Path(__file__).resolve().parents[2]
HERE = ROOT / "demo" / "chennai"
SRC = HERE / "src"
AUDIO = HERE / "audio"
VENDOR = ROOT / "demo" / "film3" / "vendor" / "three.min.js"
TEMPLATE = HERE / "index.src.html"
OUTS = [HERE / "chennai-mobility-film.html", ROOT / "docs" / "chennai" / "index.html"]

# The order matters: every module reads top-level constants from the ones
# before it, and 90-main.js boots the whole thing last.
ORDER = [
    "00-core.js",
    "10-audio.js",
    "15-textures.js",
    "20-world.js",
    "22-city.js",
    "24-rail.js",
    "30-props.js",
    "32-people.js",
    "40-cinematics.js",
    "50-hud.js",
    "90-main.js",
]


def human(n: int) -> str:
    n = float(n)
    if n < 1024:
        return f"{n:.0f} B"
    if n < 1024 * 1024:
        return f"{n / 1024:.1f} KB"
    return f"{n / (1024 * 1024):.2f} MB"


def main() -> int:
    missing = [p for p in (VENDOR, TEMPLATE) if not p.exists()]
    missing += [SRC / n for n in ORDER if not (SRC / n).exists()]
    if missing:
        for m in missing:
            print(f"  ! missing {m}", file=sys.stderr)
        return 1

    # ---- three.js -----------------------------------------------------------
    three = VENDOR.read_text(encoding="utf-8")
    rev = re.search(r'"1(?:5[0-9]|6[0-9])"', three)
    print(f"  three.js      {human(len(three.encode()))}  r{rev.group(0)[1:-1] if rev else '?'}")

    # ---- sources ------------------------------------------------------------
    parts, total = [], 0
    for name in ORDER:
        code = (SRC / name).read_text(encoding="utf-8")
        total += code.count("\n") + 1
        parts.append(f"/* ═══ {name} ═══ */\n{code.rstrip()}\n")
    bundle = "\n".join(parts)

    # A literal </script inside a string would close the inline block early.
    bad = re.findall(r"</script", bundle, re.I)
    if bad:
        bundle = re.sub(r"</(script)", r"<\\/\1", bundle, flags=re.I)
        print(f"  ! escaped {len(bad)} '</script' sequence(s) in the bundle")
    print(f"  src bundle    {human(len(bundle.encode()))}  {len(ORDER)} modules, {total} lines")

    # ---- audio --------------------------------------------------------------
    stems = sorted(AUDIO.glob("*.mp3"))
    if not stems:
        print("  ! no audio stems found; the film will be silent", file=sys.stderr)
    manifest = []
    audio_bytes = 0
    for f in stems:
        b64 = base64.b64encode(f.read_bytes()).decode("ascii")
        audio_bytes += f.stat().st_size
        manifest.append(f'"{f.stem}":"data:audio/mpeg;base64,{b64}"')
    manifest_src = "{" + ",".join(manifest) + "}"
    print(f"  audio         {human(audio_bytes)} -> {human(len(manifest_src.encode()))} b64  ({len(stems)} stems)")

    # ---- assemble -----------------------------------------------------------
    html = TEMPLATE.read_text(encoding="utf-8")
    for token in ("/*__THREE__*/", "/*__SRC__*/"):
        if token not in html:
            print(f"  ! placeholder {token} not found in the template", file=sys.stderr)
            return 1

    # The manifest placeholder lives inside 90-main.js, i.e. inside the bundle,
    # so it is substituted there before the bundle goes into the template.
    token = "/*__AUDIO_MANIFEST__*/{}"
    if token not in bundle:
        print(f"  ! placeholder {token} not found in the source bundle", file=sys.stderr)
        return 1
    bundle = bundle.replace(token, manifest_src, 1)

    # ---- build stamp --------------------------------------------------------
    # A short, lookable id: commit hash (if available) + build time. It is shown
    # on the page, so "am I looking at the version that was just deployed?" is
    # answerable at a glance instead of being a cache-guessing game.
    stamp = "dev"
    try:
        commit = subprocess.run(
            ["git", "rev-parse", "--short=7", "HEAD"],
            cwd=SRC, capture_output=True, text=True, timeout=5,
        ).stdout.strip()
        if commit:
            stamp = commit
    except Exception:
        pass
    stamp += " " + datetime.datetime.now().strftime("%Y-%m-%d %H:%M")

    token = "/*__BUILD_ID__*/dev"
    if token not in bundle:
        print(f"  ! placeholder {token} not found in the source bundle", file=sys.stderr)
        return 1
    bundle = bundle.replace(token, stamp, 1)

    html = html.replace("/*__THREE__*/", three, 1)
    html = html.replace("/*__SRC__*/", bundle, 1)

    for left in ("__AUDIO_MANIFEST__", "__BUILD_ID__", "/*__SRC__*/", "/*__THREE__*/"):
        if left in html:
            print(f"  ! placeholder {left} survived substitution", file=sys.stderr)
            return 1

    payload = html.encode("utf-8")
    for out in OUTS:
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_bytes(payload)
        print(f"  -> {out.relative_to(ROOT)}   {human(len(payload))}")

    print(f"\n  single file, offline, {human(len(payload))} total — open it directly or serve /docs")
    return 0


if __name__ == "__main__":
    sys.exit(main())
