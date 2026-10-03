import { Box, Typography } from "@mui/material";

import SectionAnchor from "@components/ui/SectionAnchor/SectionAnchor";
import { revealSectionAnchorSx } from "@components/ui/SectionAnchor/SectionAnchor.style";

import {
  sectionKanjiSx,
  sectionNumberSx,
  sectionTitleAnchorSx,
  sectionTitleRowSx,
  sectionTitleSx,
} from "./PageSections.style";

interface Props {
  /** The section's URL fragment, e.g. "origins" for #origins */
  id: string;
  /** "01", "05 & 06"… shown above the title */
  number: string;
  title?: React.ReactNode;
  kanji?: string;
}

const SectionHeading = ({ id, number, title, kanji }: Props) => (
  <Box id={id} sx={revealSectionAnchorSx}>
    <Typography sx={sectionNumberSx}>
      {number}
      {/* After the number's rule when there is no title to sit beside */}
      {!title && <SectionAnchor id={id} sx={{ order: 1 }} />}
    </Typography>
    {title && (
      <Box sx={sectionTitleRowSx}>
        <Typography component="h2" sx={sectionTitleSx}>
          {title}
        </Typography>
        <SectionAnchor id={id} sx={sectionTitleAnchorSx} />
      </Box>
    )}
    {kanji && (
      <Typography sx={sectionKanjiSx} lang="ja">
        {kanji}
      </Typography>
    )}
  </Box>
);

export default SectionHeading;
