import type { SxProps, Theme } from "@mui/material";

import * as dark from "./tokens";

// Light mode for the public pages. The tokens below mirror `./tokens` but read
// CSS variables, falling back to the dark values, so pages render dark until
// `[data-color-scheme="light"]` sets the variables. Not for canvas (charts) or
// SVG attributes, which can't read CSS variables.

const PAPER = "245,239,226"; // warm washi
const INK = "28,21,48"; // violet-black ink
const VIOLET = "91,63,196"; // the accent, deepened to read on paper

const LIGHT = {
  PURPLE: `rgb(${VIOLET})`,
  PURPLE_HOVER: "#4a2fb0",

  DARK_BG: `rgb(${PAPER})`,
  DARK_BG_ALPHA_20: `rgba(${PAPER},0.2)`,
  DARK_BG_ALPHA_45: `rgba(${PAPER},0.45)`,
  DARK_BG_ALPHA_55: `rgba(${PAPER},0.55)`,
  DARK_BG_GRADIENT: `linear-gradient(180deg, rgba(${PAPER},0) 0%, rgba(${PAPER},0.8) 100%)`,

  BORDER_COLOR: `rgba(${VIOLET},0.22)`,
  BORDER_HOVER: `rgba(${VIOLET},0.55)`,
  SURFACE_BG: "rgba(255,255,255,0.55)",
  SURFACE_BG_02: "rgba(255,255,255,0.25)",

  PURPLE_ALPHA_04: `rgba(${VIOLET},0.04)`,
  PURPLE_ALPHA_05: `rgba(${VIOLET},0.05)`,
  PURPLE_ALPHA_06: `rgba(${VIOLET},0.06)`,
  PURPLE_ALPHA_08: `rgba(${VIOLET},0.08)`,
  PURPLE_ALPHA_10: `rgba(${VIOLET},0.1)`,
  PURPLE_ALPHA_12: `rgba(${VIOLET},0.12)`,
  PURPLE_ALPHA_15: `rgba(${VIOLET},0.15)`,
  PURPLE_ALPHA_18: `rgba(${VIOLET},0.18)`,
  PURPLE_ALPHA_25: `rgba(${VIOLET},0.25)`,
  PURPLE_ALPHA_30: `rgba(${VIOLET},0.3)`,
  PURPLE_ALPHA_50: `rgba(${VIOLET},0.5)`,

  TEXT_PRIMARY: `rgb(${INK})`,
  TEXT_MUTED: `rgba(${INK},0.62)`,
  TEXT_SUBTLE: `rgba(${INK},0.5)`,

  // White on the night is ink on paper; the faint ones (lines, washes) keep
  // their strength, the text ones gain a little
  WHITE_ALPHA_05: `rgba(${INK},0.05)`,
  WHITE_ALPHA_06: `rgba(${INK},0.06)`,
  WHITE_ALPHA_10: `rgba(${INK},0.1)`,
  WHITE_ALPHA_25: `rgba(${INK},0.25)`,
  WHITE_ALPHA_35: `rgba(${INK},0.45)`,
  WHITE_ALPHA_45: `rgba(${INK},0.55)`,
  WHITE_ALPHA_60: `rgba(${INK},0.68)`,
  WHITE_ALPHA_65: `rgba(${INK},0.72)`,
  WHITE_ALPHA_75: `rgba(${INK},0.8)`,
  WHITE_ALPHA_85: `rgba(${INK},0.88)`,
  WHITE_ALPHA_90: `rgba(${INK},0.92)`,
} satisfies Partial<Record<keyof typeof dark, string>>;

type Token = keyof typeof LIGHT;

const varName = (token: Token) =>
  `--hk-${token.toLowerCase().replace(/_/g, "-")}`;

const themed = (token: Token) => `var(${varName(token)}, ${dark[token]})`;

