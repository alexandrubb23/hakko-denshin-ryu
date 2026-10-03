import { SxProps, Theme } from "@mui/material";

import gardenArt from "@assets/images/senshinkan-garden.webp";
import {
  artBandSx,
  pullQuoteSx,
  quoteRuleSx,
} from "@components/ui/PageSections/PageSections.style";
import {
  DARK_BG,
  DARK_BG_ALPHA_20,
  DARK_BG_ALPHA_55,
  TEXT_MUTED,
} from "@style/colorScheme";
import { mergeSx } from "@utils/sx";

// ─── Cover photo ──────────────────────────────────────────────────────────────

// Keeps the raised hand clear of the menu's labels: `ml` places the photo
// when it's wider than the space, `mr` when it fits
export const coverPhotoSx: SxProps<Theme> = { ml: "50px", mr: "100px" };

// ─── 01. About (two columns of text) ──────────────────────────────────────────

export const aboutColumnsSx: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
  columnGap: { md: 6 },
};

// ─── Bridge: the old ways joined the new (over the garden painting) ───────────

// An art band with its content centred over the painting
export const bridgeSx = mergeSx(artBandSx(gardenArt), {
  minHeight: { xs: "70vh", md: "90vh" },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  px: { xs: 3, md: 6 },
  py: { xs: 8, md: 12 },
  // The moonlit garden, dimmed and darkest behind the quote
  "&::before": {
    backgroundImage: `radial-gradient(ellipse at center, ${DARK_BG} 0%, ${DARK_BG_ALPHA_55} 55%, ${DARK_BG_ALPHA_20} 100%), url(${gardenArt})`,
    backgroundPosition: "center",
    opacity: { xs: 0.6, md: 0.8 },
  },
});

export const bridgeQuoteSx = mergeSx(pullQuoteSx, {
  position: "relative",
  fontSize: "clamp(2rem, 6vw, 4.5rem)",
  lineHeight: 1.15,
  maxWidth: 900,
  m: 0,
});

export const bridgeRuleSx = mergeSx(quoteRuleSx, {
  position: "relative",
  my: 4,
});

export const bridgeCiteSx: SxProps<Theme> = {
  position: "relative",
  fontSize: { xs: "0.7rem", md: "0.8rem" },
  fontStyle: "normal",
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: TEXT_MUTED,
  padding: 0,
};
