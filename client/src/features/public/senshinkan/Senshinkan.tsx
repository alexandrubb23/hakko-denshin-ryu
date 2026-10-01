import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";

import mobileHighQuality from "@assets/images/--262.webp";
import senshinkanLowQualityImage from "@assets/images/279-small.webp";
import senshinkanHighQualityImage from "@assets/images/279.webp";
import FadeIn from "@components/ui/FadeIn/FadeIn";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import BlurredUpImage from "@components/ui/Image/BlurredUpImage";
import KanjiWatermark from "@components/ui/KanjiWatermark/KanjiWatermark";
import { EASE_OUT } from "@constants/animationsTiming";

import {
  bandSx,
  bodyTextSx,
  bridgeCiteSx,
  bridgeKanjiSx,
  bridgeQuoteSx,
  bridgeRuleSx,
  bridgeSx,
  dividerSx,
  heroBgSx,
  heroContentSx,
  heroEyebrowSx,
  heroKanjiSx,
  heroSubtitleSx,
  heroSx,
  heroTitleSx,
  portraitWrapperSx,
  pullQuoteSx,
  sectionKanjiSx,
  sectionNumberSx,
  sectionTitleSx,
  sectionWrapperSx,
} from "./Senshinkan.style";

// Rich-text tag for messages linking to the Hombu Dojo website
const richText = {
  link: (chunks: React.ReactNode) => (
    <a
      href="https://hakkodenshinryu.net/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  ),
};

const Senshinkan = () => (
  <>
    {/* ── Hero ─────────────────────────────────────────────────────────── */}
    <Box sx={heroSx}>
      <Box sx={heroBgSx(mobileHighQuality)} />
      <Typography sx={heroKanjiSx}>洗心館</Typography>
      <Box sx={heroContentSx}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
        >
          <Typography sx={heroEyebrowSx}>
            <FormattedMessage id="page.senshinkan.hero.eyebrow" />
          </Typography>
          <Typography component="h1" sx={heroTitleSx}>
            洗心館
          </Typography>
          <Typography component="p" sx={heroSubtitleSx}>
            <FormattedMessage id="page.senshinkan.hero.subtitle" />
          </Typography>
        </motion.div>
      </Box>
    </Box>

    {/* ── 01. About Senshinkan (full-bleed band) ───────────────────────── */}
    <Box sx={bandSx}>
      <Container maxWidth="lg">
        <FadeIn>
          <Typography sx={sectionNumberSx}>01</Typography>
          <Typography sx={pullQuoteSx}>
            <FormattedMessage id="page.senshinkan.about.quote" />
          </Typography>
          <Divider sx={dividerSx} />
          <Grid container spacing={{ xs: 2, md: 5 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography sx={bodyTextSx}>
                <FormattedMessage
                  id="page.senshinkan.about.p1"
                  values={richText}
                />
              </Typography>
              <Typography sx={bodyTextSx}>
                <FormattedMessage id="page.senshinkan.about.p2" />
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography sx={bodyTextSx}>
                <FormattedMessage id="page.senshinkan.about.p3" />
              </Typography>
              <Typography sx={bodyTextSx}>
                <FormattedMessage id="page.senshinkan.about.p4" />
              </Typography>
            </Grid>
          </Grid>
        </FadeIn>
      </Container>
    </Box>

    {/* ── Bridge: the old ways joined the new (full-bleed) ─────────────── */}
    <Box component="figure" sx={bridgeSx}>
      <KanjiWatermark kanji="刀" sx={bridgeKanjiSx} />
      <FadeIn>
        <Typography component="blockquote" sx={bridgeQuoteSx}>
          <FormattedMessage id="page.senshinkan.bridge.quote" />
        </Typography>
      </FadeIn>
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6, ease: EASE_OUT }}
      >
        <Divider sx={bridgeRuleSx} />
      </motion.div>
      <FadeIn delay={0.9}>
        <Box component="figcaption">
          <Typography component="cite" sx={bridgeCiteSx}>
            <FormattedMessage id="page.senshinkan.bridge.cite" />
          </Typography>
        </Box>
      </FadeIn>
    </Box>

    <Container maxWidth="lg">
      {/* ── 02. Senshinkan Romania ───────────────────────────────────────── */}
      <Box sx={sectionWrapperSx}>
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 5 }}>
            <FadeIn>
              <Box sx={portraitWrapperSx}>
                <BlurredUpImage
                  lowQualitySrc={senshinkanLowQualityImage}
                  highQualitySrc={senshinkanHighQualityImage}
                  sx={{ aspectRatio: "auto 360 / 539", width: "100%" }}
                />
              </Box>
            </FadeIn>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <FadeIn delay={0.15}>
              <Typography sx={sectionNumberSx}>02</Typography>
              <Typography component="h2" sx={sectionTitleSx}>
                <FormattedMessage id="page.senshinkan.romania.title" />
              </Typography>
              <Typography sx={sectionKanjiSx}>洗心館</Typography>
              <Divider sx={dividerSx} />

              <Typography sx={bodyTextSx}>
                <FormattedMessage
                  id="page.senshinkan.romania.p1"
                  values={richText}
                />
              </Typography>
              <Typography sx={bodyTextSx}>
                <FormattedMessage id="page.senshinkan.romania.p2" />
              </Typography>
              <Typography sx={bodyTextSx}>
                <FormattedMessage id="page.senshinkan.romania.p3" />
              </Typography>
            </FadeIn>
          </Grid>
        </Grid>
      </Box>
    </Container>
  </>
);

export default Senshinkan;
