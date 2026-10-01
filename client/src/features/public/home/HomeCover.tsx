import img180 from "@assets/images/180.webp";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import ArcNavMenu from "@components/ui/Header/NavMenu/ArcNavMenu";
import LanguageSwitcher from "@components/ui/LanguageSwitcher/LanguageSwitcher";
import Quotes from "@components/ui/Quotes/Quotes";
import { Box, Typography } from "@mui/material";

import { motion } from "framer-motion";

import { heroWrapperSx, topAccentSx } from "./Home.style";
import {
  arcMenuPositionSx,
  coverBlockSx,
  coverCaptionSx,
  coverCountrySx,
  coverQuotesSx,
  coverRuleSx,
  coverTaglineSx,
  coverTitleSx,
  desktopGridSx,
  desktopNavColSx,
  desktopPhotoColSx,
  desktopPhotoSx,
  langSwitcherSx,
  sealSx,
  verticalKanjiSx,
} from "./HomeCover.style";
import { heroReveal } from "./heroReveal";

/** Wide-screen home hero: moon art with the arc menu, photo and title */
const HomeCover = () => (
  <Box sx={heroWrapperSx}>
    <Box sx={topAccentSx} aria-hidden />

    <Box sx={desktopGridSx}>
      {/* Moon art; the arc menu's rays start from the painted moon */}
      <Box sx={desktopNavColSx}>
        <ArcNavMenu sx={arcMenuPositionSx} />
      </Box>

      <Box sx={desktopPhotoColSx}>
        <Box component="img" src={img180} alt="" sx={desktopPhotoSx} />

        <motion.div {...heroReveal} style={{ position: "relative", zIndex: 1 }}>
          <Box sx={coverBlockSx}>
            {/* 洗心館 — Senshinkan, written vertically */}
            <Box sx={verticalKanjiSx} lang="ja" aria-hidden>
              洗心館
            </Box>

            <Box>
              <Typography sx={coverCaptionSx}>
                Hakko Denshin Ryu Jujutsu
              </Typography>
              <Typography component="h1" sx={coverTitleSx}>
                Senshinkan
              </Typography>
              <Typography sx={coverCountrySx}>Romania</Typography>

              <Box sx={coverRuleSx} lang="ja">
                八光伝心流柔術
              </Box>

              <Typography sx={coverTaglineSx}>
                <FormattedMessage id="page.home.subtitle" />
              </Typography>

              <Box sx={coverQuotesSx}>
                <Quotes />
              </Box>
            </Box>
          </Box>
        </motion.div>

        <Box sx={langSwitcherSx}>
          <LanguageSwitcher />
        </Box>

        {/* Hanko seal: 洗心道館 */}
        <Box sx={sealSx} lang="ja" aria-hidden>
          洗心
          <br />
          道館
        </Box>
      </Box>
    </Box>
  </Box>
);

export default HomeCover;
