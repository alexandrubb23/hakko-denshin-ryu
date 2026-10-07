import type { SxProps, Theme } from "@mui/material";

import { CONTROL_SIZE } from "@components/ui/PageSections/PageSections.style";
import { CONTROL_SHADOW, slideMotionSx } from "@style/art";
import { DARK_BG, PURPLE, PURPLE_ALPHA_30 } from "@style/colorScheme";

// Solid night (both uses are marked night): art and text behind would show
// through any see-through glass. The shadow lifts it off a light page.
const panelSx = {
  bgcolor: DARK_BG,
  boxShadow: CONTROL_SHADOW,
} as const;

// Stays in the corner while scrolling, above the page but below the loader
// and dialogs; the night panel keeps it legible over the paper below a cover
export const pinnedSx: SxProps<Theme> = {
  position: "fixed",
  zIndex: (theme) => theme.zIndex.appBar,
  top: { xs: 20, lg: 24 },
  right: { xs: 20, lg: 32 },
  display: "flex",
  gap: 1,
  p: 0.5,
  borderRadius: 1.5,
  ...panelSx,
};

// The handle that peeks out of the right edge on phones
const HANDLE_WIDTH = 32;
const CONTROLS_PY = 8;
// The tray's lift off the bottom edge, clear of the home indicator
const TRAY_BOTTOM = 24;

/** Room the page keeps at its foot, so the open tray covers nothing there */
export const TRAY_CLEARANCE = `calc(${TRAY_BOTTOM + CONTROL_SIZE + 2 * CONTROLS_PY + 16}px + env(safe-area-inset-bottom))`;

const trayMotionSx = slideMotionSx();

/** Hidden: fully past the edge; peeking: only the handle; open: all of it */
export type TrayState = "hidden" | "peeking" | "open";

const TRAY_OFFSET: Record<TrayState, string> = {
  hidden: "100%",
  peeking: `calc(100% - ${HANDLE_WIDTH}px)`,
  open: "0px",
};

/**
 * The phone tray, low on the right edge within the thumb's reach: one night
 * sheet sliding out of the edge, in either scheme. It hides until
 * the page scrolls; a keyboard focus brings its handle out too (not a tap's,
 * which would keep it out after the tray closes).
 */
export const traySx = (state: TrayState): SxProps<Theme> => ({
  position: "fixed",
  zIndex: (theme) => theme.zIndex.appBar,
  right: 0,
  bottom: `calc(${TRAY_BOTTOM}px + env(safe-area-inset-bottom))`,
  display: "flex",
  alignItems: "stretch",
  ...panelSx,
  border: `1px solid ${PURPLE_ALPHA_30}`,
  borderRight: "none",
  borderRadius: "14px 0 0 14px",
  transform: `translateX(${TRAY_OFFSET[state]})`,
  // Its shadow would otherwise reach past the edge while hidden
  ...(state === "hidden" && { boxShadow: "none" }),
  ...(state !== "open" && {
    "&:has(:focus-visible)": {
      transform: `translateX(${TRAY_OFFSET.peeking})`,
    },
  }),
  ...trayMotionSx,
});

export const trayHandleSx: SxProps<Theme> = {
  width: HANDLE_WIDTH,
  flexShrink: 0,
  color: PURPLE,
  borderRadius: "14px 0 0 14px",
  // A comfortable touch target around the slim handle
  "&::before": {
    content: '""',
    position: "absolute",
    inset: "-8px 0 -8px -12px",
  },
};

export const trayChevronSx = (open: boolean): SxProps<Theme> => ({
  transform: open ? "rotate(180deg)" : "none",
  ...trayMotionSx,
});

export const trayControlsSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  py: `${CONTROLS_PY}px`,
  pl: 0.5,
  pr: "calc(12px + env(safe-area-inset-right))",
};
