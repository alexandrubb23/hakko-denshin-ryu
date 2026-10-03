import { useState } from "react";
import { useIntl } from "react-intl";

import { Box, Skeleton, Tab, Tabs, Typography } from "@mui/material";

import type { Suite } from "@api/techniques";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import { useTechniques } from "@features/public/techniques/useTechniques";
import { SKELETON_SX } from "@style/tokens";

import { SYLLABUS_GRADES, gradeName, numberGroups } from "./syllabusData";
import SyllabusCategory from "./SyllabusCategory";
import {
  gradeHeaderSx,
  gradeMetaKanjiSx,
  gradeMetaSx,
  gradeTitleSx,
  syllabusErrorSx,
  syllabusTabKanjiSx,
  syllabusTabsSx,
} from "./Syllabus.style";

/** One grade's categories, its techniques numbered through the whole grade */
const GradePanel = ({ suite }: { suite: Suite }) => {
  const grade = SYLLABUS_GRADES[suite.id];
  // The first category starts open
  const [open, setOpen] = useState(
    () => new Set(suite.groups.slice(0, 1).map((group) => group.id)),
  );

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  const { starts, total } = numberGroups(suite.groups);

  return (
    <Box
      role="tabpanel"
      id={`${suite.id}-panel`}
      aria-labelledby={`${suite.id}-tab`}
    >
      <Box sx={gradeHeaderSx}>
        <Typography component="h3" sx={gradeTitleSx}>
          <FormattedMessage
            id="page.hakko-ryu.syllabus.grade-title"
            values={{ grade: gradeName(suite) }}
          />
        </Typography>
        <Typography sx={gradeMetaSx}>
          {grade && (
            <>
              <Box component="span" sx={gradeMetaKanjiSx} lang="ja">
                {grade.kanji}
              </Box>
              {" · "}
              <FormattedMessage
                id="page.hakko-ryu.grades.dan"
                values={{ n: grade.n }}
              />
              {" · "}
            </>
          )}
          <FormattedMessage
            id="page.hakko-ryu.syllabus.count"
            values={{ count: total }}
          />
        </Typography>
      </Box>

      {suite.groups.map((group, i) => (
        <SyllabusCategory
          key={group.id}
          group={group}
          start={starts[i]}
          expanded={open.has(group.id)}
          onToggle={() => toggle(group.id)}
        />
      ))}
    </Box>
  );
};

/** The Shodan–Yondan techniques, one tab per grade */
const Syllabus = () => {
  const intl = useIntl();
  const { data: suites, isLoading, isError } = useTechniques();
  const [activeIndex, setActiveIndex] = useState(0);

  if (isError) {
    return (
      <Typography sx={syllabusErrorSx}>
        <FormattedMessage id="page.techniques.error" />
      </Typography>
    );
  }

  if (isLoading) {
    return <Skeleton variant="rounded" height={420} sx={SKELETON_SX} />;
  }

  if (!suites?.length) return null;

  const suite = suites[activeIndex] ?? suites[0];

  return (
    <>
      <Tabs
        value={activeIndex}
        onChange={(_, index: number) => setActiveIndex(index)}
        aria-label={intl.formatMessage({ id: "page.hakko-ryu.syllabus.tabs" })}
        variant="scrollable"
        scrollButtons={false}
        sx={syllabusTabsSx}
      >
        {suites.map((item) => {
          const grade = SYLLABUS_GRADES[item.id];
          return (
            <Tab
              key={item.id}
              id={`${item.id}-tab`}
              aria-controls={`${item.id}-panel`}
              label={
                <>
                  {grade && (
                    <Box component="span" sx={syllabusTabKanjiSx} lang="ja">
                      {grade.kanji}
                    </Box>
                  )}
                  {gradeName(item)}
                </>
              }
            />
          );
        })}
      </Tabs>

      {/* Keyed so each grade opens with its first category */}
      <GradePanel key={suite.id} suite={suite} />
    </>
  );
};

export default Syllabus;
