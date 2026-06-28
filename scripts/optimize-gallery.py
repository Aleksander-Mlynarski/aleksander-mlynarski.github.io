"""Kompresja zdjęć galerii do WebP (max 1400px)."""
from pathlib import Path

from PIL import Image, ImageOps

GALLERY = Path(__file__).resolve().parent.parent / "assets" / "gallery"
MAX_SIZE = 1400
WEBP_QUALITY = 82

total_before = 0.0
total_after = 0.0

for src in sorted(GALLERY.iterdir()):
    if src.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
        continue

    dst = src.with_suffix(".webp")
    before = src.stat().st_size / (1024 * 1024)
    total_before += before

    img = ImageOps.exif_transpose(Image.open(src))
    if img.mode not in ("RGB", "L"):
        img = img.convert("RGB")
    img.thumbnail((MAX_SIZE, MAX_SIZE), Image.Resampling.LANCZOS)
    img.save(dst, "WEBP", quality=WEBP_QUALITY, method=6)

    after = dst.stat().st_size / (1024 * 1024)
    total_after += after
    print(f"{src.name}: {before:.2f} MB -> {dst.name}: {after:.2f} MB")

print(f"RAZEM: {total_before:.2f} MB -> {total_after:.2f} MB")
