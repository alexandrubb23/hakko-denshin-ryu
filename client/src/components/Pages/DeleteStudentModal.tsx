import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

import { type Student } from "@api/students";
import { useDeleteStudent } from "@hooks/useDeleteStudent";

const PURPLE = "#AB96FF";
const SURFACE_BG = "rgba(255,255,255,0.04)";
const BORDER_COLOR = "rgba(171,150,255,0.2)";

interface Props {
  open: boolean;
  student: Student;
  onClose: () => void;
}

const DeleteStudentModal = ({ open, student, onClose }: Props) => {
  const { mutate, isPending } = useDeleteStudent();
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = () => {
    setError(null);
    mutate(student.id, {
      onSuccess: onClose,
      onError: (err) => {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.error ?? "Failed to delete student.");
        } else {
          setError("An unexpected error occurred.");
        }
      },
    });
  };

  const handleClose = () => {
    if (isPending) return;
    setError(null);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "#0a0619",
          backgroundImage: "none",
          border: `1px solid ${BORDER_COLOR}`,
          borderRadius: 3,
          backdropFilter: "blur(20px)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: PURPLE,
          fontWeight: 700,
          fontSize: "1.1rem",
          pb: 1,
        }}
      >
        <DeleteOutlineIcon fontSize="small" />
        Delete Student
      </DialogTitle>

      <Divider sx={{ borderColor: BORDER_COLOR }} />

      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start", mb: 2 }}>
          <WarningAmberIcon sx={{ color: "#ff9800", mt: 0.25 }} />
          <Typography variant="body2" color="text.secondary">
            Are you sure you want to delete{" "}
            <Typography
              component="span"
              variant="body2"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              {student.name}
            </Typography>
            ? This action cannot be undone.
          </Typography>
        </Box>

        {error && (
          <Alert
            severity="error"
            sx={{ backgroundColor: SURFACE_BG, border: `1px solid ${BORDER_COLOR}` }}
          >
            {error}
          </Alert>
        )}
      </DialogContent>

      <Divider sx={{ borderColor: BORDER_COLOR }} />

      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button
          variant="outlined"
          onClick={handleClose}
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
          onClick={handleConfirm}
          disabled={isPending}
          sx={{
            backgroundColor: "#d32f2f",
            "&:hover": { backgroundColor: "#b71c1c" },
            "&:disabled": { opacity: 0.5 },
          }}
        >
          {isPending ? "Deleting…" : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteStudentModal;
