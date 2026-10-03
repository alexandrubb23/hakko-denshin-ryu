import type { SxProps, Theme } from "@mui/material";

import { PURPLE, PURPLE_ALPHA_08, PURPLE_ALPHA_50 } from "@style/colorScheme";

// Square, and outlined like the language switcher beside it
export const toggleSx: SxProps<Theme> = {
  width: 36.5,
  height: 36.5,
  borderRadius: 1,
  color: PURPLE,
  border: `1px solid ${PURPLE_ALPHA_50}`,
  "&:hover": {
    borderColor: PURPLE,
    backgroundColor: PURPLE_ALPHA_08,
  },
};
