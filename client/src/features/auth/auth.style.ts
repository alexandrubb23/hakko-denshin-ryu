import IconButton from "@mui/material/IconButton";
import type { SxProps, Theme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";

import {
  BORDER_HOVER,
  PURPLE,
  PURPLE_ALPHA_25,
  SURFACE_BG,
  TEXT_MUTED,
} from "@style/tokens";

// Shared by the sign-in and set-password forms

export const darkFieldSx: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    backgroundColor: SURFACE_BG,
    "& fieldset": { borderColor: PURPLE_ALPHA_25 },
    "&:hover fieldset": { borderColor: BORDER_HOVER },
    "&.Mui-focused fieldset": { borderColor: PURPLE },
  },
  "& .MuiInputLabel-root": { color: TEXT_MUTED },
  "& .MuiInputLabel-root.Mui-focused": { color: PURPLE },
  "& .MuiSvgIcon-root": { color: TEXT_MUTED },
};

export const TogglePasswordButton = styled(IconButton)({
  color: TEXT_MUTED,
  "&:hover": { color: "#fff" },
});
