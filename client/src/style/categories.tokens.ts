import type { StudentCategory } from "@hakko/core";

export const CATEGORY_KID_COLOR = "#ef6c00";
export const CATEGORY_KID_BG = "rgba(239,108,0,0.1)";

export const CATEGORY_SENIOR_COLOR = "#388e3c";
export const CATEGORY_SENIOR_BG = "rgba(56,142,60,0.1)";

export const CATEGORY_COLORS: Record<
  StudentCategory,
  { color: string; bg: string }
> = {
  kid: { color: CATEGORY_KID_COLOR, bg: CATEGORY_KID_BG },
  senior: { color: CATEGORY_SENIOR_COLOR, bg: CATEGORY_SENIOR_BG },
};
