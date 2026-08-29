#!/usr/bin/env python3
"""Geometric album covers for Ember — charcoal + ember orange + cream."""
from __future__ import annotations

import math
import os
import random

from PIL import Image, ImageDraw, ImageFilter, ImageEnhance

OUT = "/workspace/public/music/covers"
os.makedirs(OUT, exist_ok=True)

BG = (12, 11, 10)
EMBER = (232, 93, 44)
CREAM = (244, 239, 232)
CHAR = (22, 20, 18)
RUST = (168, 62, 32)
SAND = (196, 168, 140)
INK = (28, 24, 22)


def noise(img: Image.Image, amt: int = 18) -> Image.Image:
    rnd = random.Random(img.size[0] * 97)
    px = img.load()
    w, h = img.size
    for _ in range(w * h // 12):
        x, y = rnd.randrange(w), rnd.randrange(h)
        r, g, b = px[x, y]
        d = rnd.randint(-amt, amt)
        px[x, y] = (max(0, min(255, r + d)), max(0, min(255, g + d)), max(0, min(255, b + d)))
    return img


def save(img: Image.Image, name: str) -> None:
    img = img.filter(ImageFilter.GaussianBlur(0.4))
    img = ImageEnhance.Contrast(img).enhance(1.05)
    path = os.path.join(OUT, name)
    img.convert("RGB").save(path, "JPEG", quality=86, optimize=True)
    print(path, os.path.getsize(path) // 1024, "KB")


def night_circuits() -> Image.Image:
    im = Image.new("RGB", (800, 800), BG)
    d = ImageDraw.Draw(im)
    cx, cy = 400, 430
    for i, r in enumerate(range(40, 380, 28)):
        col = EMBER if i % 3 == 0 else (40 + i * 4, 28, 22)
        d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=col, width=3 if i % 3 == 0 else 1)
    d.polygon([(400, 80), (430, 200), (370, 200)], fill=EMBER)
    d.rectangle((0, 0, 800, 18), fill=EMBER)
    return noise(im)


def ember_sky() -> Image.Image:
    im = Image.new("RGB", (800, 800), (18, 12, 10))
    d = ImageDraw.Draw(im)
    for y in range(800):
        t = y / 800
        r = int(18 + (232 - 18) * (1 - t) ** 2 * 0.55)
        g = int(12 + (93 - 12) * (1 - t) ** 3 * 0.4)
        b = int(10 + 20 * t)
        d.line([(0, y), (800, y)], fill=(r, g, b))
    d.ellipse((220, 260, 580, 620), fill=EMBER)
    d.ellipse((250, 300, 550, 600), fill=(18, 12, 10))
    d.ellipse((340, 390, 460, 510), fill=CREAM)
    return noise(im, 12)


def tape_loops() -> Image.Image:
    im = Image.new("RGB", (800, 800), CHAR)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle((90, 140, 710, 660), 40, fill=INK, outline=SAND, width=4)
    for cx in (280, 520):
        d.ellipse((cx - 110, 290, cx + 110, 510), outline=SAND, width=10)
        d.ellipse((cx - 36, 364, cx + 36, 436), fill=EMBER)
    d.rectangle((250, 390, 550, 410), fill=SAND)
    return noise(im)


def copper_hours() -> Image.Image:
    im = Image.new("RGB", (800, 800), BG)
    d = ImageDraw.Draw(im)
    random.seed(7)
    for i in range(14):
        y = 40 + i * 52
        w = 220 + (i * 47) % 420
        col = EMBER if i % 4 == 0 else (RUST if i % 3 == 0 else (50, 36, 28))
        d.rectangle((80, y, 80 + w, y + 28), fill=col)
    d.rectangle((620, 40, 720, 760), fill=CREAM)
    return noise(im)


def afterglow() -> Image.Image:
    im = Image.new("RGB", (800, 800), (16, 10, 8))
    d = ImageDraw.Draw(im)
    for i in range(18, 0, -1):
        r = i * 22
        t = i / 18
        col = (
            int(lerp(16, 232, t ** 0.7)),
            int(lerp(10, 93, t)),
            int(lerp(8, 44, t * 0.8)),
        )
        d.ellipse((400 - r, 520 - r, 400 + r, 520 + r), fill=col)
    d.rectangle((0, 620, 800, 800), fill=BG)
    return noise(im, 10)


def harbor_sessions() -> Image.Image:
    im = Image.new("RGB", (800, 800), (14, 16, 18))
    d = ImageDraw.Draw(im)
    for i in range(9):
        y = 180 + i * 58
        amp = 28 + i * 4
        pts = []
        for x in range(0, 801, 8):
            yy = y + math.sin(x / 70 + i * 0.7) * amp
            pts.append((x, yy))
        d.line(pts, fill=CREAM if i == 4 else (EMBER if i % 2 == 0 else (70, 78, 86)), width=3)
    d.rectangle((0, 0, 18, 800), fill=EMBER)
    return noise(im)


def dustlight() -> Image.Image:
    im = Image.new("RGB", (800, 800), BG)
    d = ImageDraw.Draw(im)
    random.seed(21)
    for i in range(36):
        x = 40 + (i % 6) * 128
        y = 40 + (i // 6) * 128
        size = 88 if (i + i // 6) % 2 == 0 else 52
        col = EMBER if i in (8, 15, 21) else (SAND if i % 5 == 0 else INK)
        d.rounded_rectangle((x, y, x + size, y + size), 10, fill=col)
    return noise(im)


def red_hour() -> Image.Image:
    im = Image.new("RGB", (800, 800), BG)
    d = ImageDraw.Draw(im)
    d.polygon([(400, 60), (740, 720), (60, 720)], outline=EMBER, width=8)
    d.polygon([(400, 180), (620, 660), (180, 660)], fill=RUST)
    d.polygon([(400, 300), (520, 600), (280, 600)], fill=BG)
    d.ellipse((370, 470, 430, 530), fill=CREAM)
    return noise(im)


def lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


ALBUMS = {
    "night-circuits.jpg": night_circuits,
    "ember-sky.jpg": ember_sky,
    "tape-loops.jpg": tape_loops,
    "copper-hours.jpg": copper_hours,
    "afterglow.jpg": afterglow,
    "harbor-sessions.jpg": harbor_sessions,
    "dustlight.jpg": dustlight,
    "red-hour.jpg": red_hour,
}

if __name__ == "__main__":
    for name, fn in ALBUMS.items():
        save(fn(), name)
