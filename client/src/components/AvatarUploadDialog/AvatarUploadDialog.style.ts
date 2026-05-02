import { Alert, Avatar, Button } from "@mui/material";
import { styled, type SxProps, type Theme } from "@mui/material/styles";

import { ERROR_DARK_ALPHA_12, ERROR_DARK_TEXT } from "@style/status.tokens";
import {
  BACKDROP_BLUR,
  BORDER_COLOR,
  DARK_BG,
  PURPLE,
  PURPLE_ALPHA_25,
  PURPLE_ALPHA_30,
  PURPLE_HOVER,
  WHITE_ALPHA_05,
} from "@style/tokens";

export const dialogPaperSx: SxProps<Theme> = {
  backgroundColor: DARK_BG,
  backgroundImage: "none",
  border: `1px solid ${BORDER_COLOR}`,
  backdropFilter: BACKDROP_BLUR,
} as const;

export const PreviewAvatar = styled(Avatar)({
  width: 96,
  height: 96,
  fontSize: 32,
  fontWeight: 700,
  backgroundColor: PURPLE_ALPHA_25,
  color: PURPLE,
  border: `2px solid ${BORDER_COLOR}`,
});

export const ErrorAlert = styled(Alert)({
  marginTop: 16,
  backgroundColor: ERROR_DARK_ALPHA_12,
  color: ERROR_DARK_TEXT,
});

export const CancelButton = styled(Button)({
  color: "text.secondary",
  "&:hover": { backgroundColor: WHITE_ALPHA_05 },
});

export const UploadButton = styled(Button)({
  backgroundColor: PURPLE,
  color: DARK_BG,
  fontWeight: 700,
  "&:hover": { backgroundColor: PURPLE_HOVER },
  "&:disabled": { backgroundColor: PURPLE_ALPHA_30 },
});
