import { CircularProgress, Popover, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { type AttendanceRecord } from "@api/attendance";
import { MONTH_NAMES } from "@constants/dateNames";
import { formatDateKey } from "@constants/trainingSchedule";
import { useUpsertAttendance } from "@features/admin/attendance/hooks/useUpsertAttendance";
import { BACKDROP_BLUR, BORDER_COLOR, DARK_BG, PURPLE } from "@style/tokens";

import YesNoButtons from "./YesNoButtons";

interface Props {
  anchorEl: HTMLElement | null;
  date: Date | null;
  studentId: string;
  records: AttendanceRecord[];
  onClose: () => void;
}

const StyledPopover = styled(Popover)({
  "& .MuiPopover-paper": {
    backgroundColor: DARK_BG,
    backgroundImage: "none",
    border: `1px solid ${BORDER_COLOR}`,
    backdropFilter: BACKDROP_BLUR,
    padding: 16,
    minWidth: 160,
  },
});

const PopoverContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 12,
});

const DateLabel = styled(Typography)({
  color: PURPLE,
  fontWeight: 700,
});

const StatusCaption = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const PurpleSpinner = styled(CircularProgress)({ color: PURPLE });

const AttendancePopup = ({
  anchorEl,
  date,
  studentId,
  records,
  onClose,
}: Props) => {
  const open = Boolean(anchorEl) && date !== null;

  const dateKey = date ? formatDateKey(date) : "";
  const year = date?.getUTCFullYear() ?? 0;
  const month = date ? date.getUTCMonth() + 1 : 0;

  const record = records.find((r) => r.date.startsWith(dateKey));
  const attended = record ? record.attended : null;

  const { mutate, isPending } = useUpsertAttendance(studentId, year, month);

  const handleMark = (value: boolean) => {
    if (!date) return;
    mutate({ date: dateKey, attended: value }, { onSuccess: onClose });
  };

  return (
    <StyledPopover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
    >
      {date && (
        <PopoverContent>
          <DateLabel variant="body2">
            {date.getUTCDate()} {MONTH_NAMES[date.getUTCMonth()]}
          </DateLabel>
          <StatusCaption variant="caption">
            {attended === null
              ? "Mark attendance:"
              : attended
                ? "✓ Present"
                : "✗ Absent"}
          </StatusCaption>
          {isPending ? (
            <PurpleSpinner size={20} />
          ) : (
            <YesNoButtons
              attended={attended}
              onYes={() => handleMark(true)}
              onNo={() => handleMark(false)}
            />
          )}
        </PopoverContent>
      )}
    </StyledPopover>
  );
};

export default AttendancePopup;
