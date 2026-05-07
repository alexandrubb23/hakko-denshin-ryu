import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";

import { useEvents } from "@features/admin/events/hooks/useEvents";
import { PURPLE_ALPHA_30, SKELETON_SX } from "@style/tokens";
import {
  CARD_CONTENT_SX,
  chipSx,
  DetailsTypography,
  EventCard,
  eyebrowSx,
  ICON_SX,
  ImagePlaceholder,
  pageHeaderDividerSx,
  pageHeaderSx,
  pageKanjiSx,
  pageTitleSx,
  PageWrapper,
  SkeletonCard,
  TICKET_BUTTON_SX,
  TYPE_COLORS,
} from "./PublicEvents.style";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } };

const FadeIn = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-40px" }}
    variants={fadeUp}
    transition={{ duration: 0.7, ease: EASE_OUT, delay }}
  >
    {children}
  </motion.div>
);

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
        {/* ── Page header ─────────────────────────────────────────────── */}
        <Box sx={pageHeaderSx}>
          <FadeIn>
            <Typography sx={eyebrowSx}>Senshinkan · Romania</Typography>
            <Typography component="h1" sx={pageTitleSx}>
              Events
            </Typography>
            <Typography sx={pageKanjiSx}>行事</Typography>
            <Divider sx={pageHeaderDividerSx} />
          </FadeIn>
        </Box>

        {/* ── Error state ──────────────────────────────────────────────── */}
        {isError && (
          <Typography color="error" sx={{ mb: 4 }}>
            Failed to load events. Please try again.
          </Typography>
        )}

        {/* ── Empty state ──────────────────────────────────────────────── */}
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

        {/* ── Skeleton loading ─────────────────────────────────────────── */}
        {isLoading && (
          <Grid container spacing={3}>
            {[0, 1, 2].map((i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                <SkeletonCard>
                  <Skeleton
                    variant="rectangular"
                    height={180}
                    sx={SKELETON_SX}
                  />
                  <CardContent sx={CARD_CONTENT_SX}>
                    <Skeleton width="40%" sx={SKELETON_SX} />
                    <Skeleton width="80%" sx={SKELETON_SX} />
                    <Skeleton width="60%" sx={SKELETON_SX} />
                    <Skeleton width="50%" sx={SKELETON_SX} />
                    <Skeleton
                      variant="rectangular"
                      height={36}
                      sx={SKELETON_SX}
                    />
                  </CardContent>
                </SkeletonCard>
              </Grid>
            ))}
          </Grid>
        )}

        {/* ── Event cards ──────────────────────────────────────────────── */}
        <Grid container spacing={3}>
          {events?.map((event, idx) => (
            <Grid key={event.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <FadeIn delay={idx * 0.06}>
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
                        sx={{ fontSize: 56, color: PURPLE_ALPHA_30 }}
                      />
                    </ImagePlaceholder>
                  )}

                  <CardContent sx={CARD_CONTENT_SX}>
                    <Stack direction="row" gap={1} flexWrap="wrap">
                      <Chip
                        label={event.type}
                        size="small"
                        sx={chipSx(
                          TYPE_COLORS[event.type] ?? TYPE_COLORS.other
                        )}
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
              </FadeIn>
            </Grid>
          ))}
        </Grid>
      </Container>
    </PageWrapper>
  );
};

export default PublicEvents;
