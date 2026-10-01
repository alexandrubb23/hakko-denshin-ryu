import type { SxProps, Theme } from "@mui/material";

import { PURPLE } from "@style/tokens";

/** Thin purple line glowing along the top edge of a cover */
export const topAccentSx: SxProps<Theme> = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: 2,
  background: `linear-gradient(90deg, transparent 0%, ${PURPLE} 50%, transparent 100%)`,
  zIndex: 3,
};

// Above the cover's own content, which may reach the top corner
export const langSwitcherSx: SxProps<Theme> = {
  position: "absolute",
  zIndex: 3,
  top: { xs: 20, lg: 24 },
  right: { xs: 20, lg: 32 },
};
