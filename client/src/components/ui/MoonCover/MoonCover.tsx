import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

import ArcNavMenu from "@components/ui/ArcNavMenu/ArcNavMenu";
import type { MoonArt } from "@components/ui/ArcNavMenu/moonArt";
import CoverChrome from "@components/ui/CoverChrome/CoverChrome";
import { heroReveal } from "@components/ui/FadeIn/heroReveal";
import KanjiRule from "@components/ui/KanjiRule/KanjiRule";

import {
  heroArtSx,
  heroContentSx,
  heroEyebrowSx,
  heroMenuSx,
  heroRuleSx,
  heroSubtitleSx,
  heroSx,
  heroTaglineSx,
  heroTitleSx,
  heroVerticalKanjiSx,
} from "./MoonCover.style";

interface Props {
  /** A painting whose moon sits in its upper right, its left side dark */
  art: MoonArt;
  /** Written vertically beside the title on wide screens */
  kanji: string;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  /** A short line under the title, spaced out in the display font */
  subtitle?: React.ReactNode;
  /** A sentence of prose under the kanji rule */
  tagline?: React.ReactNode;
}

/**
 * A page cover for pages without a header: the painting's moon sends out
 * the arc menu, and the title sits on the painting's dark side.
 */
const MoonCover = ({
  art,
  kanji,
  eyebrow,
  title,
  subtitle,
  tagline,
}: Props) => (
  <Box sx={heroSx}>
    <CoverChrome />

    <Box sx={heroContentSx}>
      <Box sx={heroVerticalKanjiSx} lang="ja" aria-hidden>
        {kanji}
      </Box>

      <motion.div {...heroReveal}>
        <Typography sx={heroEyebrowSx}>{eyebrow}</Typography>
        <Typography component="h1" sx={heroTitleSx}>
          {title}
        </Typography>
        {subtitle && (
          <Typography component="p" sx={heroSubtitleSx}>
            {subtitle}
          </Typography>
        )}
        <KanjiRule sx={heroRuleSx} />
        {tagline && <Typography sx={heroTaglineSx}>{tagline}</Typography>}
      </motion.div>
    </Box>

    <ArcNavMenu
      direction="left"
      art={art}
      artSx={heroArtSx}
      sx={heroMenuSx(art)}
    />
  </Box>
);

export default MoonCover;
