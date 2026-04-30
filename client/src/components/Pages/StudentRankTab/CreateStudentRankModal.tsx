import {
  createStudentRankSchema,
  type CreateStudentRankInput,
} from "@hakko/core";
import { zodResolver } from "@hookform/resolvers/zod";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { useCreateStudentRank } from "@hooks/useCreateStudentRank";
import { useRanks } from "@hooks/useRanks";
import {
  BORDER_COLOR,
  BORDER_HOVER,
  DARK_BG,
  PURPLE,
  SURFACE_BG,
} from "@style/tokens";

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: SURFACE_BG,
    "& fieldset": { borderColor: BORDER_COLOR },
    "&:hover fieldset": { borderColor: BORDER_HOVER },
    "&.Mui-focused fieldset": { borderColor: PURPLE },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: PURPLE },
};

const selectSx = {
  ...fieldSx,
  "& .MuiSelect-icon": { color: PURPLE },
};

interface Props {
  studentId: string;
  open: boolean;
  onClose: () => void;
}

const CreateStudentRankModal = ({ studentId, open, onClose }: Props) => {
  const { data: ranks = [] } = useRanks();
  const mutation = useCreateStudentRank(studentId);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateStudentRankInput>({
    resolver: zodResolver(createStudentRankSchema),
    defaultValues: { rankId: 0, awardedAt: "", notes: "" },
  });

  useEffect(() => {
    if (!open) return;
    reset({ rankId: 0, awardedAt: "", notes: "" });
    mutation.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const onSubmit = (values: CreateStudentRankInput) => {
    mutation.mutate(
      { ...values, notes: values.notes || undefined },
      { onSuccess: () => onClose() }
    );
  };

  const serverError = (() => {
    if (!mutation.isError || !mutation.error) return null;
    if (axios.isAxiosError(mutation.error)) {
      const msg = mutation.error.response?.data?.error;
      if (msg) return msg;
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
        <EmojiEventsIcon fontSize="small" />
        Assign Rank
      </DialogTitle>

      <Divider sx={{ borderColor: BORDER_COLOR }} />

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: 3 }}
        >
          {serverError && (
            <Alert
              severity="error"
              sx={{ backgroundColor: "rgba(211,47,47,0.12)", color: "#f48fb1" }}
            >
              {serverError}
            </Alert>
          )}

          <Controller
            name="rankId"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.rankId} sx={selectSx}>
                <InputLabel>Rank</InputLabel>
                <Select
                  {...field}
                  label="Rank"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  MenuProps={{
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
                  }}
                >
                  {ranks.map((r) => (
                    <MenuItem key={r.id} value={r.id}>
                      {r.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.rankId && (
                  <FormHelperText>{errors.rankId.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

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
                helperText={errors.awardedAt?.message}
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
            helperText={errors.notes?.message}
            sx={fieldSx}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            onClick={onClose}
            disabled={mutation.isPending}
            sx={{ color: "text.secondary" }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={mutation.isPending}
            sx={{
              backgroundColor: PURPLE,
              color: "#0a0619",
              fontWeight: 700,
              "&:hover": { backgroundColor: "#c4b4ff" },
            }}
          >
            {mutation.isPending ? "Saving…" : "Assign Rank"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default CreateStudentRankModal;
