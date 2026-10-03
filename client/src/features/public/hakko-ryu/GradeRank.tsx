import { Box, Typography } from "@mui/material";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";

import {
  gradeRankKanjiSx,
  gradeRankNameSx,
  gradeRankNoteSx,
  gradeRankSx,
} from "./GradingSystem.style";

export type Grade = "kyu" | "dan";

export interface Rank {
  name: string;
  kanji: string;
  /** The rank's number within its grade: 6th kyu, 1st dan… */
  n: number;
}

interface Props extends Rank {
  grade: Grade;
}

/** One rank: its romaji and ordinal grade beside its kanji */
const GradeRank = ({ name, kanji, n, grade }: Props) => (
  <Box component="li" sx={gradeRankSx}>
    <Box>
      <Typography sx={gradeRankNameSx}>{name}</Typography>
      <Typography sx={gradeRankNoteSx}>
        <FormattedMessage
          id={`page.hakko-ryu.grades.${grade}`}
          values={{ n }}
        />
      </Typography>
    </Box>
    <Typography sx={gradeRankKanjiSx} lang="ja">
      {kanji}
    </Typography>
  </Box>
);

export default GradeRank;
