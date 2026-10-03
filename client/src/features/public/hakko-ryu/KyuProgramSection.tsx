import { useIntl } from "react-intl";

import { Box, Typography } from "@mui/material";

import { useKyuProgram } from "@features/public/kyu-program/useKyuProgram";
import { stripDiacritics } from "@utils/string";

import { RankOrdinal } from "./GradeRank";
import { kyuGrade } from "./kyuProgramData";
import ProgramSection from "./ProgramSection";
import { legendDotSx, legendItemSx, legendSx } from "./Syllabus.style";

/** Kihon waza in full, their henka (variations) stepped back */
const KihonLegend = () => (
  <Box sx={legendSx}>
    <Typography sx={legendItemSx}>
      <Box component="span" sx={legendDotSx(true)} />
      Kihon waza
    </Typography>
    <Typography sx={legendItemSx}>
      <Box component="span" sx={legendDotSx(false)} />
      Henka
    </Typography>
  </Box>
);

/** The five coloured belts, one tab per kyu level */
const KyuProgramSection = () => {
  const intl = useIntl();

  return (
    <ProgramSection
      query={useKyuProgram()}
      // The level is kept in the URL: ?level=3e-kyu
      paramKey="level"
      errorId="page.kyu-program.error"
      tabsLabelId="page.hakko-ryu.kyu.tabs"
      toTab={(level) => {
        const grade = kyuGrade(level);
        return {
          kanji: grade?.rank?.kanji,
          belt: grade?.src,
          label: grade?.rank ? (
            <RankOrdinal grade="kyu" n={grade.rank.n} />
          ) : (
            level.shortName
          ),
        };
      }}
      toPanel={(level) => {
        const grade = kyuGrade(level);
        return {
          // The display font has no diacritics (Romanian belt names)
          title: grade
            ? stripDiacritics(intl.formatMessage({ id: grade.nameId }))
            : level.shortName,
          rank: grade?.rank,
          grade: "kyu",
          groups: level.groups,
          belt: grade?.src,
          children: <KihonLegend />,
        };
      }}
    />
  );
};

export default KyuProgramSection;
