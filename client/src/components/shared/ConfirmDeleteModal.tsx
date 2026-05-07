import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Typography } from "@mui/material";
import type { ReactNode } from "react";

import ModalDialog from "@components/ui/ModalDialog/ModalDialog";
import ModalTitle from "@components/ui/ModalTitle/ModalTitle";

import {
  ActionsRow,
  CancelButton,
  DeleteButton,
  ErrorAlert,
  MessageBox,
  MODAL_TITLE_SX,
  ModalDivider,
  StyledDialogContent,
  WarningIcon,
} from "./ConfirmDeleteModal.style";

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
  <ModalDialog
    open={open}
    onClose={onClose}
    maxWidth="xs"
    paperSx={{ borderRadius: 3 }}
  >
    <ModalTitle sx={MODAL_TITLE_SX}>
      <DeleteOutlineIcon fontSize="small" />
      {title}
    </ModalTitle>

    <ModalDivider />

    <StyledDialogContent>
      <MessageBox hasError={Boolean(error)}>
        <WarningIcon />
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      </MessageBox>

      {error && <ErrorAlert severity="error">{error}</ErrorAlert>}
    </StyledDialogContent>

    <ModalDivider />

    <ActionsRow>
      <CancelButton variant="outlined" onClick={onClose} disabled={isPending}>
        Cancel
      </CancelButton>
      <DeleteButton
        variant="contained"
        onClick={onConfirm}
        disabled={isPending}
      >
        {isPending ? "Deleting…" : "Delete"}
      </DeleteButton>
    </ActionsRow>
  </ModalDialog>
);

export default ConfirmDeleteModal;
