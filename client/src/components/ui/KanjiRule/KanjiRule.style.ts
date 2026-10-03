import type { SxProps, Theme } from "@mui/material";

import { KANJI_FONT } from "@style/art";
import { PURPLE_ALPHA_50, TEXT_MUTED } from "@style/colorScheme";

export const kanjiRuleSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 2.5,
  maxWidth: 460,
  fontFamily: KANJI_FONT,
  fontSize: "clamp(1rem, 1.3vw, 1.3rem)",
  letterSpacing: "0.3em",
  color: TEXT_MUTED,
  "&::before, &::after": {
    content: '""',
    flex: 1,
    height: "1px",
    backgroundColor: PURPLE_ALPHA_50,
  },
};
