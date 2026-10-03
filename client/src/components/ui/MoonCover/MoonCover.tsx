import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

import ArcNavMenu from "@components/ui/ArcNavMenu/ArcNavMenu";
import type { MoonArt, Painting } from "@components/ui/ArcNavMenu/moonArt";
import CoverChrome from "@components/ui/CoverChrome/CoverChrome";
import { heroReveal } from "@components/ui/FadeIn/heroReveal";
import FallingPetals from "@components/ui/FallingPetals/FallingPetals";
import KanjiRule from "@components/ui/KanjiRule/KanjiRule";
import { NIGHT } from "@style/colorScheme";
import { mergeSx } from "@utils/sx";

import {
  heroAboveTitleContentSx,
  heroAboveTitleSx,
  heroActionsSx,
  heroArtSx,
  heroCompactTitleSx,
  heroContentSx,
  heroEyebrowSx,
  heroMenuSx,
  heroOnArtSx,
  heroPetalsSx,
  heroRuleSx,
  heroSubtitleSx,
  heroSx,
  heroTaglineSx,
  heroTitleSx,
  heroVerticalKanjiSx,
  narrowOnlySx,
  wideOnlySx,
} from "./MoonCover.style";

interface Props {
  /** A painting whose moon sits in its upper right, its left side dark */
  art: MoonArt;
  /**
   * A different painting below `lg`, e.g. when `art` is composed for the
   * wide layout (content painted for `onArt` that narrow screens don't show)
   */
  narrowArt?: MoonArt;
  /** Written vertically beside the title on wide screens */
  kanji: string;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  /** A short line under the title, spaced out in the display font */
  subtitle?: React.ReactNode;
  /** A sentence of prose under the kanji rule */
  tagline?: React.ReactNode;
  /** Buttons under the tagline, e.g. a link on to another page */
  actions?: React.ReactNode;
  /** A smaller title, for longer titles or art that holds content */
  compactTitle?: boolean;
  /** Mask for the art on wide screens, built with `wideArtFade` */
  wideArtFade?: string;
  /**
   * Content laid over the art on wide screens (hidden on narrow ones,
   * unless `onArtBelowMenu`): position it in fractions of the art, e.g.
   * with `rectOnArt`, and size it in `cqh`. It doesn't get
   * pointer events unless it sets `pointerEvents: "auto"`.
   */
  onArt?: React.ReactNode;
  /** Below `lg`, show `onArt` under the menu rather than hiding it */
  onArtBelowMenu?: boolean;
  /**
   * Fills the empty dark space above the title on wide screens, laid against
   * the arc menu's labels (hidden on narrow ones, where the title sits under
   * the menu), e.g. a photo as tall as the space
   */
  aboveTitle?: React.ReactNode;
}

// The cover's art; a narrow painting takes over below `lg`
const coverPaintings = (
  art: MoonArt,
  narrowArt: MoonArt | undefined,
  wideFade: string | undefined
): Painting[] => {
  const artSx = heroArtSx(wideFade);
  // Blossom petals drifting down over the painting
  const overlay = <FallingPetals sx={heroPetalsSx(art)} />;
  if (!narrowArt) return [{ art, sx: artSx, overlay }];

  return [
    { art, sx: mergeSx(artSx, wideOnlySx), overlay },
    {
      art: narrowArt,
      sx: mergeSx(artSx, narrowOnlySx),
      overlay: <FallingPetals />,
    },
  ];
};

/**
 * A page cover for pages without a header: the painting's moon sends out
 * the arc menu, and the title sits on the painting's dark side.
 */
const MoonCover = ({
  art,
  narrowArt,
  kanji,
  eyebrow,
  title,
  subtitle,
  tagline,
  actions,
  compactTitle = false,
  wideArtFade,
  onArt,
  onArtBelowMenu = false,
  aboveTitle,
}: Props) => (
  <Box sx={heroSx} {...NIGHT}>
    <CoverChrome />

    {aboveTitle && (
      <Box sx={heroAboveTitleSx}>
        <Box sx={heroAboveTitleContentSx(art)}>
          <motion.div {...heroReveal} style={{ height: "100%" }}>
            {aboveTitle}
          </motion.div>
        </Box>
      </Box>
    )}

    <Box sx={heroContentSx}>
      <Box sx={heroVerticalKanjiSx} lang="ja" aria-hidden>
        {kanji}
      </Box>

      <motion.div {...heroReveal}>
        <Typography sx={heroEyebrowSx}>{eyebrow}</Typography>
        <Typography
          component="h1"
          sx={compactTitle ? heroCompactTitleSx : heroTitleSx}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography component="p" sx={heroSubtitleSx}>
            {subtitle}
          </Typography>
        )}
        <KanjiRule sx={heroRuleSx} />
        {tagline && <Typography sx={heroTaglineSx}>{tagline}</Typography>}
        {actions && <Box sx={heroActionsSx}>{actions}</Box>}
      </motion.div>
    </Box>

    <ArcNavMenu
      direction="left"
      paintings={coverPaintings(art, narrowArt, wideArtFade)}
      sx={heroMenuSx(art, onArtBelowMenu)}
    />

    {onArt && <Box sx={heroOnArtSx(art, onArtBelowMenu)}>{onArt}</Box>}
  </Box>
);

export default MoonCover;
