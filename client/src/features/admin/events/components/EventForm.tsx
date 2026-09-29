import {
  EventStatusValues,
  EventTypeValues,
  type CreateEventInput,
  type UpdateEventInput,
} from "@hakko/core";
import { zodResolver } from "@hookform/resolvers/zod";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Divider,
  MenuItem,
  Stack,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { z } from "zod";

import { eventsApi, type Event } from "@api/events";
import ErrorAlert from "@components/shared/ErrorAlert";
import DarkSelect from "@components/ui/DarkSelect/DarkSelect";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import ImageDropZone, {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_SIZE_BYTES,
  MAX_IMAGE_SIZE_MB,
} from "@components/ui/ImageDropZone/ImageDropZone";
import ModalDialog from "@components/ui/ModalDialog/ModalDialog";
import ModalTitle from "@components/ui/ModalTitle/ModalTitle";
import { useCreateEvent } from "@features/admin/events/hooks/useCreateEvent";
import { useUpdateEvent } from "@features/admin/events/hooks/useUpdateEvent";
import {
  EVENT_STATUS_LABEL_IDS,
  EVENT_TYPE_LABEL_IDS,
} from "@features/admin/events/utils/eventLabels";
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

/** datetime-local input produces "YYYY-MM-DDTHH:MM" — no timezone suffix */
const datetimeLocalRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
const INVALID_DATE_TIME = "Invalid date/time";
const datetimeLocalString = z
  .string()
  .regex(datetimeLocalRegex, INVALID_DATE_TIME);

/**
 * Form-level schema: validates datetime-local strings (browser format).
 * The shared @hakko/core schemas validate UTC ISO strings — those are used
 * only after conversion, on the server side.
 */
const eventFormSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    type: z.enum(EventTypeValues),
    status: z.enum(EventStatusValues),
    startDate: datetimeLocalString,
    endDate: z.union([datetimeLocalString, z.literal("")]),
    location: z
      .string()
      .trim()
      .min(2, "Location must be at least 2 characters"),
    details: z
      .string()
      .trim()
      .min(10, "Details must be at least 10 characters"),
    ticketUrl: z.string().url("Invalid ticket URL").or(z.literal("")),
  })
  .refine(
    (data) => {
      if (!data.endDate) return true;
      return new Date(data.endDate) > new Date(data.startDate);
    },
    { message: "End date must be after start date", path: ["endDate"] },
  );

type EventFormValues = z.infer<typeof eventFormSchema>;

