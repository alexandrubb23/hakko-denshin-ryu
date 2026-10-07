// Where the intro's practitioner is seen up the path, and the layout of
// intro-walk.webp that draws him there; shared by the intro and the script that
// makes the sheet (scripts/generate-walk-frames.ts). All in px of the painting.

/** The painting's side */
export const PAINTING = 1024;

/** One of his stops up the path, drawn by the sheet's cell of the same index */
export interface WalkStop {
  /** Where his feet are */
  x: number;
  y: number;
  /** Smaller as the path winds away */
  scale: number;
}

// He's seen in a few still moments up the path, like a comic's panels, one
// with each of the intro's beats (INTRO_BEATS), from where the painting's
// practitioner stood to the bend into the trees
export const WALK_STOPS: WalkStop[] = [
  { x: 580, y: 891, scale: 1 },
  { x: 700, y: 807, scale: 0.55 },
  { x: 850, y: 736, scale: 0.32 },
  { x: 785, y: 678, scale: 0.18 },
];

/** Each drawing's cell, in a single row, one per stop */
export const WALK_CELL = { width: 240, height: 440 };

/** The line his feet stand on, in each cell */
export const WALK_FEET_Y = WALK_CELL.height - 14;
