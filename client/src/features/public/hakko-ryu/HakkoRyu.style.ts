import { SxProps, Theme } from "@mui/material";

import { verticalKanjiSx } from "@style/art";
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
