import { Box } from "@mui/material";

import { topAccentSx } from "./CoverChrome.style";

/**
 * The top accent of a cover page; its scheme toggle and language switcher
 * are pinned by the header slot (see CoverControls). Place it in the cover's
 * positioned root.
 */
const CoverChrome = () => <Box sx={topAccentSx} aria-hidden />;

export default CoverChrome;
