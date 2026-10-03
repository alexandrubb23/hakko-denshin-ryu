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
import {
  type MoonArt,
  artWidth,
  menuOnArt,
} from "@components/ui/ArcNavMenu/moonArt";

// The arc menu's size on wide screens
const WIDE_ARC_RADIUS = "clamp(90px, 16dvh, 160px)";
const WIDE_ARC_GAP = "40px";
// Room for the menu's longest labels (e.g. "Autentificare"), left of its arc
const MENU_LABELS_WIDTH = "110px";

// Wide screens: the art is one screen tall and flush right. A moon painted
// high up is lowered, with the art, so the arc menu has room above it.
const MIN_MOON_TOP = 0.3; // of the screen height
const wideArtTop = ({ moonY, minMoonTop = MIN_MOON_TOP }: MoonArt) =>
  `${(Math.max(0, minMoonTop - moonY) * 100).toFixed(2)}dvh`;

/**
 * Mask for the art on wide screens; `bottom` sets how its foot fades out,
 * e.g. later, to keep details painted low on the art clear
 */
export const wideArtFade = (bottom = "black 70%, transparent 100%") =>
  [
    `linear-gradient(180deg, transparent 0%, black 24%, ${bottom})`,
    // The painting's left half is empty sky; let it dissolve gradually
    "linear-gradient(90deg, transparent 0%, black 45%)",
  ].join(", ");
const WIDE_ART_FADE = wideArtFade();

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
  (art: MoonArt, onArtBelowMenu: boolean): SxProps<Theme> =>
  (theme) => ({
    ...COMPACT_ARC_SIZE,
    mt: 4,
    // Leave the scene painted below the moon in view (below the `onArt`
    // content, when it follows the menu)
    mb: onArtBelowMenu ? 4 : "clamp(200px, 62vw, 340px)",
    [theme.breakpoints.up("lg")]: {
      ...menuOnArt(art, "left", COVER_HEIGHT, wideArtTop(art)),
      "--arc-radius": WIDE_ARC_RADIUS,
      "--arc-gap": WIDE_ARC_GAP,
      "--arc-item-size": "clamp(1.1rem, 2.6dvh, 1.6rem)",
      m: 0,
    },
  });

export const heroArtSx =
  (wideFade = WIDE_ART_FADE): SxProps<Theme> =>
  (theme) => ({
    ...fadeMask(NARROW_COVER_ART_FADE),
    [theme.breakpoints.up("lg")]: fadeMask(wideFade),
  });

// With a separate narrow painting, each shows on its own side of `lg`
export const wideOnlySx: SxProps<Theme> = {
  display: { xs: "none", lg: "block" },
};
export const narrowOnlySx: SxProps<Theme> = { display: { lg: "none" } };

// Lies exactly over the art on wide screens; its children are placed in
// fractions of the art, and can size themselves in `cqh` (1% of its height).
// Below `lg` it is hidden, or follows the menu as a plain block.
export const heroOnArtSx =
  (art: MoonArt, onArtBelowMenu: boolean): SxProps<Theme> =>
  (theme) => ({
    position: "relative",
    zIndex: 1,
    [theme.breakpoints.down("lg")]: onArtBelowMenu
      ? { width: "100%", px: 2.5, mb: "clamp(160px, 50vw, 300px)" }
      : { display: "none" },
    [theme.breakpoints.up("lg")]: {
      position: "absolute",
      right: 0,
      top: wideArtTop(art),
      width: artWidth(art, COVER_HEIGHT),
      height: COVER_HEIGHT,
      containerType: "size",
      // It covers the whole art, menu included: let clicks through to the
      // menu; content that needs the pointer opts back in
      pointerEvents: "none",
    },
  });

/**
 * How far from the cover's right edge the arc menu reaches on wide screens:
 * the moon's centre on the art, then its radius, the arc and the labels
 */
const menuReach = (art: MoonArt) =>
  `calc(${artWidth(art, COVER_HEIGHT)} * ${(1 - art.moonX).toFixed(4)} + ${COVER_HEIGHT} * ${(art.moonDiameter / 2).toFixed(4)} + ${WIDE_ARC_RADIUS} + ${WIDE_ARC_GAP} + ${MENU_LABELS_WIDTH})`;

// The dark space above the title, between the cover's top and its content;
// wide screens only. It takes only the room left over: its content is laid
// over it (`heroAboveTitleContentSx`), so even a large photo can't grow the
// cover and push the title down
export const heroAboveTitleSx: SxProps<Theme> = {
  display: { xs: "none", lg: "block" },
  position: "relative",
  // Over the art, which reaches this far left on some covers
  zIndex: 1,
  // No pointer events: the arc menu, later in the cover, stays clickable
  pointerEvents: "none",
  flex: 1,
  minHeight: 0,
  mt: 10,
  mb: 2,
};

// Fills the space from the cover's left edge up to the menu's labels, its
// content against the menu
export const heroAboveTitleContentSx = (art: MoonArt): SxProps<Theme> => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: menuReach(art),
  display: "flex",
  justifyContent: "flex-end",
});

export const heroContentSx: SxProps<Theme> = {
  position: "relative",
  zIndex: 1,
  // Its own layer from the start: otherwise Safari composites it only while
  // a menu link's hover scale animates beneath it, and the title flashes as
  // the layer comes and goes
  willChange: "transform",
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

// For longer titles, or covers whose art holds content of its own
export const heroCompactTitleSx = mergeSx(heroTitleSx, {
  fontSize: "clamp(2.2rem, 7vw, 3.6rem)",
  // Long titles wrap rather than run into the painting
  maxWidth: { lg: 480 },
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
  // Keep clear of the painting on the right
  maxWidth: { lg: 560 },
});

export const heroActionsSx: SxProps<Theme> = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: { xs: "center", lg: "flex-start" },
  gap: 2,
  mt: { xs: 4, md: 5 },
};
