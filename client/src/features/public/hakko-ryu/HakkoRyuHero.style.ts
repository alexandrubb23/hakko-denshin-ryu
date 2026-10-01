import { SxProps, Theme } from "@mui/material";

import {
  COVER_HEIGHT,
  coverEyebrowSx,
  coverSubtitleSx,
  coverTitleSx,
  fadeMask,
  kanjiRuleSx,
  verticalKanjiSx,
} from "@style/art";
import { mergeSx } from "@utils/sx";

import { COMPACT_ARC_SIZE } from "@components/ui/ArcNavMenu/ArcNavMenu.style";
import { menuOnArt } from "@components/ui/ArcNavMenu/moonArt";

import { DOJO_MOON_ART } from "./dojoArt";

// Wide screens: the art is one screen tall, flush right, lowered a little so
// the arc menu has room above the moon
const WIDE_ART_HEIGHT = COVER_HEIGHT;
const WIDE_ART_TOP = "8dvh";
const WIDE_ART_FADE = [
  "linear-gradient(180deg, transparent 0%, black 24%, black 70%, transparent 100%)",
  // The painting's left half is empty sky; let it dissolve gradually
  "linear-gradient(90deg, transparent 0%, black 45%)",
].join(", ");
// Narrow screens: the art follows the menu's moon; fade every edge
const NARROW_ART_FADE = [
  "linear-gradient(180deg, transparent 0%, black 18%, black 70%, transparent 100%)",
  "linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)",
].join(", ");

export const heroSx: SxProps<Theme> = {
  position: "relative",
  // The art is painted behind the content, inside this stacking context
  isolation: "isolate",
  overflow: "hidden",
  minHeight: COVER_HEIGHT,
  display: "flex",
  flexDirection: "column",
  alignItems: { xs: "center", lg: "stretch" },
  justifyContent: { lg: "flex-end" },
  mx: -2,
  mt: -2,
  mb: { xs: 8, md: 12 },
  pt: { xs: 10, lg: 0 },
};

export const heroMenuSx: SxProps<Theme> = (theme) => ({
  ...COMPACT_ARC_SIZE,
  mt: 4,
  // Leave the dojo, painted below the moon, in view
  mb: "clamp(200px, 62vw, 340px)",
  [theme.breakpoints.up("lg")]: {
    ...menuOnArt(DOJO_MOON_ART, "left", WIDE_ART_HEIGHT, WIDE_ART_TOP),
    "--arc-radius": "clamp(90px, 16dvh, 160px)",
    "--arc-gap": "40px",
    "--arc-item-size": "clamp(1.1rem, 2.6dvh, 1.6rem)",
    m: 0,
  },
});

export const heroArtSx: SxProps<Theme> = (theme) => ({
  ...fadeMask(NARROW_ART_FADE),
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

export const heroVerticalKanjiSx = mergeSx(verticalKanjiSx, {
  display: { xs: "none", lg: "block" },
  fontSize: "clamp(2.5rem, 3.6vw, 4rem)",
  letterSpacing: "0.12em",
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

export const heroRuleSx = mergeSx(kanjiRuleSx, {
  mt: { xs: 3, md: 4 },
  mx: { xs: "auto", lg: 0 },
  fontSize: "clamp(0.95rem, 1.3vw, 1.3rem)",
});
