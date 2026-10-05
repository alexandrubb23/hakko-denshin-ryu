import { SxProps, Theme } from "@mui/material";

// How long the light takes to come on, before it starts flickering
const LIGHT_UP = "1.2s";

// A faulty bulb, over a 13s cycle (1% ≈ 130ms): mostly steady, one stray
// blip, then a burst of stutters, a moment dark, and a stuttering return.
// Linear timing between close keyframes makes the cuts sharp.
const FLICKER_CYCLE = "13s";
const FLICKER_LEVELS: Record<string, number> = {
  "0%, 100%": 1,
  // A stray blip
  "21%": 1,
  "21.4%": 0.25,
  "21.8%": 1,
  // The burst
  "57%": 1,
  "57.4%": 0.1,
  "57.8%": 1,
  "59%": 1,
  "59.3%": 0.2,
  "60.1%": 0.85,
  "60.5%": 0.05,
  "61%": 1,
  // Dark for ~0.7s
  "61.8%": 1,
  "62.1%": 0,
  "67.5%": 0,
  // Stutters back on
  "67.9%": 0.7,
  "68.3%": 0.1,
  "69%": 1,
};

interface LightOptions {
  lit: boolean;
  /** Keyframes name, unique per use */
  name: string;
  /** The CSS property that fades in as the light comes on */
  property: string;
  /** That property's style at a light level from 0 (dark) to 1 (full) */
  style: (level: number) => Record<string, string | number>;
  /** Which elements flicker, the box itself by default */
  target?: string;
}

/**
 * Rests at full light when `lit` (dark otherwise), fades between the two,
 * then flickers once the light is up; all still under reduced motion
 */
export const lightSx = ({
  lit,
  name,
  property,
  style,
  target = "&",
}: LightOptions): SxProps<Theme> => ({
  ...style(lit ? 1 : 0),
  transition: `${property} ${LIGHT_UP} ease-in`,
  [target]: {
    // Starts once the light is up, so the light-up transition plays first
    animation: lit
      ? `${name} ${FLICKER_CYCLE} linear ${LIGHT_UP} infinite`
      : "none",
  },
  [`@keyframes ${name}`]: Object.fromEntries(
    Object.entries(FLICKER_LEVELS).map(([at, level]) => [at, style(level)])
  ),
  "@media (prefers-reduced-motion: reduce)": {
    transition: "none",
    [target]: { animation: "none" },
  },
});

/** A board sits in the dark while its lantern is out, and flickers with it */
export const boardLightSx = (lit: boolean) =>
  lightSx({
    lit,
    name: "boardFlicker",
    property: "filter",
    style: (level) => ({
      filter: `brightness(${0.55 + 0.45 * level}) saturate(${0.7 + 0.3 * level})`,
    }),
  });
