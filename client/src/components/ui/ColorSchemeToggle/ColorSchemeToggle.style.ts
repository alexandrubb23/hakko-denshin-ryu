import type { SxProps, Theme } from "@mui/material";

import { outlinedButtonSx } from "@components/ui/PageSections/PageSections.style";
import { PURPLE_ALPHA_50 } from "@style/colorScheme";

// The height of MUI's medium Button, i.e. the language switcher beside it
const SWITCHER_SIZE = 36.5;

// Square, and outlined like the language switcher (MUI's half-alpha border)
export const toggleSx: SxProps<Theme> = {
  border: "1px solid",
  ...outlinedButtonSx,
  borderColor: PURPLE_ALPHA_50,
  width: SWITCHER_SIZE,
  height: SWITCHER_SIZE,
  borderRadius: 1,
};
