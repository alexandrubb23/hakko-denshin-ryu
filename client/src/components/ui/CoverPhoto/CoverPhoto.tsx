import { Box, type SxProps, type Theme } from "@mui/material";

import { mergeSx } from "@utils/sx";

import { coverPhotoSx } from "./CoverPhoto.style";

interface Props {
  /** A photo on a black studio backdrop, its subject in the middle */
  src: string;
  /** The photo's shape; `src` is cropped to it */
  aspectRatio?: string;
  /** Placement or size, e.g. `mr` to move it away from the menu */
  sx?: SxProps<Theme>;
}

/**
 * A photo for `MoonCover`'s `aboveTitle`, setting the scene for the title
 * below it: as tall as the space, its edges melting into the cover
 */
const CoverPhoto = ({ src, aspectRatio = "3 / 2", sx }: Props) => (
  <Box
    component="img"
    src={src}
    alt=""
    // Hidden below `lg`: lazy images under `display: none` aren't fetched
    loading="lazy"
    sx={mergeSx(coverPhotoSx(aspectRatio), sx)}
  />
);

export default CoverPhoto;
