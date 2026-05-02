import { Alert, Avatar, Button } from "@mui/material";
import { styled, type SxProps, type Theme } from "@mui/material/styles";

import { BORDER_COLOR, DARK_BG, PURPLE } from "@style/tokens";

export const dialogPaperSx: SxProps<Theme> = {
  backgroundColor: DARK_BG,
  backgroundImage: "none",
  border: `1px solid ${BORDER_COLOR}`,
  backdropFilter: "blur(20px)",
} as const;

export const PreviewAvatar = styled(Avatar)({
  width: 96,
  height: 96,
  fontSize: 32,
  fontWeight: 700,
  backgroundColor: "rgba(171,150,255,0.25)",
  color: PURPLE,
  border: `2px solid ${BORDER_COLOR}`,
});

export const ErrorAlert = styled(Alert)({
  marginTop: 16,
  backgroundColor: "rgba(211,47,47,0.12)",
  color: "#f48fb1",
});

export const CancelButton = styled(Button)({
  color: "text.secondary",
  "&:hover": { backgroundColor: "rgba(255,255,255,0.05)" },
});

export const UploadButton = styled(Button)({
  backgroundColor: PURPLE,
  color: DARK_BG,
  fontWeight: 700,
  "&:hover": { backgroundColor: "#c9b8ff" },
  "&:disabled": { backgroundColor: "rgba(171,150,255,0.3)" },
});
