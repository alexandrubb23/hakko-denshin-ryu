import { Box } from "@mui/material";

import useIsMobile from "@hooks/isMobile";
import { NIGHT } from "@style/colorScheme";

import { pinnedSx } from "./CoverControls.style";
import CoverControlsSet from "./CoverControlsSet";
import CoverControlsTray from "./CoverControlsTray";

/**
 * The scheme toggle and the language switcher of the cover pages, which have
 * no header. Fixed to the viewport, so they stay at hand while scrolling, and
 * kept night so they read the same over the paper below a cover.
 */
const CoverControls = () => {
  const isMobile = useIsMobile();

  if (isMobile) return <CoverControlsTray />;

  return (
    <Box sx={pinnedSx} {...NIGHT}>
      <CoverControlsSet />
    </Box>
  );
};

export default CoverControls;
