import { SxProps, Theme } from "@mui/material";

import { fadeMask, verticalKanjiSx } from "@style/art";
import { BORDER_COLOR } from "@style/tokens";
import { mergeSx } from "@utils/sx";

// ─── Hakko Denshin Ryu (text with a vertical kanji column) ───────────────────

export const denshinGridSx: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "auto 1fr 1fr" },
  columnGap: { md: 6 },
  alignItems: "start",
  mt: 4,
};

export const denshinKanjiSx = mergeSx(verticalKanjiSx, {
  display: { xs: "none", md: "block" },
  fontSize: "2.4rem",
  letterSpacing: "0.18em",
  opacity: 0.85,
});

// ─── Ju Jutsu closing paragraphs ──────────────────────────────────────────────

export const jujutsuNotesSx: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
  gap: { xs: 0, md: 6 },
  mt: { xs: 4, md: 8 },
  pt: { xs: 4, md: 6 },
  borderTop: `1px solid ${BORDER_COLOR}`,
};

// ─── Grading system ──────────────────────────────────────────────────────────

export const gradesIntroSx: SxProps<Theme> = { maxWidth: 680 };

// ─── Cover photo, in the dark space above the title ──────────────────────────

// Melts the photo's black studio backdrop into the cover
const COVER_PHOTO_FADE =
  "radial-gradient(ellipse 50% 50% at 50% 50%, black 45%, transparent 100%)";

export const coverPhotoSx: SxProps<Theme> = {
  display: "block",
  // A little taller than the space above the title, its foot fading out
  // behind the eyebrow; its width follows the photo
  height: "120%",
  width: "auto",
  aspectRatio: "3 / 2",
  objectFit: "cover",
  ml: "150px",
  // Wider than the space on shorter screens: it overflows to the left,
  // keeping its edge by the menu
  flexShrink: 0,
  ...fadeMask(COVER_PHOTO_FADE),
};
