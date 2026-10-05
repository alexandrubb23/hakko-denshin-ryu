import type { SxProps, Theme } from "@mui/material";

import {
  CONTROL_SIZE,
  controlOutlineSx,
} from "@components/ui/PageSections/PageSections.style";

// Square, and outlined like the language switcher beside it
export const toggleSx: SxProps<Theme> = {
  border: "1px solid",
  ...controlOutlineSx,
  width: CONTROL_SIZE,
  height: CONTROL_SIZE,
  borderRadius: 1,
};
