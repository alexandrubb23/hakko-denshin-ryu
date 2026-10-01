import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

import ArcNavMenu from "@components/ui/ArcNavMenu/ArcNavMenu";
import CoverChrome from "@components/ui/CoverChrome/CoverChrome";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";

import { EASE_OUT } from "@constants/animationsTiming";

import { DOJO_MOON_ART } from "./dojoArt";
import {
  heroArtSx,
  heroContentSx,
  heroEyebrowSx,
  heroMenuSx,
  heroRuleSx,
  heroSubtitleSx,
  heroSx,
  heroTitleSx,
  heroVerticalKanjiSx,
} from "./HakkoRyuHero.style";

/** The dojo cover, its moon sending out the arc menu */
const HakkoRyuHero = () => (
  <Box sx={heroSx}>
    <CoverChrome />

    <Box sx={heroContentSx}>
      {/* 八光流 — Hakko Ryu, written vertically */}
      <Box sx={heroVerticalKanjiSx} lang="ja" aria-hidden>
        八光流
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
      >
        <Typography sx={heroEyebrowSx}>
          <FormattedMessage id="page.hakko-ryu.hero.eyebrow" />
        </Typography>
        <Typography component="h1" sx={heroTitleSx}>
          Hakko Ryu
        </Typography>
        <Typography component="p" sx={heroSubtitleSx}>
          <FormattedMessage id="page.hakko-ryu.hero.subtitle" />
        </Typography>
        <Box sx={heroRuleSx} lang="ja" aria-hidden>
          八光伝心流柔術
        </Box>
      </motion.div>
    </Box>

    <ArcNavMenu
      direction="left"
      art={DOJO_MOON_ART}
      artSx={heroArtSx}
      sx={heroMenuSx}
    />
  </Box>
);

export default HakkoRyuHero;
