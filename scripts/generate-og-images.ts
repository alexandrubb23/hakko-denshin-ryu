/**
 * Crops each page's moon cover into a 1200x630 JPEG for Open Graph previews,
 * written to client/public/og/<page>.jpg (stable URLs, committed to the repo).
 * Re-run with `bun run og:images` whenever a cover painting changes.
 */
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const IMAGES_DIR = join(import.meta.dir, "../client/src/assets/images");
const OUT_DIR = join(import.meta.dir, "../client/public/og");

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

// moonY and moonDiameter are copied from each page's *Art.ts module
const COVERS = [
  { page: "home", file: "hakko-moon-bg.webp", moonY: 0.4336, moonDiameter: 0.1465 },
  { page: "hakko-ryu", file: "hakko-ryu-dojo.webp", moonY: 0.2217, moonDiameter: 0.162 },
  { page: "senshinkan", file: "senshinkan-basin.webp", moonY: 0.2227, moonDiameter: 0.156 },
  { page: "dojo", file: "dojo-interior.webp", moonY: 0.3057, moonDiameter: 0.114 },
  { page: "schedule", file: "dojo-facade.webp", moonY: 0.1538, moonDiameter: 0.138 },
  { page: "contact", file: "contact-gate.webp", moonY: 0.2222, moonDiameter: 0.156 },
  { page: "events", file: "events-stage.webp", moonY: 0.2222, moonDiameter: 0.1558 },
  { page: "login", file: "dojo-locked.webp", moonY: 0.1494, moonDiameter: 0.105 },
];

await mkdir(OUT_DIR, { recursive: true });

for (const { page, file, moonY, moonDiameter } of COVERS) {
  const image = sharp(join(IMAGES_DIR, file));
  const { width = 0, height = 0 } = await image.metadata();

  // Full width, OG aspect ratio
  const cropHeight = Math.round((width * OG_HEIGHT) / OG_WIDTH);
  const moonCentre = moonY * height;
  const moonSize = moonDiameter * height;

  // Portrait art: centre the band on the moon. Landscape art: centre the
  // band, but move it up when that would cut the moon (plus half a moon of
  // sky above it).
  const top =
    height > width
      ? moonCentre - cropHeight / 2
      : Math.min((height - cropHeight) / 2, moonCentre - moonSize);
  const clampedTop = Math.round(Math.max(0, Math.min(height - cropHeight, top)));

  const out = join(OUT_DIR, `${page}.jpg`);
  await image
    .extract({ left: 0, top: clampedTop, width, height: cropHeight })
    .resize(OG_WIDTH, OG_HEIGHT)
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out);

  console.log(`${page}: ${file} → og/${page}.jpg (crop top ${clampedTop}px)`);
}
