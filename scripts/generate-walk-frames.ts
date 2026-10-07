/**
 * Paints the intro's walk: the moonlit path with its practitioner removed (the
 * plate), and the practitioner redrawn in place, one walking pose at a time.
 * Only the figure's box of `loader-path.webp` is repainted, so the scene
 * around him stays the same from one drawing to the next.
 *
 *   bun scripts/generate-walk-frames.ts plate
 *   bun scripts/generate-walk-frames.ts poses contact-left passing-left ...
 *   bun scripts/generate-walk-frames.ts sheet
 *
 * `plate` and `poses` need OPENAI_API_KEY (Bun reads it from a .env at the
 * repo's root). Every drawing is kept, as intro-walk-raw-<pose>-<time>.webp,
 * to be picked by eye into `STOP_DRAWINGS`.
 *
 * `sheet` lifts the picked drawings out of their boxes with rembg (a Python
 * with `rembg[cpu]` installed, as REMBG_PYTHON), so the figure keeps its
 * painted pixels, then lines them up into `intro-walk.webp`: one row of cells,
 * one per stop up the path, each the same height, shoulders centred and feet
 * on one baseline.
 */
import { copyFile, mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";

import {
  PAINTING,
  WALK_CELL,
  WALK_FEET_Y,
  WALK_STOPS,
} from "../client/src/components/ui/Intro/walkSheet";

const IMAGES_DIR = join(import.meta.dir, "../client/src/assets/images");
const SOURCE = join(IMAGES_DIR, "loader-path.webp");

const MODEL = "gpt-image-2.5-sunburst";

// The practitioner's box in the painting, with room above his head for the
// body's rise, and either side for a stride and an arm's swing
const FIGURE_BOX = { left: 360, top: 400, width: 320, height: PAINTING - 400 };

const STYLE =
  "Keep everything outside the masked area exactly as it is. Paint him at exactly the size he is in the original, his head about 560px from the top: a small, dark, soft-edged figure in the night, as dimly lit as the original, with no added sharpness or detail. Match the painting's muted purple palette, soft moonlight from above and grainy painterly brushwork.";

const FIGURE =
  "The same lone martial artist seen from behind: short dark hair, white keikogi, dark hakama, a wooden bokken held loosely in his left hand, hanging down at his side and angled back behind him. He walks away from the viewer, up the earthen path towards the moon. Seen from behind, the foot stepping forward is the one further up the path, and the trailing foot shows its sole.";

/**
 * The key poses of a step, as in hand-drawn animation, each drawn a touch
 * exaggerated so the step reads under the hakama
 */
const POSES = {
  "contact-left":
    "Contact pose, the widest stride: his left foot planted well ahead up the path, his right foot far behind showing its sole, the hakama pulled taut into a wide triangle between them; his right arm swung well forward, his left arm back.",
  "down-left":
    "Down pose: his weight sinking onto the bent left leg, the whole body a little lower, shoulders dipped, his right foot lifting off the ground behind, the hakama hem flaring out.",
  "passing-left":
    "Passing pose: standing upright on the left leg alone, the right knee bent and lifted beside it under the hakama, the hakama hanging narrow and straight, arms close by his sides.",
  "up-left":
    "Up pose, the highest point: rising on the toes of the left foot, the body raised and leaning forward, the right leg swinging forward under the hakama, which sways to the right.",
  "contact-right":
    "Contact pose, the widest stride: his right foot planted well ahead up the path, his left foot far behind showing its sole, the hakama pulled taut into a wide triangle between them; his left arm swung well forward, his right arm back.",
  "down-right":
    "Down pose: his weight sinking onto the bent right leg, the whole body a little lower, shoulders dipped, his left foot lifting off the ground behind, the hakama hem flaring out.",
  "passing-right":
    "Passing pose: standing upright on the right leg alone, the left knee bent and lifted beside it under the hakama, the hakama hanging narrow and straight, arms close by his sides.",
  "up-right":
    "Up pose, the highest point: rising on the toes of the right foot, the body raised and leaning forward, the left leg swinging forward under the hakama, which sways to the left.",
} as const;

type Pose = keyof typeof POSES;

/** Opaque everywhere but the figure's box, which the model may repaint */
const figureMask = () =>
  sharp({
    create: {
      width: PAINTING,
      height: PAINTING,
      channels: 4,
      background: "#fff",
    },
  })
    .composite([
      {
        input: {
          create: {
            width: FIGURE_BOX.width,
            height: FIGURE_BOX.height,
            channels: 4,
            background: "#000",
          },
        },
        left: FIGURE_BOX.left,
        top: FIGURE_BOX.top,
        blend: "dest-out",
      },
    ])
    .png()
    .toBuffer();

const png = (buffer: Buffer, name: string) =>
  new File([new Uint8Array(buffer)], name, { type: "image/png" });

/** Repaints the figure's box of the painting, saved as `<name>-<time>.webp` */
const repaint = async (prompt: string, name: string) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not set");

  const form = new FormData();
  form.append("model", MODEL);
  form.append("image[]", png(await sharp(SOURCE).png().toBuffer(), "path.png"));
  form.append("mask", png(await figureMask(), "mask.png"));
  form.append("prompt", prompt);
  form.append("quality", "high");
  form.append("size", `${PAINTING}x${PAINTING}`);

  const res = await fetch("https://api.openai.com/v1/images/edits", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form,
  });
  if (!res.ok) throw new Error(`${name}: ${res.status} ${await res.text()}`);
  const { data } = (await res.json()) as { data: { b64_json: string }[] };

  const out = join(IMAGES_DIR, `${name}-${Date.now()}.webp`);
  await sharp(Buffer.from(data[0].b64_json, "base64"))
    .webp({ quality: 90 })
    .toFile(out);
  console.log(out);
};

