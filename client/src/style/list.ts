import type { SxProps, Theme } from "@mui/material";

/** A `ul` without bullets or indent, its items stacked */
export const listResetSx: SxProps<Theme> = {
  listStyle: "none",
  m: 0,
  p: 0,
  display: "flex",
  flexDirection: "column",
};
