import { Box, Container, Grid, Typography } from "@mui/material";
import { useMemo } from "react";

import FadeIn from "@components/ui/FadeIn/FadeIn";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import KanjiWatermark from "@components/ui/KanjiWatermark/KanjiWatermark";
import PublicPageHeader from "@components/ui/PublicPageHeader/PublicPageHeader";
import { getSessionsByDay } from "@constants/trainingSchedule";
import { STUDENT_CATEGORIES } from "@hakko/core";

import DayCard from "./DayCard";
import GroupSummaryCard from "./GroupSummaryCard";
import ScheduleCta from "./ScheduleCta";
import ScheduleQuote from "./ScheduleQuote";
import useGroupFilter from "./useGroupFilter";

import { groupHintSx, pageSx } from "./Schedule.style";

// Fade-in delays (seconds): base offset, then per-card stagger
const BASE_DELAY = 0.05;
const GROUP_STAGGER = 0.05;
const DAY_STAGGER = 0.08;
const SECTION_DELAY = 0.1;

const Schedule = () => {
  const { selected, toggle } = useGroupFilter();
  const days = useMemo(() => getSessionsByDay(selected), [selected]);

  return (
    <Box sx={pageSx}>
      <KanjiWatermark kanji="稽" />

      <Container maxWidth="lg" disableGutters>
        <PublicPageHeader
          titleId="page.schedule.title"
          kanji="稽古"
          descriptionId="page.schedule.description"
        />

        {/* ── Groups ──────────────────────────────────────────────────────── */}
        <Grid container spacing={2}>
          {STUDENT_CATEGORIES.map((group, idx) => (
            <Grid key={group} size={{ xs: 12, sm: 6 }}>
              <FadeIn delay={BASE_DELAY + idx * GROUP_STAGGER} fullHeight>
                <GroupSummaryCard
                  group={group}
                  isSelected={selected === group}
                  isDimmed={!!selected && selected !== group}
                  onToggle={toggle}
                />
              </FadeIn>
            </Grid>
          ))}
        </Grid>
        <Typography sx={groupHintSx}>
          <FormattedMessage
            id={
              selected
                ? "page.schedule.filter.reset"
                : "page.schedule.filter.hint"
            }
          />
        </Typography>

        {/* ── Weekly timetable (re-keyed so cards fade in on filter change) ── */}
        <Grid
          key={selected ?? "all"}
          container
          spacing={3}
          justifyContent="center"
        >
          {days.map(({ day, sessions }, idx) => (
            <Grid key={day} size={{ xs: 12, md: 4 }}>
              <FadeIn delay={BASE_DELAY + idx * DAY_STAGGER} fullHeight>
                <DayCard day={day} sessions={sessions} />
              </FadeIn>
            </Grid>
          ))}
        </Grid>

        <FadeIn delay={SECTION_DELAY}>
          <ScheduleQuote />
        </FadeIn>

        <FadeIn delay={SECTION_DELAY}>
          <ScheduleCta />
        </FadeIn>
      </Container>
    </Box>
  );
};

export default Schedule;
