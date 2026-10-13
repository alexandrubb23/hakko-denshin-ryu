import { Box, useMediaQuery, type SxProps, type Theme } from "@mui/material";

import { blurUpStyle } from "@components/ui/Image/blurUp.style";
import { ABOVE_TITLE_FROM } from "@components/ui/MoonCover/MoonCover.style";
import useProgressiveImg from "@hooks/useProgressiveImg";
import { mergeSx } from "@utils/sx";

import { coverPhotoSx } from "./CoverPhoto.style";

interface Props {
  /** A photo on a black studio backdrop, its subject in the middle */
  src: string;
  /** A tiny copy of `src`, shown blurred while `src` loads */
  lowQualitySrc: string;
  /** The photo's shape; `src` is cropped to it */
  aspectRatio?: string;
  /** Placement or size, e.g. `mr` to move it away from the menu */
  sx?: SxProps<Theme>;
}

/**
 * A photo for `MoonCover`'s `aboveTitle`, setting the scene for the title
 * below it: as tall as the space, its edges melting into the cover
 */
const CoverPhoto = ({
  src,
  lowQualitySrc,
  aspectRatio = "3 / 2",
  sx,
}: Props) => {
  // Hidden on narrower screens: only fetch the full photo where it shows
  const shown = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up(ABOVE_TITLE_FROM)
  );
  const [currentSrc, { blur }] = useProgressiveImg({
    lowQualitySrc,
    highQualitySrc: shown ? src : "",
  });

  return (
    <Box
      component="img"
      src={currentSrc}
      alt=""
      // Not fetched while hidden (`display: none`)
      loading="lazy"
      sx={mergeSx(coverPhotoSx(aspectRatio), blurUpStyle(blur), sx)}
    />
  );
};

export default CoverPhoto;
