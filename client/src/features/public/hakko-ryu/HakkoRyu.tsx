import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import BlurredUpImage from "@components/ui/Image/BlurredUpImage";

import contactLowQualityImage from "@assets/images/--58-small.webp";
import contactHighQualityImage from "@assets/images/--58.webp";
import mobileLowQuality from "@assets/images/180-small.jpg";
import mobileHighQuality from "@assets/images/180.webp";
import hakkoDenshinRyuLowQualityImage from "@assets/images/200-small.webp";
import hakkoDenshinRyuHighQualityImage from "@assets/images/200.webp";
import shiatsuLowQualityImage from "@assets/images/21-small.webp";
import shiatsuHighQualityImage from "@assets/images/21.webp";
import hakkoRyuLowQualityImage from "@assets/images/53-small.webp";
import hakkoRyuHighQualityImage from "@assets/images/53.webp";
import goshinTaisoLowQualityImage from "@assets/images/89-small.webp";
import goshinTaisoHighQualityImage from "@assets/images/89.webp";

import {
  bodyTextSx,
  companionBodySx,
  companionCardSx,
  companionImgSx,
  heroBgSx,
  heroContentSx,
  heroEyebrowSx,
  heroKanjiSx,
  heroSubtitleSx,
  heroSx,
  heroTitleSx,
  philosophyBandSx,
  pullQuoteSx,
  sectionDividerSx,
  sectionKanjiSx,
  sectionNumberSx,
  sectionTitleSx,
  sectionWrapperSx,
} from "./HakkoRyu.style";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

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

