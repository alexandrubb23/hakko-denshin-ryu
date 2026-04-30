import { zodResolver } from "@hookform/resolvers/zod";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useCreateStudent } from "@hooks/useCreateStudent";

const createStudentSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormValues = z.infer<typeof createStudentSchema>;

const PURPLE = "#AB96FF";
const SURFACE_BG = "rgba(255,255,255,0.04)";
const BORDER_COLOR = "rgba(171,150,255,0.2)";
const BORDER_HOVER = "rgba(171,150,255,0.55)";


interface Props {
  open: boolean;
  onClose: () => void;
}

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: SURFACE_BG,
    "& fieldset": { borderColor: BORDER_COLOR },
    "&:hover fieldset": { borderColor: BORDER_HOVER },
    "&.Mui-focused fieldset": { borderColor: PURPLE },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: PURPLE },
};

const CreateStudentModal = ({ open, onClose }: Props) => {
  const {
    mutate,
    isPending,
    isError,
    error,
    reset: resetMutation,
  } = useCreateStudent();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(createStudentSchema) });

  useEffect(() => {
    if (!open) {
      resetForm();
      resetMutation();
    }
  }, [open, resetForm, resetMutation]);

  const onSubmit = (values: FormValues) => {
    mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const serverErrorMessage = (() => {
    if (!isError || !error) return null;
    if (axios.isAxiosError(error) && error.response?.status === 409) {
      return "Email already in use.";
    }
    return "Something went wrong. Please try again.";
  })();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            backgroundColor: "#0f0b1e",
            backgroundImage: "none",
            border: `1px solid ${BORDER_COLOR}`,
            backdropFilter: "blur(20px)",
          },
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
        }}
      >
        <PersonAddIcon fontSize="small" />
        Add Student
      </DialogTitle>

      <Divider sx={{ borderColor: BORDER_COLOR }} />

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: 3 }}
        >
          {serverErrorMessage && (
            <Alert
              severity="error"
              sx={{ backgroundColor: "rgba(211,47,47,0.12)", color: "#f48fb1" }}
            >
              {serverErrorMessage}
            </Alert>
          )}

          <TextField
            label="Name"
            fullWidth
            autoFocus
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={fieldSx}
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={fieldSx}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={fieldSx}
          />
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
            disabled={isPending}
            sx={{
              backgroundColor: PURPLE,
              color: "#0a0619",
              fontWeight: 700,
              "&:hover": { backgroundColor: "#c4b4ff" },
            }}
          >
            {isPending ? "Creating…" : "Create Student"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default CreateStudentModal;