export const PURPLE = themed("PURPLE");
export const PURPLE_HOVER = themed("PURPLE_HOVER");
export const DARK_BG = themed("DARK_BG");
export const DARK_BG_ALPHA_20 = themed("DARK_BG_ALPHA_20");
export const DARK_BG_ALPHA_45 = themed("DARK_BG_ALPHA_45");
export const DARK_BG_ALPHA_55 = themed("DARK_BG_ALPHA_55");
export const DARK_BG_GRADIENT = themed("DARK_BG_GRADIENT");
export const BORDER_COLOR = themed("BORDER_COLOR");
export const BORDER_HOVER = themed("BORDER_HOVER");
export const SURFACE_BG = themed("SURFACE_BG");
export const SURFACE_BG_02 = themed("SURFACE_BG_02");
export const PURPLE_ALPHA_04 = themed("PURPLE_ALPHA_04");
export const PURPLE_ALPHA_05 = themed("PURPLE_ALPHA_05");
export const PURPLE_ALPHA_06 = themed("PURPLE_ALPHA_06");
export const PURPLE_ALPHA_08 = themed("PURPLE_ALPHA_08");
export const PURPLE_ALPHA_10 = themed("PURPLE_ALPHA_10");
export const PURPLE_ALPHA_12 = themed("PURPLE_ALPHA_12");
export const PURPLE_ALPHA_15 = themed("PURPLE_ALPHA_15");
export const PURPLE_ALPHA_18 = themed("PURPLE_ALPHA_18");
export const PURPLE_ALPHA_25 = themed("PURPLE_ALPHA_25");
export const PURPLE_ALPHA_30 = themed("PURPLE_ALPHA_30");
export const PURPLE_ALPHA_50 = themed("PURPLE_ALPHA_50");
export const TEXT_PRIMARY = themed("TEXT_PRIMARY");
export const TEXT_MUTED = themed("TEXT_MUTED");
export const TEXT_SUBTLE = themed("TEXT_SUBTLE");
export const WHITE_ALPHA_05 = themed("WHITE_ALPHA_05");
export const WHITE_ALPHA_06 = themed("WHITE_ALPHA_06");
export const WHITE_ALPHA_10 = themed("WHITE_ALPHA_10");
export const WHITE_ALPHA_25 = themed("WHITE_ALPHA_25");
export const WHITE_ALPHA_35 = themed("WHITE_ALPHA_35");
export const WHITE_ALPHA_45 = themed("WHITE_ALPHA_45");
export const WHITE_ALPHA_60 = themed("WHITE_ALPHA_60");
export const WHITE_ALPHA_65 = themed("WHITE_ALPHA_65");
export const WHITE_ALPHA_75 = themed("WHITE_ALPHA_75");
export const WHITE_ALPHA_85 = themed("WHITE_ALPHA_85");
export const WHITE_ALPHA_90 = themed("WHITE_ALPHA_90");

export const SKELETON_SX: SxProps<Theme> = {
  bgcolor: PURPLE_ALPHA_12,
} as const;

// The same in both schemes: painted moonlight and boards, and the blur
export {
  BACKDROP_BLUR,
  BOARD_FRAME,
  MOONLIGHT,
  MOONLIGHT_ALPHA_25,
  MOONLIGHT_ALPHA_45,
} from "./tokens";

const LIGHT_SELECTOR = '[data-color-scheme="light"]';
const DARK_SELECTOR = '[data-color-scheme="dark"]';

/** Marks an element as night: it stays dark in the light scheme */
export const NIGHT = { "data-color-scheme": "dark" } as const;

const NIGHT_BLACK = "#000";

/** A night cover on a light page melts into the paper at its foot */
export const nightCoverSx = {
  [`${LIGHT_SELECTOR} &`]: {
    background: `linear-gradient(180deg, ${NIGHT_BLACK} 80%, rgb(${PAPER}) 100%)`,
  },
} as const;

/** A night band on a light page rises out of the paper and sinks back */
export const nightBandSx = {
  [`${LIGHT_SELECTOR} &`]: {
    background: `linear-gradient(180deg, rgb(${PAPER}) 0%, ${dark.DARK_BG} 18%, ${dark.DARK_BG} 82%, rgb(${PAPER}) 100%)`,
    borderColor: "transparent",
  },
} as const;

/** Global CSS for the light scheme, for the theme's CssBaseline */
export const LIGHT_SCHEME_CSS = `
  ${LIGHT_SELECTOR} {
    color-scheme: light;
    ${(Object.keys(LIGHT) as Token[])
      .map((token) => `${varName(token)}: ${LIGHT[token]};`)
      .join("\n    ")}
    --body-background: rgb(${PAPER});
    --foreground-color: rgb(${INK});
    --background-color: rgba(${PAPER},0.6);
  }
  /* Islands of night (the painted covers and bands) inside a light page:
     the variables drop back to their dark fallbacks */
  ${LIGHT_SELECTOR} ${DARK_SELECTOR} {
    color-scheme: dark;
    ${(Object.keys(LIGHT) as Token[])
      .map((token) => `${varName(token)}: initial;`)
      .join("\n    ")}
    color: #e7e7e7;
  }
  ${LIGHT_SELECTOR} body,
  ${LIGHT_SELECTOR} a,
  ${LIGHT_SELECTOR} a:hover {
    color: rgb(${INK});
  }
  ${LIGHT_SELECTOR} ${DARK_SELECTOR} a,
  ${LIGHT_SELECTOR} ${DARK_SELECTOR} a:hover {
    color: white;
  }
`;
