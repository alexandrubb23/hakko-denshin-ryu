import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Button,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import CenterSpinner from "@components/Spinner/CenterSpinner";
import { useEvents } from "@hooks/useEvents";
import { PURPLE } from "@style/tokens";
import {
  CARD_CONTENT_SX,
  DetailsTypography,
  EventCard,
  ICON_SX,
  ImagePlaceholder,
  PageWrapper,
  TICKET_BUTTON_SX,
  TYPE_COLORS,
  chipSx,
} from "./PublicEvents.style";

const formatEventDate = (start: string, end?: string | null): string => {
  const opts: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Bucharest",
  };
  const startStr = new Date(start).toLocaleString("en-GB", opts);
  if (!end) return startStr;
  const endStr = new Date(end).toLocaleString("en-GB", opts);
  return `${startStr} – ${endStr}`;
};

const PublicEvents = () => {
  const { data: events, isLoading, isError } = useEvents();

  return (
    <PageWrapper>
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" gap={1.5} mb={5}>
          <EventNoteIcon sx={{ color: PURPLE, fontSize: 36 }} />
          <Typography variant="h3" fontWeight={700}>
            Events
          </Typography>
        </Stack>

        {isError && (
          <Typography color="error">
            Failed to load events. Please try again.
          </Typography>
        )}

        {!isLoading && !isError && events?.length === 0 && (
          <Stack alignItems="center" py={10} gap={1}>
            <EventNoteIcon sx={{ fontSize: 56, color: "text.disabled" }} />
            <Typography color="text.secondary" variant="h6">
              No upcoming events at the moment.
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Check back soon!
            </Typography>
          </Stack>
        )}

        {isLoading && <CenterSpinner />}

        <Grid container spacing={3}>
          {events?.map((event) => (
            <Grid key={event.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <EventCard>
                {event.image ? (
                  <CardMedia
                    component="img"
                    height={180}
                    image={event.image}
                    alt={event.name}
                    sx={{ objectFit: "cover" }}
                  />
                ) : (
                  <ImagePlaceholder>
                    <EventNoteIcon
                      sx={{ fontSize: 56, color: "rgba(171,150,255,0.3)" }}
                    />
                  </ImagePlaceholder>
                )}

                <CardContent sx={CARD_CONTENT_SX}>
                  <Stack direction="row" gap={1} flexWrap="wrap">
                    <Chip
                      label={event.type}
                      size="small"
                      sx={chipSx(TYPE_COLORS[event.type] ?? TYPE_COLORS.other)}
                    />
                  </Stack>

                  <Typography variant="h6" fontWeight={700} lineHeight={1.3}>
                    {event.name}
                  </Typography>

                  <Stack direction="row" alignItems="flex-start" gap={0.75}>
                    <CalendarMonthIcon sx={ICON_SX} />
                    <Typography variant="caption" color="text.secondary">
                      {formatEventDate(event.startDate, event.endDate)}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="flex-start" gap={0.75}>
                    <LocationOnIcon sx={ICON_SX} />
                    <Typography variant="caption" color="text.secondary">
                      {event.location}
                    </Typography>
                  </Stack>

                  <DetailsTypography variant="body2" color="text.secondary">
                    {event.details}
                  </DetailsTypography>

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
                      Get Tickets
                    </Button>
                  )}
                </CardContent>
              </EventCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </PageWrapper>
  );
};

export default PublicEvents;
