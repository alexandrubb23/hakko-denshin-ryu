import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";

import mobileHighQuality from "@assets/images/--262.webp";
import senshinkanLowQualityImage from "@assets/images/279-small.webp";
import senshinkanHighQualityImage from "@assets/images/279.webp";
import BlurredUpImage from "@components/ui/Image/BlurredUpImage";

import {
  bandSx,
  bodyTextSx,
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
          <Typography sx={heroEyebrowSx}>Senshinkan · Romania</Typography>
          <Typography component="h1" sx={heroTitleSx}>
            洗心館
          </Typography>
          <Typography component="p" sx={heroSubtitleSx}>
            Hall of Heart Purification
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
            "The place where you purify your heart — without violence."
          </Typography>
          <Divider sx={dividerSx} />
          <Grid container spacing={{ xs: 2, md: 5 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography sx={bodyTextSx}>
                <strong>Senshinkan (洗心館)</strong> is a dojo where we teach{" "}
                <strong>Hakko Denshin Ryu Ju Jutsu</strong> (八光伝心流柔術) — a
                self-defence system without any violence. The name translates as{" "}
                <em>
                  "the place (館) where you purify (洗) your heart/mind (心)"
                </em>
                .
              </Typography>
              <Typography sx={bodyTextSx}>
                The main difference with most other Ju Jutsu styles is the use
                of wrist locks and <strong>Gakun</strong> (雅勲) — pressure on{" "}
                <strong>kyusho</strong> (急所, vital points situated along the
                meridians).
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography sx={bodyTextSx}>
                The essence of <strong>Hakko Denshin Ryu</strong> is learning
                the <strong>appropriate and precise gesture</strong>, and
                adopting the right attitude.
              </Typography>
              <Typography sx={bodyTextSx}>
                We hope this site will bring you some additional information
                about our art and inspire you to discover this beautiful martial
                tradition.
              </Typography>
            </Grid>
          </Grid>
        </FadeIn>
      </Container>
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
                Senshinkan Romania
              </Typography>
              <Typography sx={sectionKanjiSx}>洗心館</Typography>
              <Divider sx={dividerSx} />

              <Typography sx={bodyTextSx}>
                <strong>Senshinkan Romania (洗心館)</strong> is a dedicated dojo
                located in Romania, recognized as an official affiliate of the{" "}
                <a
                  href="https://hakkodenshinryu.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hombu Dojo
                </a>
                . We train under the supervision of{" "}
                <strong>
                  Menkyo Kaiden Shihan Leempoels Eric San Dai Kichu
                </strong>
                , the{" "}
                <a
                  href="https://hakkodenshinryu.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hombu Dojo's official representative in Romania
                </a>
                , upholding the integrity of the lineage.
              </Typography>
              <Typography sx={bodyTextSx}>
                Our curriculum incorporates both{" "}
                <strong>unarmed techniques</strong> and training with
                traditional Japanese weapons — the <strong>tambo</strong>,{" "}
                <strong>jo</strong>, <strong>katana</strong>,{" "}
                <strong>tanto</strong>, <strong>sensu (fan)</strong>,{" "}
                <strong>kasa (umbrella)</strong>, <strong>walking cane</strong>,{" "}
                <strong>paper scroll</strong>, and many more. These tools
                symbolize the <strong>adaptability</strong> and{" "}
                <strong>grace</strong> inherent in Hakko Denshin Ryu.
              </Typography>
              <Typography sx={bodyTextSx}>
                At the heart of our practice are <strong>datsuryoku</strong>{" "}
                (effortless power) and <strong>kuzushi</strong> (balance
                breaking). Hakko Denshin Ryu is a <strong>philosophy</strong>{" "}
                that guides decision-making, supports{" "}
                <strong>mental well-being</strong>, and cultivates{" "}
                <strong>confident, humble individuals</strong> who embody{" "}
                <strong>respect</strong> and <strong>tradition</strong> in all
                areas of life.
              </Typography>
            </FadeIn>
          </Grid>
        </Grid>
      </Box>
    </Container>
  </>
);

export default Senshinkan;
