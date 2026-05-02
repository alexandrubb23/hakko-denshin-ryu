import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";

import hakkoDenshinRyuHighQualityImage from "@assets/images/200.webp";

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

const trainingItems = [
  {
    label: (
      <>
        Hakko Denshin Ryu Jujutsu <strong>techniques and forms</strong>
      </>
    ),
  },
  {
    label: (
      <>
        <strong>Traditional weapons training</strong> — tambo, jo, katana,
        tanto, sensu
      </>
    ),
  },
  {
    label: (
      <>
        <strong>Shiatsu</strong> therapeutic massage techniques
      </>
    ),
  },
  {
    label: (
      <>
        <strong>Goshin Taiso</strong> health and fitness exercises
      </>
    ),
  },
  {
    label: (
      <>
        <strong>Meditation</strong> and breathing practices
      </>
    ),
  },
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
          <Typography sx={heroEyebrowSx}>The Dojo · Romania</Typography>
          <Typography component="h1" sx={heroTitleSx}>
            Senshinkan Romania
          </Typography>
          <Typography component="p" sx={heroSubtitleSx}>
            Hall of Heart Purification
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
              Senshinkan Romania
            </Typography>
            <Typography sx={sectionKanjiSx}>洗心館</Typography>
            <Divider sx={dividerSx} />

            <Typography sx={bodyTextSx}>
              <strong>Senshinkan Romania</strong> (洗心館) is the official
              Romanian dojo dedicated to the practice and teaching of{" "}
              <strong>Hakko Denshin Ryu Jujutsu</strong>. The name{" "}
              <strong>"Senshinkan"</strong> translates to{" "}
              <strong>"Hall of Heart Purification"</strong> — reflecting our
              commitment to both physical training and spiritual development.
            </Typography>
            <Typography sx={bodyTextSx}>
              Our dojo follows the traditional teachings of{" "}
              <strong>Hakko Denshin Ryu</strong>, emphasizing the principles of{" "}
              <strong>datsuryoku</strong> (effortless power) and{" "}
              <strong>harmony</strong> in both technique and daily life. We
              maintain direct lineage connections to{" "}
              <strong>Menkyo Kaiden Shihan Leempoels Eric San Dai Kichu</strong>
              , ensuring authentic transmission of the art.
            </Typography>
            <Typography sx={bodyTextSx}>
              Our training environment emphasizes <strong>respect</strong>,{" "}
              <strong>discipline</strong>, and <strong>mutual growth</strong>.
              Students develop not only effective self-defence techniques but
              also <strong>mental clarity</strong>,{" "}
              <strong>emotional balance</strong>, and{" "}
              <strong>spiritual awareness</strong> through consistent practice.
            </Typography>
          </FadeIn>
        </Grid>

        {/* Training list column */}
        <Grid size={{ xs: 12, md: 5 }}>
          <FadeIn delay={0.15}>
            <Typography sx={{ ...sectionNumberSx, mb: 1.5 }}>
              We offer
            </Typography>
            <Box sx={trainingListSx}>
              {trainingItems.map((item, i) => (
                <Box key={i} sx={trainingItemSx}>
                  <Box sx={trainingDotSx} />
                  <Typography sx={trainingTextSx}>{item.label}</Typography>
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
            Whether you are a beginner seeking the fundamentals of martial arts
            or an experienced practitioner looking to deepen your understanding,{" "}
            <strong>Senshinkan Romania</strong> provides a welcoming and
            traditional environment for your martial arts journey. We honor the
            legacy of our predecessors while adapting the teachings to serve the
            needs of modern practitioners.
          </Typography>
          <Typography sx={closingBgCounterSx}>道</Typography>
        </FadeIn>
      </Container>
    </Box>
  </>
);

export default Dojo;
