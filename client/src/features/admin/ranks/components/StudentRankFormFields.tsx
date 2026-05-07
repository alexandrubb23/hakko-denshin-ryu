import {
  Alert,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  SxProps,
  TextField,
  Theme,
} from "@mui/material";
import type {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { Controller } from "react-hook-form";

import DarkSelect from "@components/ui/DarkSelect/DarkSelect";
import { ERROR_DARK_ALPHA_12, ERROR_DARK_TEXT } from "@style/status.tokens";
import { BORDER_COLOR, BORDER_HOVER, PURPLE, SURFACE_BG } from "@style/tokens";

const fieldSx: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: SURFACE_BG,
    "& fieldset": { borderColor: BORDER_COLOR },
    "&:hover fieldset": { borderColor: BORDER_HOVER },
    "&.Mui-focused fieldset": { borderColor: PURPLE },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: PURPLE },
};

const labelFocusSx: SxProps<Theme> = {
  "& .MuiInputLabel-root.Mui-focused": { color: PURPLE },
};

export interface RankOption {
  id: number;
  name: string;
}

interface Props {
  control: Control<FieldValues>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  ranks: RankOption[];
  serverError?: string | null;
  /** When false, the Rank field is shown as a read-only display (not registered in form). */
  rankEditable?: boolean;
  /** Required when rankEditable=false — the rank ID to display. */
  displayRankId?: number;
}

const StudentRankFormFields = ({
  control,
  register,
  errors,
  ranks,
  serverError,
  rankEditable = true,
  displayRankId,
}: Props) => (
  <>
    {serverError && (
      <Alert
        severity="error"
        sx={{ backgroundColor: ERROR_DARK_ALPHA_12, color: ERROR_DARK_TEXT }}
      >
        {serverError}
      </Alert>
    )}

    {rankEditable ? (
      <Controller
        name="rankId"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.rankId} sx={labelFocusSx}>
            <InputLabel>Rank</InputLabel>
            <DarkSelect
              {...field}
              label="Rank"
              value={field.value || ""}
              onChange={(e) => field.onChange(Number(e.target.value))}
            >
              {ranks.map((r) => (
                <MenuItem key={r.id} value={r.id}>
                  {r.name}
                </MenuItem>
              ))}
            </DarkSelect>
            {errors.rankId && (
              <FormHelperText>{errors.rankId.message as string}</FormHelperText>
            )}
          </FormControl>
        )}
      />
    ) : (
      <FormControl fullWidth disabled sx={labelFocusSx}>
        <InputLabel shrink>Rank</InputLabel>
        <DarkSelect value={displayRankId ?? ""} label="Rank" notched>
          {ranks.map((r) => (
            <MenuItem key={r.id} value={r.id}>
              {r.name}
            </MenuItem>
          ))}
        </DarkSelect>
      </FormControl>
    )}

    <Controller
      name="awardedAt"
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label="Awarded on"
          type="date"
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          error={!!errors.awardedAt}
          helperText={errors.awardedAt?.message as string | undefined}
          sx={fieldSx}
        />
      )}
    />

    <TextField
      label="Notes"
      fullWidth
      multiline
      rows={3}
      {...register("notes")}
      error={!!errors.notes}
      helperText={errors.notes?.message as string | undefined}
      sx={fieldSx}
    />
  </>
);

export default StudentRankFormFields;
