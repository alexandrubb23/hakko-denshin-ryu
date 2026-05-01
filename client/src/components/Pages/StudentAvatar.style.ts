import { Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";

import { BORDER_COLOR, PURPLE } from "@style/tokens";

export const StyledAvatar = styled(Avatar)({
  width: 64,
  height: 64,
  backgroundColor: "rgba(171,150,255,0.25)",
  fontSize: 22,
  fontWeight: 700,
  color: PURPLE,
  cursor: "pointer",
  border: `2px solid ${BORDER_COLOR}`,
  transition: "border-color 0.2s, opacity 0.2s",
  "&:hover": {
    borderColor: PURPLE,
    opacity: 0.85,
  },
});