/** Convert UTC ISO string → datetime-local input value (browser local time) */
const toDatetimeLocal = (iso: string): string => {
  const d = new Date(iso);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

/** Convert datetime-local string → UTC ISO string */
const toUtcIso = (local: string): string => new Date(local).toISOString();

export const EventFormMode = {
  create: "create",
  edit: "edit",
} as const;
export type EventFormMode = (typeof EventFormMode)[keyof typeof EventFormMode];

export type EventFormProps =
  | { mode: typeof EventFormMode.create; open: boolean; onClose: () => void }
  | {
      mode: typeof EventFormMode.edit;
      open: boolean;
      onClose: () => void;
      event: Event;
    };

const modeConfig: Record<
  EventFormMode,
  {
    title: IntlMessageID;
    Icon: typeof AddIcon;
    submitLabel: IntlMessageID;
    pendingLabel: IntlMessageID;
  }
> = {
  [EventFormMode.create]: {
    title: "admin.events.form.title.create",
    Icon: AddIcon,
    submitLabel: "admin.events.form.submit.create",
    pendingLabel: "admin.events.form.pending.create",
  },
  [EventFormMode.edit]: {
    title: "admin.events.form.title.edit",
    Icon: EditIcon,
    submitLabel: "admin.events.form.submit.edit",
    pendingLabel: "admin.events.form.pending.edit",
  },
};

const EventForm = (props: EventFormProps) => {
  const { mode, open, onClose } = props;
  const { title, Icon, submitLabel, pendingLabel } = modeConfig[mode];
  const intl = useIntl();
  const translateError = useTranslateError();

  const fieldError = (message?: string) =>
    message === INVALID_DATE_TIME
      ? intl.formatMessage({ id: "admin.events.form.error.dateTime" })
      : translateError(message);

  const event = mode === EventFormMode.edit ? props.event : null;

  const [stagedFile, setStagedFile] = useState<File | null>(null);
  const [imageValidationError, setImageValidationError] = useState<
    string | null
  >(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const createMutation = useCreateEvent();
  const updateMutation = useUpdateEvent(event?.id ?? "");
  const {
    isPending,
    isError,
    error,
    reset: resetMutation,
  } = mode === EventFormMode.create ? createMutation : updateMutation;

  const {
    register,
    handleSubmit,
    reset: resetForm,
    control,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      status: "draft",
      type: "seminar",
    },
  });

  useEffect(() => {
    if (!open) return;
    resetForm({
      name: event?.name ?? "",
      type: event?.type ?? "seminar",
      status: event?.status ?? "draft",
      startDate: event?.startDate ? toDatetimeLocal(event.startDate) : "",
      endDate: event?.endDate ? toDatetimeLocal(event.endDate) : "",
      location: event?.location ?? "",
      details: event?.details ?? "",
      ticketUrl: event?.ticketUrl ?? "",
    });
    setStagedFile(null);
    setImageValidationError(null);
    resetMutation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, event?.id]);

  const handleFileSelect = (file: File) => {
    setImageValidationError(null);
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setImageValidationError(
        intl.formatMessage({ id: "admin.events.form.image.invalidType" }),
      );
      return;
    }
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setImageValidationError(
        intl.formatMessage(
          { id: "admin.events.form.image.tooLarge" },
          { size: MAX_IMAGE_SIZE_MB },
        ),
      );
      return;
    }
    setStagedFile(file);
  };

  const uploadStagedImage = async (eventId: string) => {
    if (!stagedFile) return;
    setIsUploadingImage(true);
    try {
      await eventsApi.uploadEventImage(eventId, stagedFile);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const onSubmit = (values: EventFormValues) => {
    const payload = {
      name: values.name,
      type: values.type as CreateEventInput["type"],
      status: values.status as CreateEventInput["status"],
      startDate: toUtcIso(values.startDate),
      endDate: values.endDate ? toUtcIso(values.endDate) : undefined,
      location: values.location,
      details: values.details,
      ticketUrl: values.ticketUrl || undefined,
    };

    if (mode === EventFormMode.create) {
      createMutation.mutate(payload as CreateEventInput, {
        onSuccess: async (created) => {
          await uploadStagedImage(created.id);
          onClose();
        },
      });
    } else {
      updateMutation.mutate(payload as UpdateEventInput, {
        onSuccess: async () => {
          await uploadStagedImage(event!.id);
          onClose();
        },
      });
    }
  };

  const isBusy = isPending || isUploadingImage;

  const serverErrorMessage = (() => {
    if (!isError || !error) return null;
    if (axios.isAxiosError(error)) {
      return (
        translateError(error.response?.data?.error) ??
        intl.formatMessage({ id: "admin.events.form.error.save" })
      );
    }
    return intl.formatMessage({ id: "error.generic" });
  })();

  return (
    <ModalDialog open={open} onClose={onClose} maxWidth="sm">
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
            label={intl.formatMessage({ id: "admin.events.form.name.label" })}
            fullWidth
            autoFocus
            {...register("name")}
            error={!!errors.name}
            helperText={fieldError(errors.name?.message)}
            sx={fieldSx}
          />

          <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
            <Box flex={1}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mb: 0.5, display: "block" }}
              >
                <FormattedMessage id="common.type" />
              </Typography>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <DarkSelect
                    {...field}
                    fullWidth
                    size="small"
                    error={!!errors.type}
                  >
                    {EventTypeValues.map((t) => (
                      <MenuItem key={t} value={t}>
                        {intl.formatMessage({ id: EVENT_TYPE_LABEL_IDS[t] })}
                      </MenuItem>
                    ))}
                  </DarkSelect>
                )}
              />
            </Box>

            <Box flex={1}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mb: 0.5, display: "block" }}
              >
                <FormattedMessage id="common.status" />
              </Typography>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <DarkSelect
                    {...field}
                    fullWidth
                    size="small"
                    error={!!errors.status}
                  >
                    {EventStatusValues.map((s) => (
                      <MenuItem key={s} value={s}>
                        {intl.formatMessage({ id: EVENT_STATUS_LABEL_IDS[s] })}
                      </MenuItem>
                    ))}
                  </DarkSelect>
                )}
              />
            </Box>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
            <TextField
              label={intl.formatMessage({
                id: "admin.events.form.startDate.label",
              })}
              type="datetime-local"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              {...register("startDate")}
              error={!!errors.startDate}
              helperText={fieldError(errors.startDate?.message)}
              sx={fieldSx}
            />
            <TextField
              label={intl.formatMessage({
                id: "admin.events.form.endDate.label",
              })}
              type="datetime-local"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              {...register("endDate")}
              error={!!errors.endDate}
              helperText={fieldError(errors.endDate?.message)}
              sx={fieldSx}
            />
          </Stack>

          <TextField
            label={intl.formatMessage({ id: "common.location" })}
            fullWidth
            {...register("location")}
            error={!!errors.location}
            helperText={fieldError(errors.location?.message)}
            sx={fieldSx}
          />

          <TextField
            label={intl.formatMessage({ id: "common.details" })}
            fullWidth
            multiline
            minRows={3}
            {...register("details")}
            error={!!errors.details}
            helperText={fieldError(errors.details?.message)}
            sx={fieldSx}
          />

          <TextField
            label={intl.formatMessage({
              id: "admin.events.form.ticketUrl.label",
            })}
            type="url"
            fullWidth
            placeholder="https://..."
            {...register("ticketUrl")}
            error={!!errors.ticketUrl}
            helperText={fieldError(errors.ticketUrl?.message)}
            sx={fieldSx}
          />

          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mb: 0.5, display: "block" }}
            >
              <FormattedMessage id="admin.events.form.image.label" />
            </Typography>
            {event?.image && !stagedFile && (
              <Box
                component="img"
                src={event.image}
                alt={intl.formatMessage({ id: "admin.events.form.image.alt" })}
                sx={{
                  width: "100%",
                  height: 120,
                  objectFit: "cover",
                  borderRadius: 1,
                  mb: 1,
                  border: `1px solid ${BORDER_COLOR}`,
                }}
              />
            )}
            <ImageDropZone
              selectedFile={stagedFile}
              onFileSelect={handleFileSelect}
            />
            {imageValidationError && (
              <ErrorAlert sx={{ mt: 1 }}>{imageValidationError}</ErrorAlert>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            onClick={onClose}
            disabled={isBusy}
            sx={{ color: "text.secondary" }}
          >
            <FormattedMessage id="common.cancel" />
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isBusy}
            sx={{
              backgroundColor: PURPLE,
              color: DARK_BG,
              fontWeight: 700,
              "&:hover": { backgroundColor: PURPLE_HOVER },
            }}
          >
            <FormattedMessage
              id={
                isUploadingImage
                  ? "admin.events.form.uploading"
                  : isPending
                    ? pendingLabel
                    : submitLabel
              }
            />
          </Button>
        </DialogActions>
      </Box>
    </ModalDialog>
  );
};

export default EventForm;
