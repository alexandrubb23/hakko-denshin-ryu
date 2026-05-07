import { Select, type SelectProps } from "@mui/material";

import {
  BORDER_COLOR,
  BORDER_HOVER,
  DARK_BG,
  PURPLE,
  PURPLE_ALPHA_12,
  PURPLE_ALPHA_18,
  PURPLE_ALPHA_25,
  SURFACE_BG,
} from "@style/tokens";

export const darkMenuProps = {
  slotProps: {
    paper: {
      sx: {
        backgroundColor: DARK_BG,
        backgroundImage: "none",
        border: `1px solid ${BORDER_COLOR}`,
        "& .MuiMenuItem-root:hover": { backgroundColor: PURPLE_ALPHA_12 },
        "& .MuiMenuItem-root.Mui-selected": {
          backgroundColor: PURPLE_ALPHA_18,
        },
        "& .MuiMenuItem-root.Mui-selected:hover": {
          backgroundColor: PURPLE_ALPHA_25,
        },
      },
    },
  },
};

const darkSelectSx = {
  backgroundColor: SURFACE_BG,
  "& .MuiOutlinedInput-notchedOutline": { borderColor: BORDER_COLOR },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: BORDER_HOVER },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PURPLE },
  "& .MuiSelect-icon": { color: PURPLE },
};

function DarkSelect<T = unknown>({ sx, MenuProps, ...props }: SelectProps<T>) {
  return (
    <Select<T>
      MenuProps={{ ...darkMenuProps, ...MenuProps }}
      sx={[darkSelectSx, ...(Array.isArray(sx) ? sx : sx != null ? [sx] : [])]}
      {...props}
    />
  );
}

export default DarkSelect;
