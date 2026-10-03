import { SxProps, Theme } from "@mui/material";

import { kanjiCardBodySx } from "@components/ui/PageSections/PageSections.style";

// ─── Cover photo ──────────────────────────────────────────────────────────────

// Keeps the bowing student clear of the menu and the painting: `ml` places
// the photo when it's wider than the space, `mr` when it fits
export const coverPhotoSx: SxProps<Theme> = { ml: "20px", mr: "140px" };

// ─── 01. Get in touch ─────────────────────────────────────────────────────────

// Long e-mail addresses wrap instead of running under the corner kanji
export const contactItemSx: SxProps<Theme> = {
  ...kanjiCardBodySx,
  overflowWrap: "anywhere",
};

export const socialLinksSx: SxProps<Theme> = {
  gap: 2,
  mt: 1,
};

// ─── 02. Visit the dojo ───────────────────────────────────────────────────────

export const scheduleButtonSx: SxProps<Theme> = { mt: 2 };
