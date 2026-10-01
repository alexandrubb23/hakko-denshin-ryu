import type { SxProps, Theme } from "@mui/material";

import {
  coverEyebrowSx,
  coverSubtitleSx,
  coverTitleSx as coverTitleBaseSx,
} from "@style/art";
import { mergeSx } from "@utils/sx";

export const coverCaptionSx = mergeSx(coverEyebrowSx, {
  fontSize: "clamp(0.8rem, 1.1vw, 1.05rem)",
});

export const coverTitleSx = mergeSx(coverTitleBaseSx, {
  fontSize: {
    xs: "clamp(2.6rem, 12vw, 4.5rem)",
    lg: "clamp(3rem, 5.2vw, 6rem)",
  },
  lineHeight: 1.1,
});

export const coverCountrySx = mergeSx(coverSubtitleSx, {
  fontSize: "clamp(1.4rem, 2.2vw, 2.4rem)",
  letterSpacing: "0.6em",
});

export const coverRuleSx: SxProps<Theme> = { mt: 3 };

export const coverQuotesSx: SxProps<Theme> = {
  maxWidth: 560,
  mt: 1,
};

// Quotes centre themselves; undo that where the cover is left-aligned
export const coverQuotesStartSx: SxProps<Theme> = {
  "& > *": { justifyContent: "flex-start", px: 0, textAlign: "left" },
};
