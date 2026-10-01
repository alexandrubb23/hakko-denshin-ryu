import type { SxProps, Theme } from "@mui/material";

import {
  MOONLIGHT,
  MOONLIGHT_ALPHA_25,
  MOONLIGHT_ALPHA_45,
  PURPLE_ALPHA_30,
} from "@style/tokens";

const itemDelay = (index: number) => 0.15 + index * 0.08;

const MOON_GLOW_REST = `0 0 30px ${MOONLIGHT_ALPHA_25}, 0 0 80px ${PURPLE_ALPHA_30}`;
const MOON_GLOW_PEAK = `0 0 45px ${MOONLIGHT_ALPHA_45}, 0 0 120px ${PURPLE_ALPHA_30}`;

// The menu only renders on wide screens (`lg` and up), so sizes aren't responsive
export const arcWrapperSx = (itemCount: number): SxProps<Theme> => ({
  "--moon-size": "96px",
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: 5,

  // Light up a link's ray while the link is hovered (or is the current page)
  ...Object.fromEntries(
    Array.from({ length: itemCount }, (_, i) => [
      `&:has(li:nth-of-type(${i + 1}):hover, li:nth-of-type(${i + 1}) [aria-current="page"]) line:nth-of-type(${i + 1})`,
      {
        strokeWidth: 2,
        opacity: 1,
        filter: `drop-shadow(0 0 4px ${MOONLIGHT})`,
      },
    ])
  ),
});

export const raysSvgSx: SxProps<Theme> = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  overflow: "visible",
  pointerEvents: "none",
  zIndex: 0,
};

export const rayGlowSx = (index: number): SxProps<Theme> => ({
  strokeWidth: 1,
  strokeLinecap: "round",
  opacity: 0.55,
  transition: "opacity 250ms, stroke-width 250ms, filter 250ms",
  // Draw each ray outwards from the moon, just before its link appears
  strokeDasharray: 1,
  strokeDashoffset: 1,
  animation: "rayDraw 0.7s ease-out forwards",
  animationDelay: `${itemDelay(index)}s`,
  "@keyframes rayDraw": { to: { strokeDashoffset: 0 } },
  "@media (prefers-reduced-motion: reduce)": {
    animation: "none",
    strokeDashoffset: 0,
  },
});

// Halo over the moon; `--moon-size` matches the moon painted in the background
// art, so the disc itself is left transparent and only the glow breathes
export const moonSx: SxProps<Theme> = {
  position: "relative",
  zIndex: 1,
  flexShrink: 0,
  width: "var(--moon-size)",
  height: "var(--moon-size)",
  borderRadius: "50%",
  boxShadow: MOON_GLOW_REST,
  animation: "moonGlow 6s ease-in-out infinite",
  "@keyframes moonGlow": {
    "0%, 100%": { boxShadow: MOON_GLOW_REST },
    "50%": { boxShadow: MOON_GLOW_PEAK },
  },
  "@media (prefers-reduced-motion: reduce)": { animation: "none" },
};

export const arcListSx: SxProps<Theme> = {
  // Horizontal reach of the arc's midpoint; the outer items sit at the left edge
  "--arc-radius": "160px",
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 0.5,
  py: 0,
  "@keyframes arcItemIn": {
    from: { opacity: 0, translate: "-24px 0" },
    to: { opacity: 1, translate: "0 0" },
  },
};

export const arcItemSx = (index: number, count: number): SxProps<Theme> => ({
  // sin() over the half-turn gives the ")" curve: 0 at the ends, 1 in the middle
  ml: `calc(var(--arc-radius) * ${Math.sin((Math.PI * (index + 0.5)) / count).toFixed(4)})`,
  width: "fit-content",
  whiteSpace: "nowrap",
  textAlign: "left",
  fontSize: "1.6rem",
  opacity: 0,
  // `translate` (not `transform`) so the hover scale in ListItemStyle still works
  animation: "arcItemIn 0.6s ease-out forwards",
  animationDelay: `${itemDelay(index) + 0.25}s`,
  "@media (prefers-reduced-motion: reduce)": { animation: "none", opacity: 1 },
});
