import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import type { SxProps, Theme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";

import {
  SUCCESS,
  SUCCESS_ALPHA_08,
  SUCCESS_ALPHA_40,
} from "@style/status.tokens";
import {
  BORDER_COLOR,
  PURPLE,
  PURPLE_ALPHA_08,
  PURPLE_ALPHA_15,
} from "@style/tokens";

export const COUNT_CHIP_SX: SxProps<Theme> = {
  backgroundColor: PURPLE_ALPHA_15,
  color: PURPLE,
  fontWeight: 700,
};

export const DIVIDER_SX: SxProps<Theme> = { borderColor: BORDER_COLOR };

export const CONTENT_SX: SxProps<Theme> = {
  p: 0,
  maxHeight: 480,
  overflowY: "auto",
};

export const CHECK_ICON_SX: SxProps<Theme> = { color: SUCCESS, fontSize: 16 };

export const UNCHECK_ICON_SX: SxProps<Theme> = {
  color: "text.disabled",
  fontSize: 16,
};

export const ToggleButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "attended",
})<{ attended: boolean }>(({ theme, attended }) => ({
  borderColor: attended ? SUCCESS_ALPHA_40 : BORDER_COLOR,
  color: attended ? SUCCESS : theme.palette.text.secondary,
  minWidth: 110,
  "&:hover": {
    borderColor: attended ? SUCCESS : PURPLE,
    backgroundColor: attended ? SUCCESS_ALPHA_08 : PURPLE_ALPHA_08,
  },
}));

export const FooterBox = styled(Box)({
  padding: "16px 24px",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 8,
});

export const SPINNER_SX: SxProps<Theme> = { color: PURPLE };

export const CLOSE_BUTTON_SX: SxProps<Theme> = { color: "text.secondary" };
