import { Box, Divider, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { useIntl } from "react-intl";

import type { EventSession } from "@api/events";
import { DAY_KANJI } from "@features/public/schedule/dayKanji";
import { padNumber, stripDiacritics } from "@utils/string";

import {
  sessionCardSx,
  sessionDateSx,
  sessionDaySx,
  sessionDividerSx,
  sessionKanjiSx,
  sessionNoteSx,
  sessionTimeSx,
  sessionWeekdaySx,
} from "./EventDetail.style";
import { describeSession, formatDuration } from "./formatEventDate";

interface Props {
  session: EventSession;
  /** 1 for the event's first session */
  number: number;
  /** Adds just this session to a calendar */
  calendar?: ReactNode;
}

/**
 * One day of the event: which day, its date and its hours, under the
 * weekday's kanji. A session running over several days says when it ends.
 */
const EventSessionCard = ({ session, number, calendar }: Props) => {
  const intl = useIntl();
  const { weekday, weekdayName, date, startTime, endTime, endDate, minutes } =
    describeSession(intl.locale, session);

  return (
    <Box component="article" sx={sessionCardSx}>
      <Box sx={sessionKanjiSx} lang="ja" aria-hidden>
        {DAY_KANJI[weekday]}
      </Box>

      <Typography sx={sessionDaySx}>
        {intl.formatMessage(
          { id: "page.event.session.day" },
          { number: padNumber(number) }
        )}
      </Typography>
      <Typography component="h3" sx={sessionWeekdaySx}>
        {stripDiacritics(weekdayName)}
      </Typography>
      <Typography sx={sessionDateSx}>{date}</Typography>

      <Divider sx={sessionDividerSx} />

      <Typography sx={sessionTimeSx}>
        <time dateTime={session.startsAt}>{startTime}</time>
        {endTime && !endDate && (
          <>
            {" – "}
            <time dateTime={session.endsAt ?? undefined}>{endTime}</time>
          </>
        )}
      </Typography>
      {minutes !== null && (
        <Typography sx={sessionNoteSx}>{formatDuration(minutes)}</Typography>
      )}
      {endDate && (
        <Typography sx={sessionNoteSx}>
          {intl.formatMessage(
            { id: "page.event.session.ends" },
            { date: endDate, time: endTime }
          )}
        </Typography>
      )}
      {calendar}
    </Box>
  );
};

export default EventSessionCard;
