import type { SxProps, Theme } from "@mui/material";

import { REDUCED_MOTION } from "@style/art";
import {
  PURPLE,
  TEXT_MUTED,
  TEXT_PRIMARY,
  WHITE_ALPHA_10,
} from "@style/colorScheme";
import theme from "@style/theme";

// Ported from Fumadocs' table of contents (fumadocs-ui, MIT,
// Copyright (c) 2023 Fuma)

/** Where the line runs, from the rows' left edge */
const LINE_X = 8;
const DOT_SIZE = 4;

/** The rows, in order: what the line is measured against */
export const ROW = "a[href]";

const THUMB_TRANSITION =`${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeInOut}`;

// Scrolls on its own, without a scrollbar; its ends fade out, so a row cut
// by the edge reads as more to scroll to
export const tocScrollAreaSx: SxProps<Theme> = {
  position: "relative",
  minHeight: 0,
  ml: "1px",
  py: 1.5,
  overflow: "auto",
  overscrollBehavior: "contain",
  scrollbarWidth: "none",
  maskImage:
    "linear-gradient(to bottom, transparent, white 16px, white calc(100% - 16px), transparent)",
};

/**
 * The rows, and the line beside them. The rows are links, which the site's
 * global `a` rules paint white; these outrank them, the active row's last so
 * it keeps its colour under hover. No hover on touch screens, where a tapped
 * row would stay lit.
 */
export const tocListSx: SxProps<Theme> = {
  position: "relative",
  display: "flex",
  flexDirection: "column",

  [`& ${ROW}`]: { color: TEXT_MUTED },
  "@media (hover: hover)": { [`& ${ROW}:hover`]: { color: TEXT_PRIMARY } },
  [`& ${ROW}[data-active="true"]`]: { color: PURPLE },
};

// The faint line along every row
export const tocRailSx: SxProps<Theme> = {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: LINE_X,
  width: "1px",
  bgcolor: WHITE_ALPHA_10,
};

// The lit stretch of the line, beside the rows in view (`--toc-track-*`)
export const tocTrackSx: SxProps<Theme> = {
  position: "absolute",
  left: LINE_X,
  width: "1px",
  top: "var(--toc-track-top)",
  height: "calc(var(--toc-track-bottom) - var(--toc-track-top))",
  bgcolor: PURPLE,
  transition: `top ${THUMB_TRANSITION}, height ${THUMB_TRANSITION}`,
  [REDUCED_MOTION]: { transition: "none" },
};

// The dot at the lit stretch's end the reading moves towards (`--toc-dot`)
export const tocDotSx: SxProps<Theme> = {
  position: "absolute",
  left: LINE_X + 0.5 - DOT_SIZE / 2,
  top: `calc(var(--toc-dot) - ${DOT_SIZE / 2}px)`,
  width: DOT_SIZE,
  height: DOT_SIZE,
  borderRadius: "50%",
  bgcolor: PURPLE,
  transition: `top ${THUMB_TRANSITION}`,
  [REDUCED_MOTION]: { transition: "none" },
};

export const tocRowSx: SxProps<Theme> = {
  position: "relative",
  py: 0.75,
  pl: "20px",
  fontSize: "0.875rem",
  lineHeight: 1.43,
  overflowWrap: "anywhere",
  transition: `color ${theme.transitions.duration.shortest}ms ease`,
  "&:first-of-type": { pt: 0 },
  "&:last-of-type": { pb: 0 },
};
