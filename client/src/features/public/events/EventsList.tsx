import EventNoteIcon from "@mui/icons-material/EventNote";
import { Box, Stack, Typography } from "@mui/material";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import CardGrid from "@components/ui/PageSections/CardGrid";
import { useEvents } from "@features/admin/events/hooks/useEvents";

import EventCard from "./EventCard";
import EventCardSkeleton from "./EventCardSkeleton";
import {
  EMPTY_ICON_SX,
  EVENT_CARD_SIZE,
  EVENTS_LIST_SX,
  MUTED_TEXT_SX,
} from "./PublicEvents.style";

const SKELETON_COUNT = 3;
const CARD_STAGGER = 0.06;

/** The upcoming events as cards, or their loading, error or empty state */
const EventsList = () => {
  const { data: events, isLoading, isError } = useEvents();

  const body = isError ? (
    <Typography color="error" sx={{ mt: 4 }}>
      <FormattedMessage id="page.events.error" />
    </Typography>
  ) : isLoading ? (
    <CardGrid size={EVENT_CARD_SIZE} stagger={0}>
      {Array.from({ length: SKELETON_COUNT }, (_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </CardGrid>
  ) : events?.length ? (
    <CardGrid size={EVENT_CARD_SIZE} stagger={CARD_STAGGER}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </CardGrid>
  ) : (
    <Stack alignItems="center" py={10} gap={1}>
      <EventNoteIcon sx={EMPTY_ICON_SX} />
      <Typography sx={MUTED_TEXT_SX} variant="h6">
        <FormattedMessage id="page.events.empty" />
      </Typography>
      <Typography sx={MUTED_TEXT_SX} variant="body2">
        <FormattedMessage id="page.events.empty.subtitle" />
      </Typography>
    </Stack>
  );

  return <Box sx={EVENTS_LIST_SX}>{body}</Box>;
};

export default EventsList;
