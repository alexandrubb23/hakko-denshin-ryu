import type { SxProps, Theme } from "@mui/material";

import {
  DARK_BG,
  MOONLIGHT,
  MOONLIGHT_ALPHA_25,
  MOONLIGHT_ALPHA_45,
  PURPLE_ALPHA_30,
} from "@style/colorScheme";

import {
  type ArcDirection,
  type MoonArt,
  artHeight,
  artWidth,
  moonEdge,
} from "./moonArt";

export type { ArcDirection };

/** Builds one style per direction, once, instead of on every render */
const byDirection = <T>(build: (direction: ArcDirection) => T) => ({
  left: build("left"),
  right: build("right"),
});

const itemDelay = (index: number) => 0.15 + index * 0.08;

const MOON_GLOW_REST = `0 0 30px ${MOONLIGHT_ALPHA_25}, 0 0 80px ${PURPLE_ALPHA_30}`;
const MOON_GLOW_PEAK = `0 0 45px ${MOONLIGHT_ALPHA_45}, 0 0 120px ${PURPLE_ALPHA_30}`;

/** Menu sizes for narrow screens, where the arc sits in the page flow */
export const COMPACT_ARC_SIZE = {
  "--moon-size": "clamp(84px, 24vw, 140px)",
  "--arc-radius": "clamp(28px, 9vw, 72px)",
  "--arc-gap": "clamp(12px, 4vw, 32px)",
  "--arc-item-size": "clamp(1.05rem, 4.4vw, 1.5rem)",
} as const;

// Sizes are CSS variables so each layout can scale the menu through `sx`
export const arcWrapperSx = (
  itemCount: number,
  direction: ArcDirection
): SxProps<Theme> => ({
  "--moon-size": "96px",
  // Horizontal reach of the arc's midpoint; the outer items sit at the left edge
  "--arc-radius": "160px",
  "--arc-gap": "40px",
  "--arc-item-size": "1.6rem",
  position: "relative",
  display: "flex",
  // The moon comes first in the markup; fanning left puts it on the right
  flexDirection: direction === "left" ? "row-reverse" : "row",
  alignItems: "center",
  gap: "var(--arc-gap)",

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

// Rays and links once drawn in: the end of the intro, shown straight away
// with reduced motion or after the first page
const RAY_AT_REST = { animation: "none", strokeDashoffset: 0 };
const ITEM_AT_REST = { animation: "none", opacity: 1 };

// Menus that skip the intro (see useArcIntro) show their rays and links at rest
export const restingArcSx: SxProps<Theme> = {
  "& line": RAY_AT_REST,
  "& li": ITEM_AT_REST,
};

// The moon, rays and links carry view transition names, so navigating
// between covers (see useViewTransitionNavigate) glides them to their new
// place. Names must be unique, so only one menu may show at a time (Home's
// wide and narrow covers both mount one; the hidden copy is `display: none`,
// which view transitions don't capture).
export const raysSvgSx: SxProps<Theme> = {
  viewTransitionName: "arc-rays",
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
  "@media (prefers-reduced-motion: reduce)": RAY_AT_REST,
});

// Halo over the moon; `--moon-size` matches the moon painted in the background
// art, so the disc itself is left transparent and only the glow breathes
export const moonSx: SxProps<Theme> = {
  viewTransitionName: "arc-moon",
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

export const arcListSx = byDirection<SxProps<Theme>>((direction) => ({
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: direction === "left" ? "flex-end" : "flex-start",
  gap: 0.5,
  py: 0,
  // Items slide in away from the moon
  "@keyframes arcItemIn": {
    from: {
      opacity: 0,
      translate: direction === "left" ? "24px 0" : "-24px 0",
    },
    to: { opacity: 1, translate: "0 0" },
  },
}));

export const arcItemSx = byDirection(
  (direction) =>
    (index: number, count: number): SxProps<Theme> => ({
      viewTransitionName: `arc-link-${index}`,
      // sin() over the half-turn gives the ")" curve (or "(" when fanning left):
      // 0 at the ends, 1 in the middle
      [direction === "left" ? "mr" : "ml"]:
        `calc(var(--arc-radius) * ${Math.sin((Math.PI * (index + 0.5)) / count).toFixed(4)})`,
      width: "fit-content",
      whiteSpace: "nowrap",
      textAlign: direction === "left" ? "right" : "left",
      fontSize: "var(--arc-item-size)",
      // Keeps the links legible where they cross bright parts of a painting
      textShadow: `0 0 10px ${DARK_BG}, 0 0 18px ${DARK_BG}`,
      opacity: 0,
      // `translate` (not `transform`) so the hover scale in ListItemStyle still works
      animation: "arcItemIn 0.6s ease-out forwards",
      animationDelay: `${itemDelay(index) + 0.25}s`,
      "@media (prefers-reduced-motion: reduce)": ITEM_AT_REST,
    })
);

// Where a painting lies: scaled and placed so its moon lies under the menu's
// moon. Shared by the painting itself and by its overlay.
export const artFrameSx = (
  art: MoonArt,
  direction: ArcDirection
): SxProps<Theme> => {
  const height = artHeight(art, "var(--moon-size)");
  const width = artWidth(art, height);
  // The moon is vertically centred on its edge of the wrapper
  const { edge, fromEdge } = moonEdge(art, direction);

  return {
    position: "absolute",
    width,
    height,
    [edge]: `calc(var(--moon-size) / 2 - ${width} * ${fromEdge})`,
    top: `calc(50% - ${height} * ${art.moonY})`,
    pointerEvents: "none",
  };
};

// The painting, behind the menu at z-index -1, so the page places it in a
// stacking context (e.g. `isolation: isolate`) to keep it above its own
// background
export const artImageSx = (art: MoonArt): SxProps<Theme> => ({
  zIndex: -1,
  backgroundImage: `url(${art.src})`,
  backgroundSize: "100% 100%",
});

// A painting's overlay: in the painting's place, but in front of the menu
export const artOverlaySx: SxProps<Theme> = { zIndex: 2 };
