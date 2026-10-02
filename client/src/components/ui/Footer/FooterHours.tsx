import { Box, Typography } from "@mui/material";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import TimeRange from "@components/ui/TimeRange/TimeRange";
import { getSessionsByDay } from "@constants/trainingSchedule";
import { GROUP_LABEL_IDS } from "@features/public/schedule/groupLabels";
import useDateNames from "@hooks/useDateNames";
import { Routes } from "@lib/routes";

import {
  hoursDayNameSx,
  hoursDaySx,
  hoursGroupSx,
  hoursSessionSx,
  listSx,
} from "./Footer.style";
import FooterColumnTitle from "./FooterColumnTitle";
import FooterMoreLink from "./FooterMoreLink";

const SESSIONS_BY_DAY = getSessionsByDay();

const FooterHours = () => {
  const { DAY_NAMES } = useDateNames();

  return (
    <Box>
      <FooterColumnTitle id="footer.hours.title" />
      <Box component="ul" sx={listSx}>
        {SESSIONS_BY_DAY.map(({ day, sessions }) => (
          <Box component="li" key={day} sx={hoursDaySx}>
            <Typography sx={hoursDayNameSx}>{DAY_NAMES[day]}</Typography>
            <Box>
              {sessions.map(({ group, start, end }) => (
                <Typography key={`${group}-${start}`} sx={hoursSessionSx}>
                  <span>
                    <TimeRange start={start} end={end} />
                  </span>
                  <Box component="span" sx={hoursGroupSx}>
                    <FormattedMessage id={GROUP_LABEL_IDS[group]} />
                  </Box>
                </Typography>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
      <FooterMoreLink to={Routes.schedule} id="footer.hours.link" />
    </Box>
  );
};

export default FooterHours;
