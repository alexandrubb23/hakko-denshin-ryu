import { Typography } from "@mui/material";

import {
  sectionKanjiSx,
  sectionNumberSx,
  sectionTitleSx,
} from "./PageSections.style";

interface Props {
  /** "01", "05 & 06"… shown above the title */
  number: string;
  title?: React.ReactNode;
  kanji?: string;
}

const SectionHeading = ({ number, title, kanji }: Props) => (
  <>
    <Typography sx={sectionNumberSx}>{number}</Typography>
    {title && (
      <Typography component="h2" sx={sectionTitleSx}>
        {title}
      </Typography>
    )}
    {kanji && (
      <Typography sx={sectionKanjiSx} lang="ja">
        {kanji}
      </Typography>
    )}
  </>
);

export default SectionHeading;
