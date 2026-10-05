import { Box, Divider, Typography } from "@mui/material";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import type { TrainingDaySessions } from "@constants/trainingSchedule";
import useDateNames from "@hooks/useDateNames";
import { stripDiacritics } from "@utils/string";

import DayBoard from "./DayBoard";
import { DAY_KANJI } from "./dayKanji";
import SessionItem from "./SessionItem";

import {
  dayCardSx,
  dayDividerSx,
  dayKanjiSx,
  dayMetaSx,
  dayNameSx,
  lanternOnCardSx,
  sessionListSx,
} from "./Schedule.style";

/** One weekday's training sessions, on a board like those of the dojo front */
const DayCard = ({ day, sessions }: TrainingDaySessions) => {
  const { DAY_NAMES } = useDateNames();

  return (
    <DayBoard
      day={day}
      sx={dayCardSx}
      lanternHeight="76px"
      lanternSx={lanternOnCardSx}
    >
      <Typography sx={dayKanjiSx} lang="ja" aria-hidden>
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
    </DayBoard>
  );
};

export default DayCard;
