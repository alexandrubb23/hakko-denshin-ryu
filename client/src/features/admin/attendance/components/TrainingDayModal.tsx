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
import { useIntl } from "react-intl";

import ParticipantsList from "@components/shared/ParticipantsList";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import ModalDialog from "@components/ui/ModalDialog/ModalDialog";
import ModalTitle from "@components/ui/ModalTitle/ModalTitle";
import { useTrainingDayAttendance } from "@features/admin/attendance/hooks/useTrainingDayAttendance";
import { useUpsertTrainingDayAttendance } from "@features/admin/attendance/hooks/useUpsertTrainingDayAttendance";
import { useStudents } from "@features/admin/students/hooks/useStudents";
import { BORDER_COLOR, PURPLE, PURPLE_ALPHA_15 } from "@style/tokens";
import { stripDiacritics } from "@utils/string";

import { NoButton, YesButton } from "./AttendanceButton.style";

interface Props {
  open: boolean;
  date: string; // "YYYY-MM-DD"
  onClose: () => void;
}

const TrainingDayModal = ({ open, date, onClose }: Props) => {
  const intl = useIntl();
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

  // Rendered in Jarene (caption), which has no diacritic glyphs
  const displayDate = stripDiacritics(
    new Date(date + "T00:00:00").toLocaleDateString(intl.locale, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  return (
    <ModalDialog open={open} onClose={onClose} maxWidth="sm">
      <ModalTitle>
        <FitnessCenterIcon fontSize="small" />
        <Stack flex={1}>
          <Typography fontWeight={700} component="span">
            <FormattedMessage id="admin.attendance.trainingDay.title" />
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
                <YesButton
                  size="small"
                  variant={attended ? "contained" : "outlined"}
                  active={attended}
                  disabled={isPending}
                  onClick={() => mark(student.id, true)}
                >
                  <FormattedMessage id="common.yes" />
                </YesButton>
                <NoButton
                  size="small"
                  variant={hasRecord && !attended ? "contained" : "outlined"}
                  active={hasRecord && !attended}
                  disabled={isPending}
                  onClick={() => mark(student.id, false)}
                >
                  <FormattedMessage id="common.no" />
                </NoButton>
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
          <FormattedMessage id="common.close" />
        </Button>
      </Box>
    </ModalDialog>
  );
};

export default TrainingDayModal;
