import { Box, Typography } from "@mui/material";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import KanjiCard from "@components/ui/PageSections/KanjiCard";
import { listResetSx } from "@style/list";

import type { IntlMessageID } from "i18n/messages";

import GradeRank, { Grade, Rank } from "./GradeRank";
import {
  gradeBeltFrameSx,
  gradeBeltSx,
  gradeCardSx,
  gradeIndexSx,
  gradeSubtitleSx,
  gradeTitleSx,
} from "./GradingSystem.style";

export interface Tier {
  title: string;
  kanji: string;
  /** Kanji numeral above the title: the tier's place in the path */
  index: string;
  subtitleId: IntlMessageID;
  belt: string;
  /** Whether its ranks count in kyu or dan */
  grade: Grade;
  ranks: Rank[];
}

/** One circle of rank under its embroidered belt, its ranks listed in order */
const GradeCard = ({
  title,
  kanji,
  index,
  subtitleId,
  belt,
  grade,
  ranks,
}: Tier) => (
  <KanjiCard kanji={kanji} sx={gradeCardSx}>
    <Box className="grade-belt-frame" sx={gradeBeltFrameSx}>
      {/* Illustrates the title below it */}
      <Box
        component="img"
        className="grade-belt"
        src={belt}
        alt=""
        loading="lazy"
        sx={gradeBeltSx}
      />
    </Box>

    <Typography sx={gradeIndexSx} lang="ja" aria-hidden>
      {index}
    </Typography>
    <Typography component="h3" sx={gradeTitleSx}>
      {title}
    </Typography>
    <Typography sx={gradeSubtitleSx}>
      <FormattedMessage id={subtitleId} />
    </Typography>

    <Box component="ol" sx={listResetSx}>
      {ranks.map((rank) => (
        <GradeRank key={rank.name} grade={grade} {...rank} />
      ))}
    </Box>
  </KanjiCard>
);

export default GradeCard;
