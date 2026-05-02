import { Box, Tooltip } from "@mui/material";

import { ERROR, SUCCESS } from "@style/status.tokens";
import { PURPLE } from "@style/tokens";

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
  const dot = (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: COLOR[status],
        flexShrink: 0,
      }}
    />
  );

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
