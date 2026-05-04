import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  SxProps,
  Theme,
} from "@mui/material";
import type { ReactNode } from "react";

import ModalTitle from "@components/ModalTitle/ModalTitle";
import {
  BACKDROP_BLUR,
  BORDER_COLOR,
  DARK_BG,
  PURPLE,
  PURPLE_HOVER,
} from "@style/tokens";

const dialogPaperSx: SxProps<Theme> = {
  backgroundColor: DARK_BG,
  backgroundImage: "none",
  border: `1px solid ${BORDER_COLOR}`,
  backdropFilter: BACKDROP_BLUR,
};

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
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth="xs"
    fullWidth
    slotProps={{ paper: { sx: dialogPaperSx } }}
  >
    <ModalTitle>
      {title}
    </ModalTitle>

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
  </Dialog>
);

export default StudentRankDialog;
