import type { SxProps, Theme } from "@mui/material";

import {
  BORDER_COLOR,
  BORDER_HOVER,
  DARK_BG_ALPHA_55,
  PURPLE,
  PURPLE_ALPHA_08,
} from "@style/colorScheme";
import { BACKDROP_BLUR } from "@style/tokens";

// Floats in the bottom-right corner, over whatever is scrolled beneath it
export const toggleSx: SxProps<Theme> = {
  position: "fixed",
  zIndex: 1200,
  right: { xs: 16, md: 24 },
  bottom: { xs: 16, md: 24 },
  width: 48,
  height: 48,
  color: PURPLE,
  border: `1px solid ${BORDER_COLOR}`,
  backgroundColor: DARK_BG_ALPHA_55,
  backdropFilter: BACKDROP_BLUR,
  transition: "border-color 0.3s ease, background-color 0.3s ease",
  "&:hover": {
    borderColor: BORDER_HOVER,
    backgroundColor: PURPLE_ALPHA_08,
  },
};
