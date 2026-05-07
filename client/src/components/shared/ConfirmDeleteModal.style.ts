import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
  Alert,
  Box,
  Button,
  DialogActions,
  DialogContent,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { ERROR_DARK, ERROR_DARK_HOVER, WARNING } from "@style/status.tokens";
import { BORDER_COLOR, PURPLE, SURFACE_BG } from "@style/tokens";

export const MODAL_TITLE_SX = { fontSize: "1.1rem", pb: 1 } as const;

export const ModalDivider = styled(Divider)({
  borderColor: BORDER_COLOR,
});

export const StyledDialogContent = styled(DialogContent)({
  paddingTop: 24,
});

export const MessageBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "hasError",
})<{ hasError: boolean }>(({ hasError, theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  alignItems: "flex-start",
  marginBottom: hasError ? theme.spacing(2) : 0,
}));

export const WarningIcon = styled(WarningAmberIcon)({
  color: WARNING,
  marginTop: 2,
});

export const ErrorAlert = styled(Alert)({
  backgroundColor: SURFACE_BG,
  border: `1px solid ${BORDER_COLOR}`,
});

export const ActionsRow = styled(DialogActions)({
  padding: "16px 24px",
  gap: 8,
});

export const CancelButton = styled(Button)(({ theme }) => ({
  borderColor: BORDER_COLOR,
  color: theme.palette.text.secondary,
  "&:hover": { borderColor: PURPLE, color: PURPLE },
}));

export const DeleteButton = styled(Button)({
  backgroundColor: ERROR_DARK,
  "&:hover": { backgroundColor: ERROR_DARK_HOVER },
  "&:disabled": { opacity: 0.5 },
});
