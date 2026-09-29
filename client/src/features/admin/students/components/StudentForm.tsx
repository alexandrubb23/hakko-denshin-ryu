import {
  createStudentSchema,
  STUDENT_CATEGORIES,
  updateStudentSchema,
  type CreateStudentInput,
  type StudentCategory,
  type UpdateStudentInput,
} from "@hakko/core";
import { zodResolver } from "@hookform/resolvers/zod";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Box,
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
  TextField,
  Theme,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useIntl } from "react-intl";

import { type Student } from "@api/students";
import ErrorAlert from "@components/shared/ErrorAlert";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import ModalDialog from "@components/ui/ModalDialog/ModalDialog";
import ModalTitle from "@components/ui/ModalTitle/ModalTitle";
import { useCreateStudent } from "@features/admin/students/hooks/useCreateStudent";
import { useUpdateStudent } from "@features/admin/students/hooks/useUpdateStudent";
import { STUDENT_CATEGORY_LABEL_IDS } from "@features/admin/students/utils/categoryLabels";
import useTranslateError from "@hooks/useTranslateError";
import {
  BORDER_COLOR,
  BORDER_HOVER,
  DARK_BG,
  PURPLE,
  PURPLE_HOVER,
  SURFACE_BG,
} from "@style/tokens";
import type { IntlMessageID } from "i18n/messages";

const fieldSx: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: SURFACE_BG,
    "& fieldset": { borderColor: BORDER_COLOR },
    "&:hover fieldset": { borderColor: BORDER_HOVER },
    "&.Mui-focused fieldset": { borderColor: PURPLE },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: PURPLE },
};

const categoryMenuProps = {
  slotProps: {
    paper: {
      sx: {
        backgroundColor: DARK_BG,
        backgroundImage: "none",
        border: `1px solid ${BORDER_COLOR}`,
        "& .MuiMenuItem-root:hover": {
          backgroundColor: "rgba(171,150,255,0.12)",
        },
        "& .MuiMenuItem-root.Mui-selected": {
          backgroundColor: "rgba(171,150,255,0.18)",
        },
        "& .MuiMenuItem-root.Mui-selected:hover": {
          backgroundColor: "rgba(171,150,255,0.25)",
        },
      },
    },
  },
};

type StudentFormValues = {
  name: string;
  email: string;
  category: StudentCategory | "";
  password?: string;
  sendInvite?: boolean;
};

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

const modeConfig: Record<
  StudentFormMode,
  {
    title: IntlMessageID;
    Icon: typeof PersonAddIcon;
    submitLabel: IntlMessageID;
    pendingLabel: IntlMessageID;
    passwordPlaceholder?: IntlMessageID;
  }
> = {
  [StudentFormMode.create]: {
    title: "admin.students.form.title.create",
    Icon: PersonAddIcon,
    submitLabel: "admin.students.form.submit.create",
    pendingLabel: "admin.students.form.pending.create",
    passwordPlaceholder: undefined,
  },
  [StudentFormMode.edit]: {
    title: "admin.students.form.title.edit",
    Icon: EditIcon,
    submitLabel: "admin.students.form.submit.edit",
    pendingLabel: "admin.students.form.pending.edit",
    passwordPlaceholder: "admin.students.form.password.placeholder",
  },
};

