import type { SxProps, Theme } from "@mui/material";

import { DARK_BG } from "@style/tokens";

// Shared by the wide and the narrow home cover

// Each layout adds its own height and layout on top
export const heroWrapperSx: SxProps<Theme> = {
  position: "relative",
  overflow: "hidden",
  backgroundColor: DARK_BG,
};
