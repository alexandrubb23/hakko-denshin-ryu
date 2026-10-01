import { Box, type SxProps, type Theme } from "@mui/material";

import { mergeSx } from "@utils/sx";

import { kanjiRuleSx } from "./KanjiRule.style";

interface Props {
  /** Spacing and alignment within the cover */
  sx?: SxProps<Theme>;
}

/** 八光伝心流柔術, the school's name, between two thin rules */
const KanjiRule = ({ sx }: Props) => (
  <Box sx={mergeSx(kanjiRuleSx, sx)} lang="ja" aria-hidden>
    八光伝心流柔術
  </Box>
);

export default KanjiRule;
