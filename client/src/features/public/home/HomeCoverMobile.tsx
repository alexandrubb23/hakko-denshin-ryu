import ArcNavMenu from "@components/ui/Header/NavMenu/ArcNavMenu";
import LanguageSwitcher from "@components/ui/LanguageSwitcher/LanguageSwitcher";
import { Box } from "@mui/material";
import { mergeSx } from "@utils/sx";

import { motion } from "framer-motion";

import { CoverMotto, CoverTitle } from "./CoverText";
import HankoSeal from "./HankoSeal";
import {
  arcMenuSx,
  heroSx,
  langSwitcherPositionSx,
  mottoSx,
  quotesSx,
  sealPositionSx,
  titleSx,
} from "./HomeCoverMobile.style";
import { heroWrapperSx, langSwitcherSx, topAccentSx } from "./cover.style";
import { delayedHeroReveal, heroReveal } from "./heroReveal";

// Reveal the motto while the arc menu is still drawing its rays
const MOTTO_DELAY = 1;

/** Home cover below `lg`: title, the moon with the arc menu, then the motto */
const HomeCoverMobile = () => (
  <Box sx={mergeSx(heroWrapperSx, heroSx)}>
    <Box sx={topAccentSx} aria-hidden />
    <HankoSeal sx={sealPositionSx} />
    <Box sx={mergeSx(langSwitcherSx, langSwitcherPositionSx)}>
      <LanguageSwitcher />
    </Box>

    <motion.div {...heroReveal}>
      <Box sx={titleSx}>
        <CoverTitle />
      </Box>
    </motion.div>

    <ArcNavMenu sx={arcMenuSx} />

    <motion.div {...delayedHeroReveal(MOTTO_DELAY)} style={{ width: "100%" }}>
      <Box sx={mottoSx}>
        <CoverMotto align="center" quotesSx={quotesSx} />
      </Box>
    </motion.div>
  </Box>
);

export default HomeCoverMobile;
