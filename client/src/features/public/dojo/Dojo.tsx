import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";

import hakkoDenshinRyuHighQualityImage from "@assets/images/200.webp";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";

import type { IntlMessageID } from "i18n/messages";

import {
  bodyTextSx,
  closingBandSx,
  closingBgCounterSx,
  closingTextSx,
  dividerSx,
  heroBgSx,
  heroContentSx,
  heroEyebrowSx,
  heroKanjiSx,
  heroSubtitleSx,
  heroSx,
  heroTitleSx,
  sectionKanjiSx,
  sectionNumberSx,
  sectionTitleSx,
  trainingDotSx,
  trainingItemSx,
  trainingListSx,
  trainingTextSx,
} from "./Dojo.style";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } };

const FadeIn = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-40px" }}
    variants={fadeUp}
    transition={{ duration: 0.7, ease: EASE_OUT, delay }}
  >
    {children}
  </motion.div>
);

const trainingItems: IntlMessageID[] = [
  "page.dojo.offer.techniques",
  "page.dojo.offer.weapons",
  "page.dojo.offer.shiatsu",
  "page.dojo.offer.goshin-taiso",
  "page.dojo.offer.meditation",
];

const Dojo = () => (
  <>
    {/* ── Hero ─────────────────────────────────────────────────────────── */}
    <Box sx={heroSx}>
      <Box sx={heroBgSx(hakkoDenshinRyuHighQualityImage)} />
      <Typography sx={heroKanjiSx}>洗心館</Typography>
      <Box sx={heroContentSx}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
        >
          <Typography sx={heroEyebrowSx}>
            <FormattedMessage id="page.dojo.hero.eyebrow" />
          </Typography>
          <Typography component="h1" sx={heroTitleSx}>
            <FormattedMessage id="page.dojo.title" />
          </Typography>
          <Typography component="p" sx={heroSubtitleSx}>
            <FormattedMessage id="page.dojo.hero.subtitle" />
          </Typography>
        </motion.div>
      </Box>
    </Box>

    <Container maxWidth="lg">
      {/* ── Main content ─────────────────────────────────────────────────── */}
      <Grid
        container
        spacing={{ xs: 4, md: 6 }}
        alignItems="flex-start"
        sx={{ mb: { xs: 8, md: 10 } }}
      >
        {/* Text column */}
        <Grid size={{ xs: 12, md: 7 }}>
          <FadeIn>
            <Typography sx={sectionNumberSx}>01</Typography>
            <Typography component="h2" sx={sectionTitleSx}>
              <FormattedMessage id="page.dojo.title" />
            </Typography>
            <Typography sx={sectionKanjiSx}>洗心館</Typography>
            <Divider sx={dividerSx} />

            <Typography sx={bodyTextSx}>
              <FormattedMessage id="page.dojo.p1" />
            </Typography>
            <Typography sx={bodyTextSx}>
              <FormattedMessage id="page.dojo.p2" />
            </Typography>
            <Typography sx={bodyTextSx}>
              <FormattedMessage id="page.dojo.p3" />
            </Typography>
          </FadeIn>
        </Grid>

        {/* Training list column */}
        <Grid size={{ xs: 12, md: 5 }}>
          <FadeIn delay={0.15}>
            <Typography sx={{ ...sectionNumberSx, mb: 1.5 }}>
              <FormattedMessage id="page.dojo.offer.title" />
            </Typography>
            <Box sx={trainingListSx}>
              {trainingItems.map((id) => (
                <Box key={id} sx={trainingItemSx}>
                  <Box sx={trainingDotSx} />
                  <Typography sx={trainingTextSx}>
                    <FormattedMessage id={id} />
                  </Typography>
                </Box>
              ))}
            </Box>
          </FadeIn>
        </Grid>
      </Grid>
    </Container>

    {/* ── Closing band ─────────────────────────────────────────────────── */}
    <Box sx={closingBandSx}>
      <Container maxWidth="lg">
        <FadeIn>
          <Typography sx={closingTextSx}>
            <FormattedMessage id="page.dojo.closing" />
          </Typography>
          <Typography sx={closingBgCounterSx}>道</Typography>
        </FadeIn>
      </Container>
    </Box>
  </>
);

export default Dojo;
