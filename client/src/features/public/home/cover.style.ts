import type { SxProps, Theme } from "@mui/material";

import { coverWrapperSx } from "@style/art";
import { DARK_BG } from "@style/colorScheme";
import { mergeSx } from "@utils/sx";

// Shared by the wide and the narrow home cover

export const heroWrapperSx: SxProps<Theme> = mergeSx(coverWrapperSx, {
  backgroundColor: DARK_BG,
});
