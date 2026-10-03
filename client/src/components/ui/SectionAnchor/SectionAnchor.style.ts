import { SxProps, Theme } from "@mui/material";

import { PURPLE, PURPLE_ALPHA_08, TEXT_MUTED } from "@style/colorScheme";

export const SECTION_ANCHOR_CLASS = "section-anchor";

// Sized in ems, so the icon matches its heading's text
export const sectionAnchorSx: SxProps<Theme> = {
  flexShrink: 0,
  // The icons' glyphs fill only part of their box: a bit over 1em looks as tall
  // as the text
  fontSize: "1.2em",
  p: "0.15em",
  // Doesn't make the heading's line any taller
  my: "-0.15em",
  color: TEXT_MUTED,
  opacity: 0,
  transition: "opacity 0.2s ease, color 0.2s ease",
  "&:hover, &:focus-visible": {
    color: PURPLE,
    backgroundColor: PURPLE_ALPHA_08,
  },
  "&:focus-visible": { opacity: 1 },
  // Nothing hovers on touch screens: keep the anchor in sight
  "@media (hover: none)": { opacity: 0.6 },
};

// The checkmark shown once the link is copied
export const copiedSectionAnchorSx: SxProps<Theme> = {
  opacity: 1,
  color: PURPLE,
  "@media (hover: none)": { opacity: 1 },
};

/** Spread into a section heading: shows its anchor while hovered */
export const revealSectionAnchorSx = {
  // Clear of the page's top edge when scrolled to by its link
  scrollMarginTop: 24,
  [`&:hover .${SECTION_ANCHOR_CLASS}`]: { opacity: 1 },
};
