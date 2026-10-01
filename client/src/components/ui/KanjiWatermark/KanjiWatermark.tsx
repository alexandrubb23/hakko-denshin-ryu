import { SxProps, Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";

import { mergeSx } from "@utils/sx";

import { watermarkSx } from "./KanjiWatermark.style";

interface Props {
  kanji: string;
  /** Overrides the default size, opacity and position */
  sx?: SxProps<Theme>;
}

/** Oversized decorative kanji behind a page; the parent must be `position: relative`. */
const KanjiWatermark = ({ kanji, sx }: Props) => (
  <Typography sx={mergeSx(watermarkSx, sx)} aria-hidden>
    {kanji}
  </Typography>
);

export default KanjiWatermark;