const StudentForm = (props: StudentFormProps) => {
  const { mode, open, onClose } = props;
  const { title, Icon, submitLabel, pendingLabel, passwordPlaceholder } =
    modeConfig[mode];
  const intl = useIntl();
  const translateError = useTranslateError();

  const student = mode === StudentFormMode.edit ? props.student : null;

  const defaultSendInvite = mode === StudentFormMode.create;
  const [sendInvite, setSendInvite] = useState(defaultSendInvite);

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
    setValue,
    control,
    formState: { errors },
  } = useForm<StudentFormValues>({ resolver: zodResolver(schema as any) });

  useEffect(() => {
    if (!open) return;
    resetForm({
      name: student?.name ?? "",
      email: student?.email ?? "",
      category: student?.category ?? "",
      password: "",
      sendInvite: defaultSendInvite,
    });
    resetMutation();
    setSendInvite(defaultSendInvite);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, student?.id]);

  const handleSendInviteChange = (checked: boolean) => {
    setSendInvite(checked);
    setValue("sendInvite", checked);
  };

  const onSubmit = (values: StudentFormValues) => {
    const { category } = values;
    if (!category) return;

    if (mode === StudentFormMode.create) {
      createMutation.mutate(
        {
          name: values.name,
          email: values.email,
          category,
          sendInvite: values.sendInvite ?? true,
          password: values.password,
        } as CreateStudentInput,
        { onSuccess: () => onClose() },
      );
    } else {
      updateMutation.mutate(
        {
          id: student!.id,
          name: values.name,
          email: values.email,
          category,
          sendInvite: values.sendInvite,
          password: values.password || undefined,
        } as { id: string } & UpdateStudentInput,
        { onSuccess: () => onClose() },
      );
    }
  };

  const serverErrorMessage = (() => {
    if (!isError || !error) return null;
    if (axios.isAxiosError(error) && error.response?.status === 409) {
      return intl.formatMessage({ id: "admin.students.form.error.emailInUse" });
    }
    return intl.formatMessage({ id: "error.generic" });
  })();

  return (
    <ModalDialog open={open} onClose={onClose} maxWidth="xs">
      <ModalTitle>
        <Icon fontSize="small" />
        <FormattedMessage id={title} />
      </ModalTitle>

      <Divider sx={{ borderColor: BORDER_COLOR }} />

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: 3 }}
        >
          {serverErrorMessage && <ErrorAlert>{serverErrorMessage}</ErrorAlert>}

          <TextField
            label={intl.formatMessage({ id: "common.name" })}
            fullWidth
            autoFocus
            {...register("name")}
            error={!!errors.name}
            helperText={translateError(errors.name?.message)}
            sx={fieldSx}
          />

          <TextField
            label={intl.formatMessage({ id: "common.email" })}
            type="email"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={translateError(errors.email?.message)}
            sx={fieldSx}
          />

          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.category} sx={fieldSx}>
                <InputLabel>
                  <FormattedMessage id="admin.students.category" />
                </InputLabel>
                <Select
                  {...field}
                  label={intl.formatMessage({ id: "admin.students.category" })}
                  MenuProps={categoryMenuProps}
                >
                  {STUDENT_CATEGORIES.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {intl.formatMessage({
                        id: STUDENT_CATEGORY_LABEL_IDS[cat],
                      })}
                    </MenuItem>
                  ))}
                </Select>
                {errors.category && (
                  <FormHelperText>
                    {translateError(errors.category.message)}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={sendInvite}
                onChange={(e) => handleSendInviteChange(e.target.checked)}
                sx={{
                  color: BORDER_COLOR,
                  "&.Mui-checked": { color: PURPLE },
                }}
              />
            }
            label={intl.formatMessage({
              id: "admin.students.form.sendInvite",
            })}
            sx={{ color: "text.secondary", ml: 0 }}
          />

          {!sendInvite && (
            <TextField
              label={intl.formatMessage({ id: "common.password" })}
              type="password"
              fullWidth
              placeholder={
                passwordPlaceholder &&
                intl.formatMessage({ id: passwordPlaceholder })
              }
              {...register("password")}
              error={!!errors.password}
              helperText={translateError(errors.password?.message)}
              sx={fieldSx}
            />
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            onClick={onClose}
            disabled={isPending}
            sx={{ color: "text.secondary" }}
          >
            <FormattedMessage id="common.cancel" />
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
            <FormattedMessage id={isPending ? pendingLabel : submitLabel} />
          </Button>
        </DialogActions>
      </Box>
    </ModalDialog>
  );
};

export default StudentForm;
