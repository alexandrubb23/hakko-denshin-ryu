import type { SxProps, Theme } from "@mui/material";

import { outlinedButtonSx } from "@components/ui/PageSections/PageSections.style";
import { PURPLE_ALPHA_50 } from "@style/colorScheme";

// The height of MUI's medium Button, i.e. the language switcher beside it
const SWITCHER_SIZE = 36.5;

// MUI's outlined look (a half-alpha border) in the scheme's purple, shared
// with the language switcher beside it
export const toggleOutlineSx = {
  ...outlinedButtonSx,
  borderColor: PURPLE_ALPHA_50,
};

// Square, and outlined like the language switcher
export const toggleSx: SxProps<Theme> = {
  border: "1px solid",
  ...toggleOutlineSx,
  width: SWITCHER_SIZE,
  height: SWITCHER_SIZE,
  borderRadius: 1,
};
