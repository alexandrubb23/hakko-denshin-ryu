import { SxProps, Theme } from "@mui/material";

import { DISPLAY_FONT, TITLE_GLOW, verticalKanjiSx } from "@style/art";
import { BORDER_COLOR, PURPLE, TEXT_PRIMARY } from "@style/tokens";
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

// ─── 03. Philosophy (valley art band) ─────────────────────────────────────────

export const pullQuoteSx: SxProps<Theme> = {
  fontFamily: DISPLAY_FONT,
  fontSize: "clamp(1.6rem, 3.8vw, 2.8rem)",
  fontWeight: 400,
  lineHeight: 1.3,
  color: TEXT_PRIMARY,
  textShadow: TITLE_GLOW,
  mb: 4,
  padding: 0,
};

export const quoteRuleSx: SxProps<Theme> = {
  width: 80,
  height: "1px",
  backgroundColor: PURPLE,
  mb: 4,
};

// ─── Ju Jutsu closing paragraphs ──────────────────────────────────────────────

export const jujutsuNotesSx: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
  gap: { xs: 0, md: 6 },
  mt: { xs: 4, md: 8 },
  pt: { xs: 4, md: 6 },
  borderTop: `1px solid ${BORDER_COLOR}`,
};
