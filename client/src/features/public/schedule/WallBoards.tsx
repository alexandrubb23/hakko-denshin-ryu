import { Box, Typography } from "@mui/material";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import TimeRange from "@components/ui/TimeRange/TimeRange";
import type { TrainingDaySessions } from "@constants/trainingSchedule";
import useDateNames from "@hooks/useDateNames";
import { stripDiacritics } from "@utils/string";

import DayBoard from "./DayBoard";
import { DAY_KANJI } from "./dayKanji";
import { FACADE_BOARDS } from "./facadeArt";
import { GROUP_LABEL_IDS } from "./groupLabels";
import {
  boardDayNameSx,
  boardGroupSx,
  boardKanjiSx,
  boardRuleSx,
  boardSessionListSx,
  boardSx,
  boardTimeSx,
  lanternOnBoardSx,
  wallSx,
} from "./WallBoards.style";

/** The week's timetable, one day written on each board of the dojo front */
const WallBoards = ({ days }: { days: TrainingDaySessions[] }) => {
  const { DAY_NAMES } = useDateNames();

  return (
    <Box sx={wallSx}>
      {days.map(({ day, sessions }, i) => (
        <DayBoard
          key={day}
          day={day}
          sx={boardSx(FACADE_BOARDS[i])}
          lanternHeight="6cqh"
          lanternSx={lanternOnBoardSx}
        >
          <Box sx={boardKanjiSx} lang="ja" aria-hidden>
            {DAY_KANJI[day]}
          </Box>
          <Typography component="h3" sx={boardDayNameSx}>
            {stripDiacritics(DAY_NAMES[day])}
          </Typography>
          <Box sx={boardRuleSx} />

          <Box component="ul" sx={boardSessionListSx}>
            {sessions.map(({ group, start, end }) => (
              <li key={`${group}-${start}`}>
                <Typography sx={boardTimeSx}>
                  <TimeRange start={start} end={end} />
                </Typography>
                <Typography component="span" sx={boardGroupSx(group)}>
                  <FormattedMessage id={GROUP_LABEL_IDS[group]} />
                </Typography>
              </li>
            ))}
          </Box>
        </DayBoard>
      ))}
    </Box>
  );
};

export default WallBoards;