const HakkoRyu = () => (
  <>
    {/* ── Hero ─────────────────────────────────────────────────────────── */}
    <Box sx={heroSx}>
      <Box sx={heroBgSx(hakkoRyuHighQualityImage)} />

      <Typography sx={heroKanjiSx}>八光流</Typography>

      <Box sx={heroContentSx}>
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
        </motion.div>
      </Box>
    </Box>

    <Container maxWidth="lg">
      {/* ── 01. Origins ──────────────────────────────────────────────────── */}
      <Box sx={sectionWrapperSx}>
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 6 }}>
            <FadeIn>
              <Typography sx={sectionNumberSx}>01</Typography>
              <Typography component="h2" sx={sectionTitleSx}>
                Hakko Ryu
              </Typography>
              <Typography sx={sectionKanjiSx}>八光流</Typography>
              <Divider sx={sectionDividerSx} />

              <Typography sx={bodyTextSx}>
                <FormattedMessage id="page.hakko-ryu.origins.p1" />
              </Typography>
              <Typography sx={bodyTextSx}>
                <FormattedMessage id="page.hakko-ryu.origins.p2" />
              </Typography>
            </FadeIn>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FadeIn delay={0.15}>
              <BlurredUpImage
                lowQualitySrc={hakkoDenshinRyuLowQualityImage}
                highQualitySrc={hakkoDenshinRyuHighQualityImage}
              />
            </FadeIn>
          </Grid>
        </Grid>
      </Box>

      {/* ── 02. Hakko Denshin Ryu ─────────────────────────────────────────── */}
      <Box sx={sectionWrapperSx}>
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 6 }} order={{ xs: 1, md: 0 }}>
            <FadeIn>
              <BlurredUpImage
                lowQualitySrc={hakkoRyuLowQualityImage}
                highQualitySrc={hakkoRyuHighQualityImage}
              />
            </FadeIn>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }} order={{ xs: 0, md: 1 }}>
            <FadeIn delay={0.15}>
              <Typography sx={sectionNumberSx}>02</Typography>
              <Typography component="h2" sx={sectionTitleSx}>
                Hakko Denshin Ryu Jujutsu
              </Typography>
              <Typography sx={sectionKanjiSx}>八光伝心流柔術</Typography>
              <Divider sx={sectionDividerSx} />

              <Typography sx={bodyTextSx}>
                <FormattedMessage id="page.hakko-ryu.denshin.p1" />
              </Typography>
              <Typography sx={bodyTextSx}>
                <FormattedMessage id="page.hakko-ryu.denshin.p2" />
              </Typography>
            </FadeIn>
          </Grid>
        </Grid>
      </Box>
    </Container>

    {/* ── 03. Philosophy (full-bleed band) ─────────────────────────────────── */}
    <Box sx={philosophyBandSx}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            <FadeIn>
              <Typography sx={sectionNumberSx}>03</Typography>
              <Typography sx={pullQuoteSx}>
                <FormattedMessage id="page.hakko-ryu.philosophy.quote" />
              </Typography>
              <Divider sx={sectionDividerSx} />

              <Typography sx={bodyTextSx}>
                <FormattedMessage id="page.hakko-ryu.philosophy.p1" />
              </Typography>
              <Typography sx={bodyTextSx}>
                <FormattedMessage id="page.hakko-ryu.philosophy.p2" />
              </Typography>
              <Typography sx={bodyTextSx}>
                <FormattedMessage id="page.hakko-ryu.philosophy.p3" />
              </Typography>
            </FadeIn>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <FadeIn delay={0.2}>
              <BlurredUpImage
                lowQualitySrc={mobileLowQuality}
                highQualitySrc={mobileHighQuality}
                sx={{
                  aspectRatio: "auto 360 / 539",
                  width: { xs: "65%", md: "85%" },
                }}
              />
            </FadeIn>
          </Grid>
        </Grid>
      </Container>
    </Box>

    <Container maxWidth="lg">
      {/* ── 04. Ju Jutsu ─────────────────────────────────────────────────── */}
      <Box sx={{ ...sectionWrapperSx, mt: { xs: 6, md: 10 } }}>
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 6 }}>
            <FadeIn>
              <Typography sx={sectionNumberSx}>04</Typography>
              <Typography component="h2" sx={sectionTitleSx}>
                Ju Jutsu
              </Typography>
              <Typography sx={sectionKanjiSx}>柔術</Typography>
              <Divider sx={sectionDividerSx} />

              <Typography sx={bodyTextSx}>
                <FormattedMessage id="page.hakko-ryu.jujutsu.p1" />
              </Typography>
              <Typography sx={bodyTextSx}>
                <FormattedMessage id="page.hakko-ryu.jujutsu.p2" />
              </Typography>
            </FadeIn>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FadeIn delay={0.15}>
              <BlurredUpImage
                lowQualitySrc={shiatsuLowQualityImage}
                highQualitySrc={shiatsuHighQualityImage}
              />
            </FadeIn>
          </Grid>
        </Grid>

        <FadeIn>
          <Grid
            container
            spacing={{ xs: 2, md: 4 }}
            sx={{ mt: { xs: 1, md: 2 } }}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography sx={bodyTextSx}>
                <FormattedMessage id="page.hakko-ryu.jujutsu.p3" />
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography sx={bodyTextSx}>
                <FormattedMessage id="page.hakko-ryu.jujutsu.p4" />
              </Typography>
            </Grid>
          </Grid>
        </FadeIn>
      </Box>

      {/* ── 05 & 06. Companion Practices ─────────────────────────────────── */}
      <FadeIn>
        <Box sx={{ mb: { xs: 8, md: 12 } }}>
          <Typography sx={{ ...sectionNumberSx, mb: 1 }}>
            05 &amp; 06
          </Typography>
          <Typography component="h2" sx={{ ...sectionTitleSx, mb: 4 }}>
            <FormattedMessage id="page.hakko-ryu.companion.title" />
          </Typography>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={companionCardSx}>
                <BlurredUpImage
                  lowQualitySrc={contactLowQualityImage}
                  highQualitySrc={contactHighQualityImage}
                  sx={companionImgSx}
                  animate="none"
                />
                <Box sx={companionBodySx}>
                  <Typography
                    component="h3"
                    sx={{
                      ...sectionTitleSx,
                      fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
                    }}
                  >
                    Shiatsu
                  </Typography>
                  <Typography sx={sectionKanjiSx}>指圧</Typography>
                  <Typography sx={bodyTextSx}>
                    <FormattedMessage id="page.hakko-ryu.companion.shiatsu.description" />
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={companionCardSx}>
                <BlurredUpImage
                  lowQualitySrc={goshinTaisoLowQualityImage}
                  highQualitySrc={goshinTaisoHighQualityImage}
                  sx={companionImgSx}
                  animate="none"
                />
                <Box sx={companionBodySx}>
                  <Typography
                    component="h3"
                    sx={{
                      ...sectionTitleSx,
                      fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
                    }}
                  >
                    Goshin Taiso
                  </Typography>
                  <Typography sx={sectionKanjiSx}>護身体操</Typography>
                  <Typography sx={bodyTextSx}>
                    <FormattedMessage id="page.hakko-ryu.companion.goshin-taiso.description" />
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </FadeIn>
    </Container>
  </>
);

export default HakkoRyu;
