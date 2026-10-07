import type { SxProps, Theme } from "@mui/material";

import {
  BORDER_COLOR,
  BORDER_HOVER,
  PURPLE,
  PURPLE_ALPHA_08,
} from "@style/colorScheme";

// A round, outlined icon link: the social links, and the event's share buttons
export const roundIconLinkSx: SxProps<Theme> = {
  display: "grid",
  placeItems: "center",
  width: 40,
  height: 40,
  borderRadius: "50%",
  border: `1px solid ${BORDER_COLOR}`,
  color: PURPLE,
  transition: "border-color 0.3s ease, background-color 0.3s ease",
  "&:hover, &:focus-visible": {
    borderColor: BORDER_HOVER,
    backgroundColor: PURPLE_ALPHA_08,
  },
};
