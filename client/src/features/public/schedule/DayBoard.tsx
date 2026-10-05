import type { ReactNode } from "react";

import { Box, SxProps, Theme } from "@mui/material";

import useToday from "@hooks/useToday";
import { mergeSx } from "@utils/sx";

import { boardLightSx } from "./lanternLight";
import TrainingLantern from "./TrainingLantern";

interface Props {
  /** JS getDay() weekday the board is written for */
  day: number;
  sx: SxProps<Theme>;
  /** The lantern's height, cord included */
  lanternHeight: string;
  /** Where the lantern hangs (left is its centre) */
  lanternSx: SxProps<Theme>;
  children: ReactNode;
}

/** A training day's board, under a lantern that lights it on the day itself */
const DayBoard = ({ day, sx, lanternHeight, lanternSx, children }: Props) => {
  const isToday = useToday() === day;

  return (
    <Box
      component="article"
      sx={mergeSx(sx, boardLightSx(isToday))}
      aria-current={isToday ? "date" : undefined}
    >
      <TrainingLantern height={lanternHeight} lit={isToday} sx={lanternSx} />
      {children}
    </Box>
  );
};

export default DayBoard;
