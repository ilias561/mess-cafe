# Menu cutouts

Transparent-background PNGs of individual dishes. When a file here is wired to a
menu item via the `cutout` field in `lib/menu-data.ts`, that item renders as a
floating product card (see components/menu/MenuItem.tsx → CutoutMedia/NameChip).

Specs: square framing, dish centred, ~1000×1000px, transparent background,
consistent top-down or ¾ angle + lighting across all dishes so the grid is uniform.
Make with remove.bg / Photoroom / Photoshop / `rembg`.

Until an item has a cutout, it falls back to its rectangular image/video — nothing breaks.