// The drawings picked for the sheet, one per stop up the path, in their order
const PLATE = "intro-walk-raw-plate-1791405187081.webp";
const STOP_DRAWINGS = [
  "intro-walk-raw-contact-left-1791405188983.webp",
  "intro-walk-raw-passing-left-1791405187506.webp",
  "intro-walk-raw-contact-right-1791405295671.webp",
  "intro-walk-raw-up-right-1791405296140.webp",
];

// The figure's height in each of the sheet's cells
const FIGURE_HEIGHT = 395;

const ALPHA_SOLID = 128;

const REMBG = `
import sys
from PIL import Image
from rembg import new_session, remove
src, out = sys.argv[1:3]
remove(Image.open(src), session=new_session("isnet-general-use"), post_process_mask=True).save(out)
`;

/** The figure lifted out of a drawing's box, on transparency */
const matte = async (file: string, dir: string) => {
  const src = join(dir, `${file}.png`);
  const out = join(dir, `${file}-matte.png`);
  await sharp(join(IMAGES_DIR, file)).extract(FIGURE_BOX).png().toFile(src);
  const python = process.env.REMBG_PYTHON ?? "python3";
  const proc = Bun.spawn([python, "-I", "-c", REMBG, src, out]);
  if ((await proc.exited) !== 0) throw new Error(`rembg failed on ${file}`);
  return out;
};

/** The figure's bounds, and the middle of its shoulders (steadier than its arms) */
const measure = async (file: string) => {
  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const solid = (x: number, y: number) =>
    data[(y * info.width + x) * 4 + 3] > ALPHA_SOLID;
  let [left, right, top, bottom] = [info.width, 0, info.height, 0];
  for (let y = 0; y < info.height; y++)
    for (let x = 0; x < info.width; x++)
      if (solid(x, y)) {
        left = Math.min(left, x);
        right = Math.max(right, x);
        top = Math.min(top, y);
        bottom = Math.max(bottom, y);
      }
  let [sum, count] = [0, 0];
  for (let y = top + 60; y < top + 120; y++)
    for (let x = 0; x < info.width; x++)
      if (solid(x, y)) {
        sum += x;
        count++;
      }
  return {
    left,
    top,
    width: right - left + 1,
    height: bottom - top + 1,
    shoulders: sum / count,
  };
};

/** One drawing's cell: the figure scaled to `FIGURE_HEIGHT`, shoulders centred */
const cell = async (file: string, dir: string) => {
  const matted = await matte(file, dir);
  const { left, top, width, height, shoulders } = await measure(matted);
  const scale = FIGURE_HEIGHT / height;
  const figure = await sharp(matted)
    .extract({ left, top, width, height })
    .resize(Math.round(width * scale), FIGURE_HEIGHT)
    .png()
    .toBuffer();
  const x = Math.round(WALK_CELL.width / 2 - (shoulders - left) * scale);
  // Trim whatever of a swinging arm would spill out of the cell
  const trim = Math.max(0, -x);
  const visible = Math.min(
    Math.round(width * scale) - trim,
    WALK_CELL.width - Math.max(0, x)
  );
  return sharp({
    create: {
      ...WALK_CELL,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: await sharp(figure)
          .extract({
            left: trim,
            top: 0,
            width: visible,
            height: FIGURE_HEIGHT,
          })
          .toBuffer(),
        left: Math.max(0, x),
        top: WALK_FEET_Y - FIGURE_HEIGHT,
      },
    ])
    .png()
    .toBuffer();
};

const sheet = async () => {
  if (STOP_DRAWINGS.length !== WALK_STOPS.length)
    throw new Error(
      `${WALK_STOPS.length} stops need as many drawings, not ${STOP_DRAWINGS.length}`
    );
  const dir = await mkdtemp(join(tmpdir(), "walk-"));
  const cells = await Promise.all(
    STOP_DRAWINGS.map((drawing) => cell(drawing, dir))
  );
  const out = join(IMAGES_DIR, "intro-walk.webp");
  await sharp({
    create: {
      width: WALK_CELL.width * cells.length,
      height: WALK_CELL.height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite(
      cells.map((input, i) => ({ input, left: i * WALK_CELL.width, top: 0 }))
    )
    .webp({ quality: 88, alphaQuality: 100 })
    .toFile(out);
  await copyFile(
    join(IMAGES_DIR, PLATE),
    join(IMAGES_DIR, "loader-path-empty.webp")
  );
  console.log(out);
};

const [command, ...args] = process.argv.slice(2);

if (command === "plate") {
  await repaint(
    `Remove the person entirely: paint the empty earthen path, its grass and the mist where he stood, continuing the path naturally. ${STYLE}`,
    "intro-walk-raw-plate"
  );
} else if (command === "poses") {
  const poses = (args.length ? args : Object.keys(POSES)) as Pose[];
  for (const pose of poses) {
    if (!(pose in POSES)) throw new Error(`Unknown pose: ${pose}`);
  }
  await Promise.all(
    poses.map((pose) =>
      repaint(`${FIGURE} ${POSES[pose]} ${STYLE}`, `intro-walk-raw-${pose}`)
    )
  );
} else if (command === "sheet") {
  await sheet();
} else {
  console.log("Usage: generate-walk-frames.ts plate | poses [pose...] | sheet");
}
