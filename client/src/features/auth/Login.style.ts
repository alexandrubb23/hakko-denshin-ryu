import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";
import { keyframes } from "@mui/system";

import bgImage from "@assets/images/180.webp";
import {
  ERROR_DARK_ALPHA_15,
  ERROR_DARK_TEXT_LIGHT,
} from "@style/status.tokens";
import {
  BACKDROP_BLUR,
  BORDER_COLOR,
  BORDER_HOVER,
  DARK_BG_OVERLAY,
  PURPLE,
  PURPLE_ALPHA_25,
  SURFACE_BG,
  TEXT_MUTED,
} from "@style/tokens";

export const bgZoom = keyframes`
  from { transform: scale(1); }
  to   { transform: scale(1.15); }
`;

export const BgClipBox = styled(Box)({
  position: "fixed",
  inset: 0,
  overflow: "hidden",
  zIndex: -1,
});

export const BgImageBox = styled(Box)({
  position: "absolute",
  inset: 0,
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  animation: `${bgZoom} 20s ease-out forwards`,
  willChange: "transform",
});

export const BgOverlayBox = styled(Box)({
  position: "absolute",
  inset: 0,
  backgroundColor: DARK_BG_OVERLAY,
});

export const PageBox = styled(Box)({
  minHeight: "100dvh",
  display: "flex",
  flexDirection: "column",
});

export const CenteredContainer = styled(Container)({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: 32,
  paddingBottom: 32,
});

export const LoginPaper = styled(Paper)({
  width: "100%",
  padding: 32,
  display: "flex",
  flexDirection: "column",
  gap: 24,
  backgroundColor: SURFACE_BG,
  backdropFilter: BACKDROP_BLUR,
  border: `1px solid ${BORDER_COLOR}`,
  borderRadius: 8,
});

export const AccentBar = styled(Box)({
  width: 40,
  height: 2,
  backgroundColor: PURPLE,
  borderRadius: 4,
});

export const LoginErrorAlert = styled(Alert)({
  backgroundColor: ERROR_DARK_ALPHA_15,
  color: ERROR_DARK_TEXT_LIGHT,
  border: "1px solid rgba(211,47,47,0.3)",
  "& .MuiAlert-icon": { color: ERROR_DARK_TEXT_LIGHT },
});

export const TogglePasswordButton = styled(IconButton)({
  color: TEXT_MUTED,
  "&:hover": { color: "#fff" },
});

export const SubmitButton = styled(Button)({
  marginTop: 8,
});

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

export const TITLE_SX: SxProps<Theme> = { color: "#fff", letterSpacing: 1 };

export const SPINNER_SX: SxProps<Theme> = { color: PURPLE };
