import { Box, Container } from "@mui/material";

import FadeIn from "@components/ui/FadeIn/FadeIn";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import MoonCover from "@components/ui/MoonCover/MoonCover";
import ArtBand from "@components/ui/PageSections/ArtBand";
import CardGrid from "@components/ui/PageSections/CardGrid";
import PageSection from "@components/ui/PageSections/PageSection";
import Paragraphs from "@components/ui/PageSections/Paragraphs";
import SectionHeading from "@components/ui/PageSections/SectionHeading";
import { getSessionsByDay } from "@constants/trainingSchedule";
import { STUDENT_CATEGORIES } from "@hakko/core";

import valleyArt from "@assets/images/hakko-ryu-valley.webp";
import { HAKKO_RYU_MOON_ART } from "@features/public/hakko-ryu/hakkoRyuArt";

import DayCard from "./DayCard";
import { FACADE_BOARDS, FACADE_MOON_ART, FACADE_WIDE_FADE } from "./facadeArt";
import GroupSummaryCard from "./GroupSummaryCard";
import ScheduleCta from "./ScheduleCta";
import ScheduleQuote from "./ScheduleQuote";
import WallBoards from "./WallBoards";

import { timetableSx } from "./Schedule.style";

// Seconds between one card fading in and the next
const GROUP_STAGGER = 0.05;
const DAY_STAGGER = 0.08;

const DAYS = getSessionsByDay();
// The painted dojo front has one board per training day
const FITS_BOARDS = DAYS.length === FACADE_BOARDS.length;

const Schedule = () => (
  <>
    <MoonCover
      art={FACADE_MOON_ART}
      // Narrow screens list the timetable below the cover, so the facade's
      // boards would stay blank there: show the dojo under the moon instead
      narrowArt={HAKKO_RYU_MOON_ART}
      kanji="稽古"
      eyebrow={<FormattedMessage id="page.schedule.hero.eyebrow" />}
      title={<FormattedMessage id="page.schedule.title" />}
      compactTitle
      wideArtFade={FACADE_WIDE_FADE}
      onArt={FITS_BOARDS && <WallBoards days={DAYS} />}
    />

    <Container maxWidth="lg">
      {/* ── 01. The training week ────────────────────────────────────────── */}
      <PageSection>
        <FadeIn>
          <SectionHeading
            number="01"
            title={<FormattedMessage id="page.schedule.week.title" />}
            kanji="稽古"
          />
          <Paragraphs ids={["page.schedule.description"]} />
        </FadeIn>

        <CardGrid size={{ xs: 12, sm: 6 }} stagger={GROUP_STAGGER}>
          {STUDENT_CATEGORIES.map((group) => (
            <GroupSummaryCard key={group} group={group} />
          ))}
        </CardGrid>

        {/* Where the boards of the cover don't show the timetable */}
        <Box sx={FITS_BOARDS ? timetableSx : undefined} data-testid="timetable">
          <CardGrid size={{ xs: 12, md: 4 }} stagger={DAY_STAGGER}>
            {DAYS.map(({ day, sessions }) => (
              <DayCard key={day} day={day} sessions={sessions} />
            ))}
          </CardGrid>
        </Box>
      </PageSection>
    </Container>

    {/* ── 02. Quote (moonlit valley band) ──────────────────────────────── */}
    <ArtBand src={valleyArt}>
      <SectionHeading number="02" />
      <ScheduleQuote />
    </ArtBand>

    <Container maxWidth="lg">
      <PageSection>
        <FadeIn>
          <ScheduleCta />
        </FadeIn>
      </PageSection>
    </Container>
  </>
);

export default Schedule;
