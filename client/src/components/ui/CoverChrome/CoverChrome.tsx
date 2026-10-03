import { Box } from "@mui/material";

import ColorSchemeToggle from "@components/ui/ColorSchemeToggle/ColorSchemeToggle";
import LanguageSwitcher from "@components/ui/LanguageSwitcher/LanguageSwitcher";

import { coverControlsSx, topAccentSx } from "./CoverChrome.style";

/**
 * The top accent, the scheme toggle and the language switcher of a cover
 * page, which has no header. Place it in the cover's positioned root.
 */
const CoverChrome = () => (
  <>
    <Box sx={topAccentSx} aria-hidden />
    <Box sx={coverControlsSx}>
      <ColorSchemeToggle />
      <LanguageSwitcher />
    </Box>
  </>
);

export default CoverChrome;
