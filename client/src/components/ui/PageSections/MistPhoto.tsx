import { Box, Typography } from "@mui/material";

import BlurredUpImage from "@components/ui/Image/BlurredUpImage";

import { photoCaptionSx, photoFrameSx, photoSx } from "./PageSections.style";

export interface MistPhotoProps {
  lowQualitySrc: string;
  highQualitySrc: string;
  /** A few kanji under the photo */
  caption: string;
}

/** A studio photo melted into the page, over a soft moon glow */
const MistPhoto = ({
  lowQualitySrc,
  highQualitySrc,
  caption,
}: MistPhotoProps) => (
  <Box sx={photoFrameSx}>
    <BlurredUpImage
      lowQualitySrc={lowQualitySrc}
      highQualitySrc={highQualitySrc}
      // Illustrates the text beside it
      alt=""
      sx={photoSx}
      animate="none"
    />
    <Typography sx={photoCaptionSx} lang="ja">
      {caption}
    </Typography>
  </Box>
);

export default MistPhoto;
