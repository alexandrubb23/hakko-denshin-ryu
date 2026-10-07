import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutlined";
import { Tooltip } from "@mui/material";
import type { ReactElement } from "react";
import { useIntl } from "react-intl";

import type { IntlMessageID } from "i18n/messages";

import { AttendedStatus, StyledChip } from "./AttendedChip.style";

interface ChipConfig {
  icon: ReactElement;
  label: IntlMessageID | null;
  tooltip: IntlMessageID;
}

const CONFIG: Record<AttendedStatus, ChipConfig> = {
  [AttendedStatus.yes]: {
    icon: <CheckCircleIcon sx={{ fontSize: 14 }} />,
    label: "common.yes",
    tooltip: "shared.attended.tooltip.yes",
  },
  [AttendedStatus.no]: {
    icon: <CancelIcon sx={{ fontSize: 14 }} />,
    label: "common.no",
    tooltip: "shared.attended.tooltip.no",
  },
  [AttendedStatus.unmarked]: {
    icon: <HelpOutlineIcon sx={{ fontSize: 14 }} />,
    label: null,
    tooltip: "shared.attended.tooltip.unmarked",
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
  const intl = useIntl();
  const status = toStatus(attended);
  const { icon, label, tooltip } = CONFIG[status];

  return (
    <Tooltip title={intl.formatMessage({ id: tooltip })}>
      <StyledChip
        attendedStatus={status}
        icon={icon}
        label={label ? intl.formatMessage({ id: label }) : "—"}
        size="small"
      />
    </Tooltip>
  );
};

export { AttendedStatus };
export default AttendedChip;
