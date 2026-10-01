import { Box } from "@mui/material";

import LanguageSwitcher from "@components/ui/LanguageSwitcher/LanguageSwitcher";

import { langSwitcherSx, topAccentSx } from "./CoverChrome.style";

/**
 * The top accent and the language switcher of a cover page, which has no
 * header. Place it in the cover's positioned root.
 */
const CoverChrome = () => (
  <>
    <Box sx={topAccentSx} aria-hidden />
    <Box sx={langSwitcherSx}>
      <LanguageSwitcher />
    </Box>
  </>
);

export default CoverChrome;
