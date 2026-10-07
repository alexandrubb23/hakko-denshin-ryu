import { Box, Container, Grid, Skeleton, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { useParams } from "react-router";

import type { Event } from "@api/events";
import FadeIn from "@components/ui/FadeIn/FadeIn";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import MoonCover from "@components/ui/MoonCover/MoonCover";
import CardGrid from "@components/ui/PageSections/CardGrid";
import LinkButton from "@components/ui/PageSections/LinkButton";
import PageSection from "@components/ui/PageSections/PageSection";
import SectionHeading from "@components/ui/PageSections/SectionHeading";
import NotFound from "@features/public/not-found/NotFound";
import { Routes } from "@lib/routes";
import { SKELETON_SX } from "@style/colorScheme";
import { isNotFoundError } from "@utils/getServerError";
import { stripDiacritics } from "@utils/string";

import AddToCalendar from "./AddToCalendar";
import {
  SESSION_CARD_SIZE,
  descriptionSx,
  posterLinkSx,
  posterSx,
} from "./EventDetail.style";
import EventFacts from "./EventFacts";
import { EVENTS_MOON_ART } from "./eventsArt";
import EventSessionCard from "./EventSessionCard";
import { formatEventType } from "./eventType";
import { formatEventSpan } from "./formatEventDate";
import { useEventBySlug } from "./hooks/useEventBySlug";
import TicketsButton from "./TicketsButton";

// Seconds between one session card fading in and the next
const SESSION_STAGGER = 0.08;

const ABOUT_COLUMNS = { text: { xs: 12, md: 7 }, aside: { xs: 12, md: 5 } };

interface CoverProps {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  tagline?: React.ReactNode;
  /** Shown before the way back to the list, e.g. the tickets */
  action?: React.ReactNode;
}

/** The page's moon cover, under the same lantern-lit stage as the list */
const EventCover = ({ eyebrow, title, tagline, action }: CoverProps) => (
  <MoonCover
    art={EVENTS_MOON_ART}
    // 催し — "a gathering"
    kanji="催し"
    eyebrow={eyebrow}
    title={title}
    compactTitle
    tagline={tagline}
    actions={
      <>
        {action}
        <LinkButton to={Routes.events} direction="back">
          <FormattedMessage id="page.event.back" />
        </LinkButton>
      </>
    }
  />
);

/** The event's poster, opening full size in a new tab */
const Poster = ({ src, name }: { src: string; name: string }) => {
  const intl = useIntl();
  return (
    <Box
      component="a"
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      sx={posterLinkSx}
    >
      <Box
        component="img"
        src={src}
        alt={intl.formatMessage({ id: "page.event.poster" }, { name })}
        sx={posterSx}
      />
    </Box>
  );
};

/** Everything about the event: its cover, what it is and its programme */
const EventContent = ({ event }: { event: Event }) => {
  const intl = useIntl();
  const type = formatEventType(intl, event.type);

  return (
    <>
      <EventCover
        eyebrow={intl.formatMessage(
          { id: "page.event.hero.eyebrow" },
          { type }
        )}
        title={stripDiacritics(event.name)}
        tagline={`${formatEventSpan(intl.locale, event.sessions)} · ${event.location}`}
        action={
          <>
            {event.ticketUrl && <TicketsButton href={event.ticketUrl} />}
            <AddToCalendar event={event} />
          </>
        }
      />

      <Container maxWidth="lg">
        {/* ── 01. About the event ─────────────────────────────────────── */}
        <PageSection>
          <FadeIn>
            <SectionHeading
              id="about"
              number="01"
              title={<FormattedMessage id="page.event.about.title" />}
              kanji="概要"
            />
          </FadeIn>
          <Grid container spacing={{ xs: 5, md: 8 }}>
            <Grid size={ABOUT_COLUMNS.text}>
              <FadeIn>
                <Typography sx={descriptionSx}>{event.details}</Typography>
              </FadeIn>
            </Grid>
            <Grid size={ABOUT_COLUMNS.aside}>
              <FadeIn delay={0.15}>
                {event.image && <Poster src={event.image} name={event.name} />}
                <EventFacts event={event} />
              </FadeIn>
            </Grid>
          </Grid>
        </PageSection>

        {/* ── 02. Programme ───────────────────────────────────────────── */}
        <PageSection>
          <FadeIn>
            <SectionHeading
              id="programme"
              number="02"
              title={<FormattedMessage id="page.event.programme.title" />}
              kanji="日程"
            />
          </FadeIn>
          <CardGrid size={SESSION_CARD_SIZE} stagger={SESSION_STAGGER}>
            {event.sessions.map((session, index) => (
              <EventSessionCard
                key={session.id}
                session={session}
                number={index + 1}
                // Of several sessions, each can be added on its own
                calendar={
                  event.sessions.length > 1 && (
                    <AddToCalendar
                      event={event}
                      session={session}
                      size="small"
                    />
                  )
                }
              />
            ))}
          </CardGrid>
        </PageSection>
      </Container>
    </>
  );
};

/** The cover's place while the event loads */
const LoadingCover = () => (
  <EventCover
    eyebrow={<Skeleton width={180} sx={SKELETON_SX} />}
    title={<Skeleton width="80%" sx={SKELETON_SX} />}
    tagline={<Skeleton width={240} sx={SKELETON_SX} />}
  />
);

/** One event, opened from its card at /events/:slug */
const EventDetail = () => {
  const { slug = "" } = useParams();
  const { data: event, error, isError } = useEventBySlug(slug);

  if (event) return <EventContent event={event} />;
  if (isNotFoundError(error)) return <NotFound />;
  if (isError) {
    return (
      <EventCover
        eyebrow={<FormattedMessage id="page.events.title" />}
        title={<FormattedMessage id="page.event.title" />}
        tagline={<FormattedMessage id="page.event.error" />}
      />
    );
  }
  return <LoadingCover />;
};

export default EventDetail;
