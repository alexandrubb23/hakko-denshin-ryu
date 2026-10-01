import img180 from "@assets/images/180.webp";
import ArcNavMenu from "@components/ui/ArcNavMenu/ArcNavMenu";
import CoverChrome from "@components/ui/CoverChrome/CoverChrome";
import { Box } from "@mui/material";
import { mergeSx } from "@utils/sx";

import { motion } from "framer-motion";

import { heroReveal } from "@components/ui/FadeIn/heroReveal";
import { CoverMotto, CoverTitle } from "./CoverText";
import HankoSeal from "./HankoSeal";
import {
  arcArtSx,
  arcMenuSx,
  coverBlockSx,
  gridSx,
  heroSx,
  navColSx,
  photoColSx,
  photoSx,
  sealPositionSx,
  verticalKanjiSx,
} from "./HomeCover.style";
import { heroWrapperSx } from "./cover.style";
import { HOME_MOON_ART } from "./homeArt";

const PAINTINGS = [{ art: HOME_MOON_ART, sx: arcArtSx }];

/** Wide-screen home cover: moon art with the arc menu, photo and title */
const HomeCover = () => (
  <Box sx={mergeSx(heroWrapperSx, heroSx)}>
    <CoverChrome />

    <Box sx={gridSx}>
      {/* The arc menu, drawing the moon art behind itself */}
      <Box sx={navColSx}>
        <ArcNavMenu paintings={PAINTINGS} sx={arcMenuSx} />
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

        <HankoSeal sx={sealPositionSx} />
      </Box>
    </Box>
  </Box>
);

export default HomeCover;
