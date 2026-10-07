import type { SvgIconComponent } from "@mui/icons-material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Box,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { useIntl } from "react-intl";

import type { Event } from "@api/events";
import TransitionLink from "@components/ui/TransitionLink/TransitionLink";
import { Routes } from "@lib/routes";
import { PURPLE_ALPHA_30 } from "@style/colorScheme";
import { stripDiacritics } from "@utils/string";

import { formatEventType } from "./eventType";
import { formatEventSessions } from "./formatEventDate";
import {
  CARD_CONTENT_SX,
  CARD_LINK_CLASS,
  CARD_LINK_SX,
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
import TicketsButton from "./TicketsButton";

/** An icon followed by a line of muted caption text */
const MetaRow = ({
  icon: Icon,
  children,
}: {
  icon: SvgIconComponent;
  children: React.ReactNode;
}) => (
  <Stack direction="row" sx={{ alignItems: "flex-start", gap: 0.75 }}>
    <Icon sx={ICON_SX} />
    <Typography variant="caption" sx={MUTED_TEXT_SX}>
      {children}
    </Typography>
  </Stack>
);

/**
 * One upcoming event: image, type, name, when, where and a ticket link.
 * The name's link stretches over the card, so the card opens the event.
 */
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
          label={formatEventType(intl, event.type)}
          size="small"
          sx={chipSx(TYPE_COLORS[event.type] ?? TYPE_COLORS.other)}
        />

        <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
          <Box
            component={TransitionLink}
            to={Routes.eventDetail(event.slug)}
            className={CARD_LINK_CLASS}
            sx={CARD_LINK_SX}
          >
            {stripDiacritics(event.name)}
          </Box>
        </Typography>

        <MetaRow icon={CalendarMonthIcon}>
          {formatEventSessions(intl.locale, event.sessions).map(
            (line, index) => (
              <span key={index} style={{ display: "block" }}>
                {line}
              </span>
            )
          )}
        </MetaRow>
        <MetaRow icon={LocationOnIcon}>
          {stripDiacritics(event.location)}
        </MetaRow>

        <DetailsTypography variant="body2">{event.details}</DetailsTypography>

        {event.ticketUrl && (
          <TicketsButton
            href={event.ticketUrl}
            size="small"
            sx={TICKET_BUTTON_SX}
          />
        )}
      </CardContent>
    </EventCardRoot>
  );
};

export default EventCard;
