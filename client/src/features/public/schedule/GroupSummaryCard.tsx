import ChildCareIcon from "@mui/icons-material/ChildCare";
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import { getGroupStats } from "@constants/trainingSchedule";
import type { StudentCategory } from "@hakko/core";

import { GROUP_LABEL_IDS } from "./groupLabels";
import {
  groupCardSx,
  groupDotSx,
  groupNameSx,
  groupSummarySx,
} from "./Schedule.style";

const GROUP_ICONS: Record<StudentCategory, typeof ChildCareIcon> = {
  kid: ChildCareIcon,
  senior: SportsMartialArtsIcon,
};

/** A group's weekly session count and hours; its colour keys the timetable */
const GroupSummaryCard = ({ group }: { group: StudentCategory }) => {
  const intl = useIntl();
  const { count, minutes } = getGroupStats(group);
  const Icon = GROUP_ICONS[group];

  return (
    <Box sx={groupCardSx(group)}>
      <Box sx={groupDotSx(group)}>
        <Icon fontSize="small" />
      </Box>
      <Box>
        <Typography component="span" sx={groupNameSx}>
          <FormattedMessage id={GROUP_LABEL_IDS[group]} />
        </Typography>
        <Typography sx={groupSummarySx}>
          <FormattedMessage
            id="page.schedule.group.summary"
            values={{
              count,
              hours: intl.formatNumber(minutes / 60, {
                maximumFractionDigits: 1,
              }),
            }}
          />
        </Typography>
      </Box>
    </Box>
  );
};

export default GroupSummaryCard;
