import type { SxProps, Theme } from "@mui/material";

import { PURPLE } from "@style/colorScheme";

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
