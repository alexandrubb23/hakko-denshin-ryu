import { Tooltip } from "@mui/material";

import { ERROR, SUCCESS } from "@style/status.tokens";
import { PURPLE } from "@style/tokens";

import { Dot } from "./AttendanceDayDot.style";

enum AttendanceStatus {
  present = "present",
  absent = "absent",
  unmarked = "unmarked",
}

interface Props {
  status: AttendanceStatus;
  size?: number;
  tooltip?: string;
}

const COLOR: Record<AttendanceStatus, string> = {
  [AttendanceStatus.present]: SUCCESS,
  [AttendanceStatus.absent]: ERROR,
  [AttendanceStatus.unmarked]: PURPLE,
};

const AttendanceDayDot = ({ status, size = 8, tooltip }: Props) => {
  const dot = <Dot size={size} color={COLOR[status]} />;

  if (tooltip) {
    return (
      <Tooltip title={tooltip} arrow>
        {dot}
      </Tooltip>
    );
  }

  return dot;
};

export default AttendanceDayDot;
export { AttendanceStatus };
