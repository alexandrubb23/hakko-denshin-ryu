import {
  createStudentSchema,
  updateStudentSchema,
  type CreateStudentInput,
  type UpdateStudentInput,
} from "@hakko/core";
import { zodResolver } from "@hookform/resolvers/zod";
import EditIcon from "@mui/icons-material/Edit";
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
  SxProps,
  TextField,
  Theme,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { type Student } from "@api/students";
import { useCreateStudent } from "@hooks/useCreateStudent";
import { useUpdateStudent } from "@hooks/useUpdateStudent";
import { ERROR_DARK_ALPHA_12, ERROR_DARK_TEXT } from "@style/status.tokens";
import {
  BACKDROP_BLUR,
  BORDER_COLOR,
  BORDER_HOVER,
  DARK_BG,
  PURPLE,
  PURPLE_HOVER,
  SURFACE_BG,
} from "@style/tokens";

const fieldSx: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: SURFACE_BG,
    "& fieldset": { borderColor: BORDER_COLOR },
    "&:hover fieldset": { borderColor: BORDER_HOVER },
    "&.Mui-focused fieldset": { borderColor: PURPLE },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: PURPLE },
};

type StudentFormValues = { name: string; email: string; password: string };

export const StudentFormMode = {
  create: "create",
  edit: "edit",
} as const;

export type StudentFormMode =
  (typeof StudentFormMode)[keyof typeof StudentFormMode];

export type StudentFormProps =
  | { mode: typeof StudentFormMode.create; open: boolean; onClose: () => void }
  | {
      mode: typeof StudentFormMode.edit;
      open: boolean;
      onClose: () => void;
      student: Student;
    };

const modeConfig = {
  [StudentFormMode.create]: {
    title: "Add Student",
    Icon: PersonAddIcon,
    submitLabel: "Create Student",
    pendingLabel: "Creating…",
    passwordPlaceholder: undefined as string | undefined,
  },
  [StudentFormMode.edit]: {
    title: "Edit Student",
    Icon: EditIcon,
    submitLabel: "Save Changes",
    pendingLabel: "Saving…",
    passwordPlaceholder: "Leave blank to keep unchanged",
  },
};

const StudentForm = (props: StudentFormProps) => {
  const { mode, open, onClose } = props;
  const { title, Icon, submitLabel, pendingLabel, passwordPlaceholder } =
    modeConfig[mode];

  const student = mode === StudentFormMode.edit ? props.student : null;

  const createMutation = useCreateStudent();
  const updateMutation = useUpdateStudent();
  const {
    isPending,
    isError,
    error,
    reset: resetMutation,
  } = mode === StudentFormMode.create ? createMutation : updateMutation;

  const schema =
    mode === StudentFormMode.create ? createStudentSchema : updateStudentSchema;

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<StudentFormValues>({ resolver: zodResolver(schema as any) });

  useEffect(() => {
    if (!open) return;
    resetForm({
      name: student?.name ?? "",
      email: student?.email ?? "",
      password: "",
    });
    resetMutation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, student?.id]);

  const onSubmit = (values: StudentFormValues) => {
    if (mode === StudentFormMode.create) {
      createMutation.mutate(values as CreateStudentInput, {
        onSuccess: () => onClose(),
      });
    } else {
      updateMutation.mutate(
        {
          id: student!.id,
          name: values.name,
          email: values.email,
          password: values.password || undefined,
        } as { id: string } & UpdateStudentInput,
        { onSuccess: () => onClose() }
      );
    }
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
            backgroundColor: DARK_BG,
            backgroundImage: "none",
            border: `1px solid ${BORDER_COLOR}`,
            backdropFilter: BACKDROP_BLUR,
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
        <Icon fontSize="small" />
        {title}
      </DialogTitle>

      <Divider sx={{ borderColor: BORDER_COLOR }} />

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: 3 }}
        >
          {serverErrorMessage && (
            <Alert
              severity="error"
              sx={{
                backgroundColor: ERROR_DARK_ALPHA_12,
                color: ERROR_DARK_TEXT,
              }}
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
            placeholder={passwordPlaceholder}
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
              color: DARK_BG,
              fontWeight: 700,
              "&:hover": { backgroundColor: PURPLE_HOVER },
            }}
          >
            {isPending ? pendingLabel : submitLabel}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default StudentForm;
