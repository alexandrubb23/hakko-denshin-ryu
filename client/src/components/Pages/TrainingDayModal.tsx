import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  DialogContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import ModalDialog from "@components/ModalDialog/ModalDialog";
import ModalTitle from "@components/ModalTitle/ModalTitle";
import ParticipantsList from "@components/Pages/shared/ParticipantsList";
import { useStudents } from "@hooks/useStudents";
import { useTrainingDayAttendance } from "@hooks/useTrainingDayAttendance";
import { useUpsertTrainingDayAttendance } from "@hooks/useUpsertTrainingDayAttendance";
import {
  ERROR,
  ERROR_ALPHA_08,
  ERROR_ALPHA_30,
  SUCCESS,
  SUCCESS_ALPHA_08,
  SUCCESS_ALPHA_30,
} from "@style/status.tokens";
import { BORDER_COLOR, PURPLE, PURPLE_ALPHA_15 } from "@style/tokens";

interface Props {
  open: boolean;
  date: string; // "YYYY-MM-DD"
  onClose: () => void;
}

const TrainingDayModal = ({ open, date, onClose }: Props) => {
  const { data: students, isLoading: loadingStudents } = useStudents();
  const { data: attendanceData, isLoading: loadingAttendance } =
    useTrainingDayAttendance(date);
  const { mutate: upsert, isPending } = useUpsertTrainingDayAttendance(date);

  const recordMap = new Map(
    attendanceData?.records.map((r) => [r.userId, r.attended]) ?? []
  );

  const isLoading = loadingStudents || loadingAttendance;

  const attendedCount =
    attendanceData?.records.filter((r) => r.attended).length ?? 0;

  const mark = (studentId: string, attended: boolean) => {
    upsert({ studentId, attended });
  };

  const displayDate = new Date(date + "T00:00:00").toLocaleDateString("ro-RO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <ModalDialog open={open} onClose={onClose} maxWidth="sm">
      <ModalTitle>
        <FitnessCenterIcon fontSize="small" />
        <Stack flex={1}>
          <Typography fontWeight={700} component="span">
            Training Attendance
          </Typography>
          <Typography variant="caption" color="text.secondary" component="span">
            {displayDate}
          </Typography>
        </Stack>
        <Chip
          label={attendedCount}
          size="small"
          sx={{
            backgroundColor: PURPLE_ALPHA_15,
            color: PURPLE,
            fontWeight: 700,
          }}
        />
      </ModalTitle>

      <Divider sx={{ borderColor: BORDER_COLOR }} />

      <DialogContent sx={{ p: 0, maxHeight: 480, overflowY: "auto" }}>
        <ParticipantsList
          students={students}
          isLoading={isLoading}
          renderAction={(student) => {
            const hasRecord = recordMap.has(student.id);
            const attended = recordMap.get(student.id) ?? false;
            return (
              <Stack direction="row" gap={1}>
                <Button
                  size="small"
                  variant={attended ? "contained" : "outlined"}
                  disabled={isPending}
                  onClick={() => mark(student.id, true)}
                  sx={{
                    minWidth: 52,
                    ...(attended
                      ? {
                          backgroundColor: SUCCESS,
                          color: "#fff",
                          "&:hover": { backgroundColor: SUCCESS_ALPHA_30 },
                        }
                      : {
                          borderColor: SUCCESS_ALPHA_30,
                          color: SUCCESS,
                          "&:hover": {
                            borderColor: SUCCESS,
                            backgroundColor: SUCCESS_ALPHA_08,
                          },
                        }),
                  }}
                >
                  Yes
                </Button>
                <Button
                  size="small"
                  variant={hasRecord && !attended ? "contained" : "outlined"}
                  disabled={isPending}
                  onClick={() => mark(student.id, false)}
                  sx={{
                    minWidth: 52,
                    ...(hasRecord && !attended
                      ? {
                          backgroundColor: ERROR,
                          color: "#fff",
                          "&:hover": { backgroundColor: ERROR_ALPHA_30 },
                        }
                      : {
                          borderColor: ERROR_ALPHA_30,
                          color: ERROR,
                          "&:hover": {
                            borderColor: ERROR,
                            backgroundColor: ERROR_ALPHA_08,
                          },
                        }),
                  }}
                >
                  No
                </Button>
              </Stack>
            );
          }}
        />
      </DialogContent>

      <Divider sx={{ borderColor: BORDER_COLOR }} />

      <Box
        sx={{
          px: 3,
          py: 2,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 1,
        }}
      >
        {isPending && <CircularProgress size={16} sx={{ color: PURPLE }} />}
        <Button onClick={onClose} sx={{ color: "text.secondary" }}>
          Close
        </Button>
      </Box>
    </ModalDialog>
  );
};

export default TrainingDayModal;
