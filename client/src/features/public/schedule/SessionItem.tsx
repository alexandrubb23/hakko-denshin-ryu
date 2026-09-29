import { Box, Chip, Typography } from "@mui/material";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import {
  getSessionMinutes,
  type TrainingSession,
} from "@constants/trainingSchedule";

import { GROUP_LABEL_IDS } from "./groupLabels";
import {
  groupChipSx,
  sessionDurationSx,
  sessionSx,
  sessionTimeSx,
} from "./Schedule.style";

/** One timetable row: time range, duration and group chip. */
const SessionItem = ({ session }: { session: TrainingSession }) => (
  <Box component="li" sx={sessionSx(session.group)}>
    <Box>
      <Typography sx={sessionTimeSx}>
        <time dateTime={session.start}>{session.start}</time>
        {" – "}
        <time dateTime={session.end}>{session.end}</time>
      </Typography>
      <Typography sx={sessionDurationSx}>
        <FormattedMessage
          id="page.schedule.duration"
          values={{ minutes: getSessionMinutes(session) }}
        />
      </Typography>
    </Box>
    <Chip
      size="small"
      label={<FormattedMessage id={GROUP_LABEL_IDS[session.group]} />}
      sx={groupChipSx(session.group)}
    />
  </Box>
);

export default SessionItem;
