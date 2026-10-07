import type { SxProps, Theme } from "@mui/material";

import {
  bodyTextSx,
  cardSurfaceSx,
  kanjiCardKanjiSx,
  kanjiCardSx,
  kanjiCardTitleSx,
  photoFrameSx,
} from "@components/ui/PageSections/PageSections.style";
import { DISPLAY_FONT } from "@style/art";
import {
  BORDER_COLOR,
  BORDER_HOVER,
  PURPLE,
  PURPLE_ALPHA_12,
  PURPLE_ALPHA_30,
  TEXT_MUTED,
  TEXT_PRIMARY,
  TEXT_SUBTLE,
} from "@style/colorScheme";
import { mergeSx } from "@utils/sx";

// ─── About: description, poster and facts ─────────────────────────────────────

// Keeps the admin's line breaks
export const descriptionSx: SxProps<Theme> = mergeSx(bodyTextSx, {
  whiteSpace: "pre-line",
});

// The poster at its own shape, over the pages' soft moon glow
export const posterLinkSx: SxProps<Theme> = mergeSx(photoFrameSx, {
  display: "block",
  mb: 3,
});

export const posterSx: SxProps<Theme> = {
  position: "relative",
  display: "block",
  width: "100%",
  borderRadius: 3,
  border: `1px solid ${BORDER_COLOR}`,
  transition: "border-color 0.3s ease",
  "a:hover > &": { borderColor: BORDER_HOVER },
};

export const factsSx: SxProps<Theme> = {
  ...cardSurfaceSx,
  p: { xs: 2.5, md: 3 },
  display: "flex",
  flexDirection: "column",
  gap: 2.5,
};

export const factRowSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "flex-start",
  gap: 2,
};

// A purple disc around each fact's icon
export const factIconSx: SxProps<Theme> = {
  flexShrink: 0,
  display: "grid",
  placeItems: "center",
  width: 40,
  height: 40,
  borderRadius: "50%",
  backgroundColor: PURPLE_ALPHA_12,
  border: `1px solid ${PURPLE_ALPHA_30}`,
  color: PURPLE,
  "& svg": { fontSize: 20 },
};

export const factLabelSx: SxProps<Theme> = {
  fontSize: "0.7rem",
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: TEXT_SUBTLE,
  padding: 0,
};

export const factValueSx: SxProps<Theme> = {
  color: TEXT_PRIMARY,
  fontWeight: 500,
  lineHeight: 1.5,
  padding: 0,
};

export const factNoteSx: SxProps<Theme> = {
  fontSize: "0.85rem",
  color: TEXT_MUTED,
  padding: 0,
  "& a": {
    color: PURPLE,
    textDecoration: "none",
    "&:hover": { textDecoration: "underline" },
  },
};

// ─── Programme: a card per session ────────────────────────────────────────────

export const sessionCardSx: SxProps<Theme> = mergeSx(kanjiCardSx, {
  p: { xs: 3, md: 3.5 },
});

export const sessionKanjiSx = kanjiCardKanjiSx;

export const sessionDaySx: SxProps<Theme> = {
  fontSize: "0.75rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: PURPLE,
  mb: 1.5,
  padding: 0,
};

export const sessionWeekdaySx: SxProps<Theme> = mergeSx(kanjiCardTitleSx, {
  fontSize: "clamp(1.5rem, 2.6vw, 1.9rem)",
  mb: 0.5,
});

export const sessionDateSx: SxProps<Theme> = {
  color: TEXT_MUTED,
  padding: 0,
};

export const sessionDividerSx: SxProps<Theme> = {
  borderColor: BORDER_COLOR,
  my: 2.5,
  // Clear of the corner kanji
  width: "60%",
};

export const sessionTimeSx: SxProps<Theme> = {
  fontFamily: DISPLAY_FONT,
  fontSize: { xs: "1.5rem", md: "1.7rem" },
  fontVariantNumeric: "tabular-nums",
  letterSpacing: "0.04em",
  color: TEXT_PRIMARY,
  lineHeight: 1.2,
  padding: 0,
};

export const sessionNoteSx: SxProps<Theme> = {
  fontSize: "0.85rem",
  color: TEXT_SUBTLE,
  mt: 0.75,
  padding: 0,
};

// Programme cards: three to a row on wide screens
export const SESSION_CARD_SIZE = { xs: 12, sm: 6, md: 4 } as const;
