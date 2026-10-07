import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CategoryIcon from "@mui/icons-material/Category";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";

import type { Event } from "@api/events";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import { mapSearchUrl } from "@constants/contact";
import type { IntlMessageID } from "i18n/messages";

import {
  factIconSx,
  factLabelSx,
  factNoteSx,
  factRowSx,
  factsSx,
  factValueSx,
} from "./EventDetail.style";
import { formatEventType } from "./eventType";
import { countEventDays, formatEventSpan } from "./formatEventDate";
import ShareEvent from "./ShareEvent";
import TicketsButton from "./TicketsButton";

interface FactProps {
  icon: React.ReactNode;
  label: IntlMessageID;
  value: React.ReactNode;
  note?: React.ReactNode;
}

/** An icon, a small label, the value and an optional note under it */
const Fact = ({ icon, label, value, note }: FactProps) => (
  <Box sx={factRowSx}>
    <Box sx={factIconSx} aria-hidden>
      {icon}
    </Box>
    <Box>
      <Typography sx={factLabelSx}>
        <FormattedMessage id={label} />
      </Typography>
      <Typography sx={factValueSx}>{value}</Typography>
      {note && <Typography sx={factNoteSx}>{note}</Typography>}
    </Box>
  </Box>
);

/** The event at a glance: what, when and where, its tickets and sharing */
const EventFacts = ({ event }: { event: Event }) => {
  const intl = useIntl();

  return (
    <Box sx={factsSx}>
      <Fact
        icon={<CategoryIcon />}
        label="page.event.fact.type"
        value={formatEventType(intl, event.type)}
      />
      <Fact
        icon={<CalendarMonthIcon />}
        label="page.event.fact.when"
        value={formatEventSpan(intl.locale, event.sessions)}
        note={intl.formatMessage(
          { id: "page.event.days" },
          { count: countEventDays(event.sessions) }
        )}
      />
      <Fact
        icon={<LocationOnIcon />}
        label="page.event.fact.where"
        value={event.location}
        note={
          <a
            href={mapSearchUrl(event.location)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FormattedMessage id="page.event.map" />
          </a>
        }
      />

      {event.ticketUrl && <TicketsButton href={event.ticketUrl} />}

      <ShareEvent event={event} />
    </Box>
  );
};

export default EventFacts;
