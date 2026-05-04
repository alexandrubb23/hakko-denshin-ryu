import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Divider,
  SxProps,
  Theme,
} from "@mui/material";
import type { ReactNode } from "react";

import ModalDialog from "@components/ModalDialog/ModalDialog";
import ModalTitle from "@components/ModalTitle/ModalTitle";
import { BORDER_COLOR, DARK_BG, PURPLE, PURPLE_HOVER } from "@style/tokens";

const submitButtonSx: SxProps<Theme> = {
  backgroundColor: PURPLE,
  color: DARK_BG,
  fontWeight: 700,
  "&:hover": { backgroundColor: PURPLE_HOVER },
};

interface Props {
  open: boolean;
  onClose: () => void;
  /** Icon + text rendered inside DialogTitle */
  title: ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isPending: boolean;
  submitLabel: string;
  /** Additional condition to disable the submit button beyond isPending */
  submitDisabled?: boolean;
  children: ReactNode;
}

const StudentRankDialog = ({
  open,
  onClose,
  title,
  onSubmit,
  isPending,
  submitLabel,
  submitDisabled = false,
  children,
}: Props) => (
  <ModalDialog open={open} onClose={onClose} maxWidth="xs">
    <ModalTitle>{title}</ModalTitle>

    <Divider sx={{ borderColor: BORDER_COLOR }} />

    <Box component="form" onSubmit={onSubmit} noValidate>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: 3 }}
      >
        {children}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button
          onClick={onClose}
          disabled={isPending}
          sx={{ color: "text.secondary" }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isPending || submitDisabled}
          sx={submitButtonSx}
        >
          {submitLabel}
        </Button>
      </DialogActions>
    </Box>
  </ModalDialog>
);

export default StudentRankDialog;
