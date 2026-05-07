import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Tooltip } from "@mui/material";
import type { ReactElement } from "react";

import { AttendedStatus, StyledChip } from "./AttendedChip.style";

interface ChipConfig {
  icon: ReactElement;
  label: string;
  tooltip: string;
}

const CONFIG: Record<AttendedStatus, ChipConfig> = {
  [AttendedStatus.yes]: {
    icon: <CheckCircleIcon sx={{ fontSize: 14 }} />,
    label: "Yes",
    tooltip: "Attended",
  },
  [AttendedStatus.no]: {
    icon: <CancelIcon sx={{ fontSize: 14 }} />,
    label: "No",
    tooltip: "Did not attend",
  },
  [AttendedStatus.unmarked]: {
    icon: <HelpOutlineIcon sx={{ fontSize: 14 }} />,
    label: "—",
    tooltip: "Not yet marked",
  },
};

const toStatus = (attended: boolean | null): AttendedStatus => {
  if (attended === true) return AttendedStatus.yes;
  if (attended === false) return AttendedStatus.no;
  return AttendedStatus.unmarked;
};

interface Props {
  attended: boolean | null;
}

const AttendedChip = ({ attended }: Props) => {
  const status = toStatus(attended);
  const { icon, label, tooltip } = CONFIG[status];

  return (
    <Tooltip title={tooltip}>
      <StyledChip
        attendedStatus={status}
        icon={icon}
        label={label}
        size="small"
      />
    </Tooltip>
  );
};

export { AttendedStatus };
export default AttendedChip;
