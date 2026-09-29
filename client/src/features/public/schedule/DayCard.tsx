import { Box, Divider, Typography } from "@mui/material";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import type { TrainingDaySessions } from "@constants/trainingSchedule";
import useDateNames from "@hooks/useDateNames";
import { stripDiacritics } from "@utils/string";

import SessionItem from "./SessionItem";

import {
  dayCardSx,
  dayDividerSx,
  dayKanjiSx,
  dayMetaSx,
  dayNameSx,
  sessionListSx,
} from "./Schedule.style";

// Japanese weekday kanji, indexed by JS getDay()
const DAY_KANJI = ["日", "月", "火", "水", "木", "金", "土"] as const;

/** Card listing one weekday's training sessions. */
const DayCard = ({ day, sessions }: TrainingDaySessions) => {
  const { DAY_NAMES } = useDateNames();

  return (
    <Box component="article" sx={dayCardSx}>
      <Typography sx={dayKanjiSx} aria-hidden>
        {DAY_KANJI[day]}
      </Typography>
      <Typography component="h3" sx={dayNameSx}>
        {stripDiacritics(DAY_NAMES[day])}
      </Typography>
      <Typography sx={dayMetaSx}>
        <FormattedMessage
          id="page.schedule.day.sessions"
          values={{ count: sessions.length }}
        />
      </Typography>
      <Divider sx={dayDividerSx} />
      <Box component="ul" sx={sessionListSx}>
        {sessions.map((session) => (
          <SessionItem
            key={`${session.group}-${session.start}`}
            session={session}
          />
        ))}
      </Box>
    </Box>
  );
};

export default DayCard;
