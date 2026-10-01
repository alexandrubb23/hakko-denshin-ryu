import ArcNavMenu from "@components/ui/ArcNavMenu/ArcNavMenu";
import CoverChrome from "@components/ui/CoverChrome/CoverChrome";
import { Box } from "@mui/material";
import { mergeSx } from "@utils/sx";

import { motion } from "framer-motion";

import {
  delayedHeroReveal,
  heroReveal,
} from "@components/ui/FadeIn/heroReveal";
import { CoverMotto, CoverTitle } from "./CoverText";
import HankoSeal from "./HankoSeal";
import {
  arcArtSx,
  arcMenuSx,
  heroSx,
  mottoSx,
  quotesSx,
  sealPositionSx,
  titleSx,
} from "./HomeCoverMobile.style";
import { heroWrapperSx } from "./cover.style";
import { HOME_MOON_ART } from "./homeArt";

const PAINTINGS = [{ art: HOME_MOON_ART, sx: arcArtSx }];
// Reveal the motto while the arc menu is still drawing its rays
const MOTTO_DELAY = 1;

/** Home cover below `lg`: title, the moon with the arc menu, then the motto */
const HomeCoverMobile = () => (
  <Box sx={mergeSx(heroWrapperSx, heroSx)}>
    <CoverChrome />
    <HankoSeal sx={sealPositionSx} />

    <motion.div {...heroReveal}>
      <Box sx={titleSx}>
        <CoverTitle />
      </Box>
    </motion.div>

    <ArcNavMenu paintings={PAINTINGS} sx={arcMenuSx} />

    <motion.div {...delayedHeroReveal(MOTTO_DELAY)} style={{ width: "100%" }}>
      <Box sx={mottoSx}>
        <CoverMotto align="center" quotesSx={quotesSx} />
      </Box>
    </motion.div>
  </Box>
);

export default HomeCoverMobile;
