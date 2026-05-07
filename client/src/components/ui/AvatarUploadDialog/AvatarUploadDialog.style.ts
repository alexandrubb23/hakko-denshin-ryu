import { Avatar, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import {
  BORDER_COLOR,
  DARK_BG,
  PURPLE,
  PURPLE_ALPHA_25,
  PURPLE_ALPHA_30,
  PURPLE_HOVER,
  WHITE_ALPHA_05,
} from "@style/tokens";

export const PreviewAvatar = styled(Avatar)({
  width: 96,
  height: 96,
  fontSize: 32,
  fontWeight: 700,
  backgroundColor: PURPLE_ALPHA_25,
  color: PURPLE,
  border: `2px solid ${BORDER_COLOR}`,
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
