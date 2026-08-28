"""Render app/icon.svg's geometry to app/favicon.ico and app/apple-icon.png.

app/icon.svg is the source of truth — modern browsers use it directly. The
paths below mirror it exactly, so if you edit the SVG, edit them to match and
re-run from the repo root:

    pip install pillow && python3 scripts/make-icons.py

Needs Pillow only; it draws the mark rather than rasterising the SVG, so there
is no headless-browser or librsvg dependency.
"""
from PIL import Image, ImageDraw

GREEN = (12, 128, 71, 255)
WHITE = (255, 255, 255, 255)
UNITS = 32            # the SVG viewBox
SS = 32               # supersample: px per SVG unit
N = UNITS * SS        # 1024
RX = 7                # corner radius, SVG units
STROKE = 2.9          # stroke-width, SVG units

# One wave: M x0 y Q (x0+d/2) (y-a) (x0+d) y  T ...  T ...
# d = segment width, a = amplitude; T reflects the previous control point.
def wave(y, x0=5.0, d=7.0, a=3.9, segs=3):
    pts, cx, cy = [(x0, y)], x0 + d / 2, y - a
    x = x0
    for i in range(segs):
        p0 = (x, y)
        c = (cx, cy) if i == 0 else (2 * x - cx, 2 * y - cy)
        cx, cy = c
        x1 = x + d
        for t in [j / 24 for j in range(1, 25)]:
            u = 1 - t
            pts.append((
                u * u * p0[0] + 2 * u * t * c[0] + t * t * x1,
                u * u * p0[1] + 2 * u * t * c[1] + t * t * y,
            ))
        x = x1
    return pts

img = Image.new("RGBA", (N, N), (0, 0, 0, 0))
d = ImageDraw.Draw(img)
d.rounded_rectangle([0, 0, N - 1, N - 1], radius=RX * SS, fill=GREEN)

w = int(round(STROKE * SS))
for y in (10.6, 16.0, 21.4):
    pts = [(x * SS, yy * SS) for x, yy in wave(y)]
    d.line(pts, fill=WHITE, width=w, joint="curve")
    for cap in (pts[0], pts[-1]):                      # stroke-linecap="round"
        d.ellipse([cap[0] - w / 2, cap[1] - w / 2,
                   cap[0] + w / 2, cap[1] + w / 2], fill=WHITE)

tile = img.resize((512, 512), Image.LANCZOS)
# favicon.ico — 16/32/48, the sizes browsers actually ask for
tile.resize((48, 48), Image.LANCZOS).save(
    "app/favicon.ico", format="ICO", sizes=[(48, 48), (32, 32), (16, 16)])

# apple-icon.png — iOS masks its own corners, so hand it a full-bleed square
apple = Image.new("RGBA", (180, 180), GREEN)
apple.alpha_composite(tile.resize((180, 180), Image.LANCZOS))
apple.convert("RGB").save("app/apple-icon.png", format="PNG", optimize=True)
print("wrote app/favicon.ico and app/apple-icon.png")
