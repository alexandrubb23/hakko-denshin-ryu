import { SxProps, Theme } from "@mui/material";

import { fadeMask } from "@style/art";

// Melts the photo's black studio backdrop into the cover
const COVER_PHOTO_FADE =
  "radial-gradient(ellipse 50% 50% at 50% 50%, black 45%, transparent 100%)";

export const coverPhotoSx = (aspectRatio: string): SxProps<Theme> => ({
  display: "block",
  // A little taller than the space above the title, its foot fading out
  // behind the eyebrow; its width follows the photo
  height: "120%",
  width: "auto",
  aspectRatio,
  objectFit: "cover",
  ml: "150px",
  // Wider than the space on shorter screens: it overflows to the left,
  // keeping its edge by the menu
  flexShrink: 0,
  ...fadeMask(COVER_PHOTO_FADE),
});
