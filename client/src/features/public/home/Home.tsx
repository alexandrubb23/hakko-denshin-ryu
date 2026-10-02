import { Box } from "@mui/material";

import HomeCover from "./HomeCover";
import HomeCoverMobile from "./HomeCoverMobile";

// Both covers are rendered and switched in CSS, so the server-rendered
// markup already matches the screen size (no layout jump on hydration)
const WIDE_ONLY_SX = { display: { xs: "none", lg: "block" } };
const NARROW_ONLY_SX = { display: { lg: "none" } };

const Home = () => (
  <>
    <Box sx={WIDE_ONLY_SX}>
      <HomeCover />
    </Box>
    <Box sx={NARROW_ONLY_SX}>
      <HomeCoverMobile />
    </Box>
  </>
);

export default Home;
