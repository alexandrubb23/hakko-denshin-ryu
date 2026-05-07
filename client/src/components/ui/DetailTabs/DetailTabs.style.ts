import { Box, Tabs, styled } from "@mui/material";

import { BORDER_COLOR, PURPLE } from "@style/tokens";

export const WrapperBox = styled(Box)({
  marginTop: 24, // theme.spacing(3)
});

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${BORDER_COLOR}`,
  "& .MuiTab-root": {
    color: theme.palette.text.secondary,
    textTransform: "none",
    fontWeight: 600,
  },
  "& .Mui-selected": { color: PURPLE },
  "& .MuiTabs-indicator": { backgroundColor: PURPLE },
  "& .MuiTabs-scrollButtons": { color: PURPLE },
}));
