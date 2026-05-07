import { type AttendanceRecord } from "@api/attendance";
import { formatDateKey } from "@constants/trainingSchedule";
import { useUpsertAttendance } from "@features/admin/attendance/hooks/useUpsertAttendance";

interface Params {
  date: Date | null;
  studentId: string;
  year: number;
  month: number;
  records: AttendanceRecord[];
  onSuccess?: () => void;
}

const useAttendanceMark = ({
  date,
  studentId,
  year,
  month,
  records,
  onSuccess,
}: Params) => {
  const dateKey = date ? formatDateKey(date) : "";
  const record = records.find((r) => r.date.startsWith(dateKey));
  const attended = record ? record.attended : null;

  const { mutate, isPending } = useUpsertAttendance(studentId, year, month);

  const handleMark = (value: boolean) => {
    if (!date) return;
    mutate(
      { date: dateKey, attended: value },
      onSuccess ? { onSuccess } : undefined
    );
  };

  return { attended, isPending, handleMark };
};

export default useAttendanceMark;
