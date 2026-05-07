import type { ReactNode } from "react";

import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";
import {
  BORDER_COLOR,
  PURPLE,
  PURPLE_ALPHA_12,
  WHITE_ALPHA_60,
} from "@style/tokens";

const FilterRow = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  marginBottom: 20,
  [theme.breakpoints.down("sm")]: {
    gap: 6,
  },
}));

export const defaultChipSx = (active: boolean): SxProps<Theme> => ({
  borderColor: active ? PURPLE : BORDER_COLOR,
  color: active ? PURPLE : WHITE_ALPHA_60,
  backgroundColor: active ? PURPLE_ALPHA_12 : "transparent",
  "&:hover": { borderColor: PURPLE },
});

type Option<T> = {
  value: T;
  label: ReactNode;
};

type ChipFilterRowProps<T> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  getChipSx?: (value: T, active: boolean) => SxProps<Theme>;
};

const ChipFilterRow = <T,>({
  options,
  value,
  onChange,
  getChipSx = (_v, active) => defaultChipSx(active),
}: ChipFilterRowProps<T>) => (
  <FilterRow>
    {options.map((option) => {
      const active = option.value === value;
      return (
        <Chip
          key={String(option.value)}
          label={option.label}
          size="small"
          onClick={() => onChange(option.value)}
          sx={getChipSx(option.value, active)}
          variant="outlined"
        />
      );
    })}
  </FilterRow>
);

export default ChipFilterRow;
