import { Typography } from "@mui/material";

import { watermarkSx } from "./KanjiWatermark.style";

/** Oversized decorative kanji behind a page; the parent must be `position: relative`. */
const KanjiWatermark = ({ kanji }: { kanji: string }) => (
  <Typography sx={watermarkSx} aria-hidden>
    {kanji}
  </Typography>
);

export default KanjiWatermark;
