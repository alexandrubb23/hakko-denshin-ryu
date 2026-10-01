import { Box } from "@mui/material";

import { sectionWrapperSx } from "./PageSections.style";

/** One numbered section of a cover page, spaced from the next */
const PageSection = ({ children }: { children: React.ReactNode }) => (
  <Box component="section" sx={sectionWrapperSx}>
    {children}
  </Box>
);

export default PageSection;
