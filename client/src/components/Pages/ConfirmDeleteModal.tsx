import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Typography,
} from "@mui/material";
import type { ReactNode } from "react";

import ModalTitle from "@components/ModalTitle/ModalTitle";
import { ERROR_DARK, ERROR_DARK_HOVER, WARNING } from "@style/status.tokens";
import {
  BACKDROP_BLUR,
  BORDER_COLOR,
  DARK_BG,
  PURPLE,
  SURFACE_BG,
} from "@style/tokens";

interface Props {
  open: boolean;
  title: string;
  message: ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  isPending: boolean;
  error?: string | null;
}

const ConfirmDeleteModal = ({
  open,
  title,
  message,
  onClose,
  onConfirm,
  isPending,
  error,
}: Props) => (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth="xs"
    fullWidth
    slotProps={{
      paper: {
        sx: {
          backgroundColor: DARK_BG,
          backgroundImage: "none",
          border: `1px solid ${BORDER_COLOR}`,
          borderRadius: 3,
          backdropFilter: BACKDROP_BLUR,
        },
      },
    }}
  >
    <ModalTitle sx={{ fontSize: "1.1rem", pb: 1 }}>
      <DeleteOutlineIcon fontSize="small" />
      {title}
    </ModalTitle>

    <Divider sx={{ borderColor: BORDER_COLOR }} />

    <DialogContent sx={{ pt: 3 }}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "flex-start",
          mb: error ? 2 : 0,
        }}
      >
        <WarningAmberIcon sx={{ color: WARNING, mt: 0.25 }} />
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      </Box>

      {error && (
        <Alert
          severity="error"
          sx={{
            backgroundColor: SURFACE_BG,
            border: `1px solid ${BORDER_COLOR}`,
          }}
        >
          {error}
        </Alert>
      )}
    </DialogContent>

    <Divider sx={{ borderColor: BORDER_COLOR }} />

    <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
      <Button
        variant="outlined"
        onClick={onClose}
        disabled={isPending}
        sx={{
          borderColor: BORDER_COLOR,
          color: "text.secondary",
          "&:hover": { borderColor: PURPLE, color: PURPLE },
        }}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        onClick={onConfirm}
        disabled={isPending}
        sx={{
          backgroundColor: ERROR_DARK,
          "&:hover": { backgroundColor: ERROR_DARK_HOVER },
          "&:disabled": { opacity: 0.5 },
        }}
      >
        {isPending ? "Deleting…" : "Delete"}
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDeleteModal;
