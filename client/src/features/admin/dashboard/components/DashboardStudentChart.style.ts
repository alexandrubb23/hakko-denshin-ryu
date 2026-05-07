export {
  ChartHeader,
  ChartRoot,
  ChartTitle,
  CountBadge as StudentCountBadge,
} from "./DashboardChart.shared.style";

import type { SxProps, Theme } from "@mui/material";
import { DARK_BG, PURPLE, PURPLE_HOVER } from "@style/tokens";

export const trainingDayBtnSx: SxProps<Theme> = {
  backgroundColor: PURPLE,
  color: DARK_BG,
  fontWeight: 700,
  fontSize: "0.7rem",
  py: 0.25,
  px: 1.25,
  minWidth: 0,
  animation: "trainingDaySonar 2s ease-out infinite",
  "@keyframes trainingDaySonar": {
    "0%": { boxShadow: `0 0 0 0 rgba(171, 150, 255, 0.55)` },
    "70%": { boxShadow: `0 0 0 9px rgba(171, 150, 255, 0)` },
    "100%": { boxShadow: `0 0 0 0 rgba(171, 150, 255, 0)` },
  },
  "&:hover": {
    backgroundColor: PURPLE_HOVER,
    animation: "none",
  },
};
