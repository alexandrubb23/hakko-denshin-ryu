import type { SvgIconComponent } from "@mui/icons-material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Button,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { useIntl } from "react-intl";

import type { Event } from "@api/events";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import { PURPLE_ALPHA_30 } from "@style/colorScheme";
import { stripDiacritics } from "@utils/string";
import type { IntlMessageID } from "i18n/messages";

import { formatEventSessions } from "./formatEventDate";
import {
  CARD_CONTENT_SX,
  chipSx,
  DetailsTypography,
  EVENT_IMAGE_HEIGHT,
  EventCard as EventCardRoot,
  ICON_SX,
  ImagePlaceholder,
  MUTED_TEXT_SX,
  TICKET_BUTTON_SX,
  TYPE_COLORS,
} from "./PublicEvents.style";

/** An icon followed by a line of muted caption text */
const MetaRow = ({
  icon: Icon,
  children,
}: {
  icon: SvgIconComponent;
  children: React.ReactNode;
}) => (
  <Stack direction="row" alignItems="flex-start" gap={0.75}>
    <Icon sx={ICON_SX} />
    <Typography variant="caption" sx={MUTED_TEXT_SX}>
      {children}
    </Typography>
  </Stack>
);

/** One upcoming event: image, type, name, when, where and a ticket link */
const EventCard = ({ event }: { event: Event }) => {
  const intl = useIntl();

  return (
    <EventCardRoot>
      {event.image ? (
        <CardMedia
          component="img"
          height={EVENT_IMAGE_HEIGHT}
          image={event.image}
          alt={event.name}
          sx={{ objectFit: "cover" }}
        />
      ) : (
        <ImagePlaceholder>
          <EventNoteIcon sx={{ fontSize: 56, color: PURPLE_ALPHA_30 }} />
        </ImagePlaceholder>
      )}

      <CardContent sx={CARD_CONTENT_SX}>
        <Chip
          label={intl.formatMessage({
            id: `page.events.type.${event.type}` as IntlMessageID,
          })}
          size="small"
          sx={chipSx(TYPE_COLORS[event.type] ?? TYPE_COLORS.other)}
        />

        <Typography variant="h6" fontWeight={700} lineHeight={1.3}>
          {stripDiacritics(event.name)}
        </Typography>

        <MetaRow icon={CalendarMonthIcon}>
          {formatEventSessions(intl.locale, event.sessions).map((line) => (
            <span key={line} style={{ display: "block" }}>
              {line}
            </span>
          ))}
        </MetaRow>
        <MetaRow icon={LocationOnIcon}>
          {stripDiacritics(event.location)}
        </MetaRow>

        <DetailsTypography variant="body2">{event.details}</DetailsTypography>

        {event.ticketUrl && (
          <Button
            component="a"
            href={event.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            size="small"
            endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
            sx={TICKET_BUTTON_SX}
          >
            <FormattedMessage id="page.events.get.tickets" />
          </Button>
        )}
      </CardContent>
    </EventCardRoot>
  );
};

export default EventCard;
