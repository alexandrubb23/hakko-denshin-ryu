import type { SxProps, Theme } from "@mui/material";

import { CONTROL_SHADOW, coverEyebrowSx, slideMotionSx } from "@style/art";
import {
  BORDER_COLOR,
  BORDER_HOVER,
  DARK_BG,
  PURPLE,
  PURPLE_ALPHA_30,
  TEXT_PRIMARY,
} from "@style/colorScheme";
import theme from "@style/theme";
import { mergeSx } from "@utils/sx";

const PANEL_WIDTH = 224;

// The panel's gutter from the screen's edge
const GUTTER = 16;

// Where the margin beside the page's measure fits the open panel: the lg
// Container, plus the panel and its gutter on EACH side, because the measure
// is centred
const WIDE = `@media (min-width: ${theme.breakpoints.values.lg + 2 * (PANEL_WIDTH + GUTTER)}px)`;

// Fixed to the right edge, vertically centred: over the page rather than in
// it. Under the cover controls (appBar), the menus and the dialogs.
export const sectionNavSx: SxProps<Theme> = {
  position: "fixed",
  zIndex: (theme) => theme.zIndex.speedDial,
  top: "50%",
  right: GUTTER,
  transform: "translateY(-50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: 1.5,
  "@media print": { display: "none" },
};

// The wide screens' panel while the page is still: faded out and out of the
// pointer's way. Kept while hovered, and back when reached by the keyboard
const panelRestingSx = {
  opacity: 0,
  transform: "translateX(16px)",
  pointerEvents: "none",
  "&:hover, &:focus-within": {
    opacity: 1,
    transform: "none",
    pointerEvents: "auto",
  },
} as const;

/**
 * The panel around the table of contents. Narrow screens show it while
 * `open`; wide ones while `peeking`.
 */
export const sectionNavPanelSx = (
  open: boolean,
  peeking: boolean
): SxProps<Theme> => ({
  display: open ? "block" : "none",
  [WIDE]: {
    display: "block",
    ...slideMotionSx("opacity 0.35s ease"),
    ...(!peeking && panelRestingSx),
  },
  width: PANEL_WIDTH,
  maxWidth: `calc(100vw - ${2 * GUTTER}px)`,
  p: 2.5,
  borderRadius: 2,
  border: `1px solid ${PURPLE_ALPHA_30}`,
  bgcolor: DARK_BG,
  boxShadow: CONTROL_SHADOW,
});

// Small purple caption, like a section's number
export const sectionNavLabelSx = mergeSx(coverEyebrowSx, {
  fontSize: "0.75rem",
});

// Caps the list, which then scrolls on its own: the panel is stuck to the
// viewport, so a long list on a short screen would run past its bottom edge
export const sectionNavListSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  maxHeight: "min(60vh, 28rem)",
  mt: 2,
};

// Out past the right edge (the wrapper's 16px inset included), unless shown
// or reached by the keyboard
const triggerHiddenSx = {
  transform: `translateX(calc(100% + ${GUTTER}px))`,
  opacity: 0,
  "&:focus-visible": { transform: "none", opacity: 1 },
} as const;

export const sectionNavTriggerSx = (shown: boolean): SxProps<Theme> => ({
  width: 44,
  height: 44,
  border: `1px solid ${BORDER_COLOR}`,
  bgcolor: DARK_BG,
  color: TEXT_PRIMARY,
  boxShadow: CONTROL_SHADOW,
  ...slideMotionSx(
    "opacity 0.35s ease",
    "border-color 0.2s ease",
    "color 0.2s ease"
  ),
  "&:hover": { bgcolor: DARK_BG, borderColor: BORDER_HOVER, color: PURPLE },
  ...(!shown && triggerHiddenSx),
  [WIDE]: { display: "none" },
});
