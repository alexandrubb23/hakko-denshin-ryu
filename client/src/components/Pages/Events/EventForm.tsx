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
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Select,
  Stack,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { eventsApi, type Event } from "@api/events";
import ImageDropZone, {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_SIZE_BYTES,
  MAX_IMAGE_SIZE_MB,
} from "@components/ImageDropZone/ImageDropZone";
import { useCreateEvent } from "@hooks/useCreateEvent";
import { useUpdateEvent } from "@hooks/useUpdateEvent";
import {
  BORDER_COLOR,
  BORDER_HOVER,
  DARK_BG,
  PURPLE,
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

const selectMenuProps = {
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

/** datetime-local input produces "YYYY-MM-DDTHH:MM" — no timezone suffix */
const datetimeLocalRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
const datetimeLocalString = z
  .string()
  .regex(datetimeLocalRegex, "Invalid date/time");

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
    { message: "End date must be after start date", path: ["endDate"] }
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

const modeConfig = {
  [EventFormMode.create]: {
    title: "Add Event",
    Icon: AddIcon,
    submitLabel: "Create Event",
    pendingLabel: "Creating…",
  },
  [EventFormMode.edit]: {
    title: "Edit Event",
    Icon: EditIcon,
    submitLabel: "Save Changes",
    pendingLabel: "Saving…",
  },
};

const EventForm = (props: EventFormProps) => {
  const { mode, open, onClose } = props;
  const { title, Icon, submitLabel, pendingLabel } = modeConfig[mode];

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
      setImageValidationError("Only JPEG, PNG, and WebP images are accepted.");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setImageValidationError(
        `File must be smaller than ${MAX_IMAGE_SIZE_MB} MB.`
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
      return error.response?.data?.error ?? "Failed to save event.";
    }
    return "Something went wrong. Please try again.";
  })();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            backgroundColor: DARK_BG,
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
              sx={{ backgroundColor: "rgba(211,47,47,0.12)", color: "#f48fb1" }}
            >
              {serverErrorMessage}
            </Alert>
          )}

          <TextField
            label="Event Name"
            fullWidth
            autoFocus
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={fieldSx}
          />

          <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
            <Box flex={1}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mb: 0.5, display: "block" }}
              >
                Type
              </Typography>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    fullWidth
                    size="small"
                    error={!!errors.type}
                    MenuProps={selectMenuProps}
                    sx={{
                      backgroundColor: SURFACE_BG,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: BORDER_COLOR,
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: BORDER_HOVER,
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: PURPLE,
                      },
                    }}
                  >
                    {EventTypeValues.map((t) => (
                      <MenuItem key={t} value={t}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Box>

            <Box flex={1}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mb: 0.5, display: "block" }}
              >
                Status
              </Typography>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    fullWidth
                    size="small"
                    error={!!errors.status}
                    MenuProps={selectMenuProps}
                    sx={{
                      backgroundColor: SURFACE_BG,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: BORDER_COLOR,
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: BORDER_HOVER,
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: PURPLE,
                      },
                    }}
                  >
                    {EventStatusValues.map((s) => (
                      <MenuItem key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Box>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
            <TextField
              label="Start Date & Time"
              type="datetime-local"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              {...register("startDate")}
              error={!!errors.startDate}
              helperText={errors.startDate?.message}
              sx={fieldSx}
            />
            <TextField
              label="End Date & Time (optional)"
              type="datetime-local"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              {...register("endDate")}
              error={!!errors.endDate}
              helperText={errors.endDate?.message}
              sx={fieldSx}
            />
          </Stack>

          <TextField
            label="Location"
            fullWidth
            {...register("location")}
            error={!!errors.location}
            helperText={errors.location?.message}
            sx={fieldSx}
          />

          <TextField
            label="Details"
            fullWidth
            multiline
            minRows={3}
            {...register("details")}
            error={!!errors.details}
            helperText={errors.details?.message}
            sx={fieldSx}
          />

          <TextField
            label="Ticket URL (optional)"
            type="url"
            fullWidth
            placeholder="https://..."
            {...register("ticketUrl")}
            error={!!errors.ticketUrl}
            helperText={errors.ticketUrl?.message}
            sx={fieldSx}
          />

          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mb: 0.5, display: "block" }}
            >
              Event Image (optional)
            </Typography>
            {event?.image && !stagedFile && (
              <Box
                component="img"
                src={event.image}
                alt="Current event image"
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
              <Alert
                severity="error"
                sx={{
                  mt: 1,
                  backgroundColor: "rgba(211,47,47,0.12)",
                  color: "#f48fb1",
                }}
              >
                {imageValidationError}
              </Alert>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            onClick={onClose}
            disabled={isBusy}
            sx={{ color: "text.secondary" }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isBusy}
            sx={{
              backgroundColor: PURPLE,
              color: "#0a0619",
              fontWeight: 700,
              "&:hover": { backgroundColor: "#c4b4ff" },
            }}
          >
            {isUploadingImage
              ? "Uploading image…"
              : isPending
                ? pendingLabel
                : submitLabel}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default EventForm;
