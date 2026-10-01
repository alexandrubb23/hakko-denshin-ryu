import img180 from "@assets/images/180.webp";
import ArcNavMenu from "@components/ui/Header/NavMenu/ArcNavMenu";
import LanguageSwitcher from "@components/ui/LanguageSwitcher/LanguageSwitcher";
import { Box } from "@mui/material";
import { mergeSx } from "@utils/sx";

import { motion } from "framer-motion";

import { CoverMotto, CoverTitle } from "./CoverText";
import HankoSeal from "./HankoSeal";
import {
  arcMenuSx,
  coverBlockSx,
  gridSx,
  heroSx,
  langSwitcherPositionSx,
  navColSx,
  photoColSx,
  photoSx,
  sealPositionSx,
  verticalKanjiSx,
} from "./HomeCover.style";
import { heroWrapperSx, langSwitcherSx, topAccentSx } from "./cover.style";
import { heroReveal } from "./heroReveal";

/** Wide-screen home cover: moon art with the arc menu, photo and title */
const HomeCover = () => (
  <Box sx={mergeSx(heroWrapperSx, heroSx)}>
    <Box sx={topAccentSx} aria-hidden />

    <Box sx={gridSx}>
      {/* Moon art; the arc menu's rays start from the painted moon */}
      <Box sx={navColSx}>
        <ArcNavMenu sx={arcMenuSx} />
      </Box>

      <Box sx={photoColSx}>
        <Box component="img" src={img180} alt="" sx={photoSx} />

        <motion.div {...heroReveal} style={{ position: "relative", zIndex: 1 }}>
          <Box sx={coverBlockSx}>
            {/* 洗心館 — Senshinkan, written vertically */}
            <Box sx={verticalKanjiSx} lang="ja" aria-hidden>
              洗心館
            </Box>

            <Box>
              <CoverTitle />
              <CoverMotto align="start" />
            </Box>
          </Box>
        </motion.div>

        <Box sx={mergeSx(langSwitcherSx, langSwitcherPositionSx)}>
          <LanguageSwitcher />
        </Box>

        <HankoSeal sx={sealPositionSx} />
      </Box>
    </Box>
  </Box>
);

export default HomeCover;
