import { SxProps, Theme } from "@mui/material";

import { kanjiCardBodySx } from "@components/ui/PageSections/PageSections.style";

// ─── 01. Get in touch ─────────────────────────────────────────────────────────

// Long e-mail addresses wrap instead of running under the corner kanji
export const contactItemSx: SxProps<Theme> = {
  ...kanjiCardBodySx,
  overflowWrap: "anywhere",
};

export const socialLinksSx: SxProps<Theme> = {
  display: "flex",
  gap: 2,
  mt: 1,
};

// ─── 02. Visit the dojo ───────────────────────────────────────────────────────

export const scheduleButtonSx: SxProps<Theme> = { mt: 2 };
