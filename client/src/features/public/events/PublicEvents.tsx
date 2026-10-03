import { Container } from "@mui/material";

import CoverPhoto from "@components/ui/CoverPhoto/CoverPhoto";
import FadeIn from "@components/ui/FadeIn/FadeIn";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import MoonCover from "@components/ui/MoonCover/MoonCover";
import PageSection from "@components/ui/PageSections/PageSection";
import SectionHeading from "@components/ui/PageSections/SectionHeading";

import clubImage from "@assets/images/279.webp";

import { EVENTS_MOON_ART } from "./eventsArt";
import EventsList from "./EventsList";
import { coverPhotoSx } from "./PublicEvents.style";

const PublicEvents = () => (
  <>
    <MoonCover
      art={EVENTS_MOON_ART}
      kanji="行事"
      eyebrow={<FormattedMessage id="page.events.hero.eyebrow" />}
      title={<FormattedMessage id="page.events.title" />}
      tagline={<FormattedMessage id="page.events.hero.tagline" />}
      aboveTitle={
        <CoverPhoto src={clubImage} aspectRatio="2 / 3" sx={coverPhotoSx} />
      }
    />

    <Container maxWidth="lg">
      {/* ── 01. Upcoming events ──────────────────────────────────────── */}
      <PageSection>
        <FadeIn>
          <SectionHeading
            number="01"
            title={<FormattedMessage id="page.events.upcoming.title" />}
            kanji="行事"
          />
        </FadeIn>
        <EventsList />
      </PageSection>
    </Container>
  </>
);

export default PublicEvents;
