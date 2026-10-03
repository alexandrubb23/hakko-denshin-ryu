import { Box, SxProps, Theme, Typography } from "@mui/material";

import { mergeSx } from "@utils/sx";

import {
  kanjiCardKanjiSx,
  kanjiCardSx,
  kanjiCardTitleSx,
} from "./PageSections.style";

interface Props {
  /** Glows, oversized, in the card's corner */
  kanji: string;
  title?: React.ReactNode;
  /** Merged over the card's own style */
  sx?: SxProps<Theme>;
  children: React.ReactNode;
}

const KanjiCard = ({ kanji, title, sx, children }: Props) => (
  <Box sx={mergeSx(kanjiCardSx, sx)}>
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
