import { Box, Typography } from "@mui/material";

import {
  kanjiCardKanjiSx,
  kanjiCardSx,
  kanjiCardTitleSx,
} from "./PageSections.style";

interface Props {
  /** Glows, oversized, in the card's corner */
  kanji: string;
  title?: React.ReactNode;
  children: React.ReactNode;
}

const KanjiCard = ({ kanji, title, children }: Props) => (
  <Box sx={kanjiCardSx}>
    <Box sx={kanjiCardKanjiSx} lang="ja" aria-hidden>
      {kanji}
    </Box>
    {title && (
      <Typography component="h3" sx={kanjiCardTitleSx}>
        {title}
      </Typography>
    )}
    {children}
  </Box>
);

export default KanjiCard;
