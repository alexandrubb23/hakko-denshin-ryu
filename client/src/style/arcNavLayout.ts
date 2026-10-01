import type { Theme } from "@mui/material";
import type { SystemStyleObject } from "@mui/system";

/*
 * Wide screens get the home hero with the moon art and the arc menu, and the
 * header hides its own nav there. Below `lg` there isn't room for the arc,
 * the moon art and the title side by side.
 *
 * Switched in CSS rather than with `useMediaQuery`, which is always `false`
 * during SSR and hydration and would flash the narrow layout first.
 */
export const ARC_NAV_ONLY_SX: SystemStyleObject<Theme> = {
  display: { xs: "none", lg: "block" },
};

export const ARC_NAV_HIDDEN_SX: SystemStyleObject<Theme> = {
  display: { lg: "none" },
};
