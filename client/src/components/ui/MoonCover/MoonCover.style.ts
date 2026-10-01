import { SxProps, Theme } from "@mui/material";

import {
  COVER_HEIGHT,
  NARROW_COVER_ART_FADE,
  coverEyebrowSx,
  coverSubtitleSx,
  coverTaglineSx,
  coverTitleSx,
  coverVerticalKanjiSx,
  coverWrapperSx,
  fadeMask,
} from "@style/art";
import { mergeSx } from "@utils/sx";

import { COMPACT_ARC_SIZE } from "@components/ui/ArcNavMenu/ArcNavMenu.style";
import { type MoonArt, menuOnArt } from "@components/ui/ArcNavMenu/moonArt";

// Wide screens: the art is one screen tall and flush right. A moon painted
// high up is lowered, with the art, so the arc menu has room above it.
const MIN_MOON_TOP = 0.3; // of the screen height
const wideArtTop = (art: MoonArt) =>
  `${(Math.max(0, MIN_MOON_TOP - art.moonY) * 100).toFixed(2)}dvh`;
const WIDE_ART_FADE = [
  "linear-gradient(180deg, transparent 0%, black 24%, black 70%, transparent 100%)",
  // The painting's left half is empty sky; let it dissolve gradually
  "linear-gradient(90deg, transparent 0%, black 45%)",
].join(", ");

export const heroSx = mergeSx(coverWrapperSx, {
  minHeight: COVER_HEIGHT,
  display: "flex",
  flexDirection: "column",
  alignItems: { xs: "center", lg: "stretch" },
  justifyContent: { lg: "flex-end" },
  mx: -2,
  mt: -2,
  mb: { xs: 8, md: 12 },
  pt: { xs: 10, lg: 0 },
});

export const heroMenuSx =
  (art: MoonArt): SxProps<Theme> =>
  (theme) => ({
    ...COMPACT_ARC_SIZE,
    mt: 4,
    // Leave the scene painted below the moon in view
    mb: "clamp(200px, 62vw, 340px)",
    [theme.breakpoints.up("lg")]: {
      ...menuOnArt(art, "left", COVER_HEIGHT, wideArtTop(art)),
      "--arc-radius": "clamp(90px, 16dvh, 160px)",
      "--arc-gap": "40px",
      "--arc-item-size": "clamp(1.1rem, 2.6dvh, 1.6rem)",
      m: 0,
    },
  });

export const heroArtSx: SxProps<Theme> = (theme) => ({
  ...fadeMask(NARROW_COVER_ART_FADE),
  [theme.breakpoints.up("lg")]: fadeMask(WIDE_ART_FADE),
});

export const heroContentSx: SxProps<Theme> = {
  position: "relative",
  zIndex: 1,
  width: "100%",
  maxWidth: "lg",
  mx: "auto",
  px: { xs: 3, md: 6 },
  pb: { lg: 10 },
  display: "flex",
  justifyContent: { xs: "center", lg: "flex-start" },
  alignItems: "flex-start",
  gap: { xs: 3, md: 5 },
  textAlign: { xs: "center", lg: "left" },
};

export const heroVerticalKanjiSx = mergeSx(coverVerticalKanjiSx, {
  display: { xs: "none", lg: "block" },
  mt: 1,
});

export const heroEyebrowSx = mergeSx(coverEyebrowSx, {
  fontSize: "clamp(0.72rem, 1vw, 0.9rem)",
});

export const heroTitleSx = mergeSx(coverTitleSx, {
  fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
  fontWeight: 400,
  lineHeight: 1.05,
});

export const heroSubtitleSx = mergeSx(coverSubtitleSx, {
  fontSize: "clamp(1.1rem, 2.2vw, 2.2rem)",
  letterSpacing: "0.4em",
});

export const heroRuleSx: SxProps<Theme> = {
  mt: { xs: 3, md: 4 },
  mx: { xs: "auto", lg: 0 },
};

export const heroTaglineSx = mergeSx(coverTaglineSx, {
  textAlign: { xs: "center", lg: "left" },
});
