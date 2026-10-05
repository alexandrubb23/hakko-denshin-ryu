import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  Stack,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import {
  useFieldArray,
  type Control,
  type FieldErrors,
  type UseFormGetValues,
  type UseFormRegister,
} from "react-hook-form";
import { useIntl } from "react-intl";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import {
  nextSession,
  type EventFormValues,
} from "@features/admin/events/utils/eventFormSchema";
import { PURPLE } from "@style/tokens";

type EventSessionsFieldProps = {
  control: Control<EventFormValues>;
  register: UseFormRegister<EventFormValues>;
  getValues: UseFormGetValues<EventFormValues>;
  errors: FieldErrors<EventFormValues>;
  fieldSx: SxProps<Theme>;
  fieldError: (message?: string) => string | null;
};

/** Editable list of an event's days, each with a start and end time */
const EventSessionsField = ({
  control,
  register,
  getValues,
  errors,
  fieldSx,
  fieldError,
}: EventSessionsFieldProps) => {
  const intl = useIntl();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sessions",
  });

  const timeField = (flex: number) => [fieldSx, { flex }] as SxProps<Theme>;

  return (
    <Box>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mb: 1, display: "block" }}
      >
        <FormattedMessage id="admin.events.form.sessions.label" />
      </Typography>

      <Stack gap={2}>
        {fields.map((field, index) => {
          const rowError = errors.sessions?.[index];
          return (
            <Stack
              key={field.id}
              direction={{ xs: "column", sm: "row" }}
              gap={1.5}
              alignItems={{ sm: "flex-start" }}
              data-testid="event-session"
            >
              <TextField
                label={intl.formatMessage({
                  id: "admin.events.form.session.date.label",
                })}
                type="date"
                slotProps={{ inputLabel: { shrink: true } }}
                {...register(`sessions.${index}.date`)}
                error={!!rowError?.date}
                helperText={fieldError(rowError?.date?.message)}
                sx={timeField(1.4)}
              />
              <TextField
                label={intl.formatMessage({
                  id: "admin.events.form.session.start.label",
                })}
                type="time"
                slotProps={{ inputLabel: { shrink: true } }}
                {...register(`sessions.${index}.startTime`)}
                error={!!rowError?.startTime}
                helperText={fieldError(rowError?.startTime?.message)}
                sx={timeField(1)}
              />
              <TextField
                label={intl.formatMessage({
                  id: "admin.events.form.session.end.label",
                })}
                type="time"
                slotProps={{ inputLabel: { shrink: true } }}
                {...register(`sessions.${index}.endTime`)}
                error={!!rowError?.endTime}
                helperText={fieldError(rowError?.endTime?.message)}
                sx={timeField(1)}
              />
              <IconButton
                aria-label={intl.formatMessage(
                  { id: "admin.events.form.session.remove" },
                  { number: index + 1 }
                )}
                onClick={() => remove(index)}
                disabled={fields.length === 1}
                sx={{ alignSelf: { xs: "flex-end", sm: "center" } }}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Stack>
          );
        })}
      </Stack>

      {errors.sessions?.root?.message && (
        <FormHelperText error>
          {fieldError(errors.sessions.root.message)}
        </FormHelperText>
      )}

      <Button
        size="small"
        startIcon={<AddIcon />}
        onClick={() => append(nextSession(getValues("sessions").at(-1)))}
        sx={{ mt: 1.5, color: PURPLE }}
      >
        <FormattedMessage id="admin.events.form.session.add" />
      </Button>
    </Box>
  );
};

export default EventSessionsField;
