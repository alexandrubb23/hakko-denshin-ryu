import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";

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
            Founded 1941 · Okuyama Ryuho
          </Typography>
          <Typography component="h1" sx={heroTitleSx}>
            Hakko Ryu
          </Typography>
          <Typography component="p" sx={heroSubtitleSx}>
            The Eighth Light
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
                <strong>Hakkō-ryū</strong> (八光流) is a school of jujutsu
                founded in <strong>1941</strong> by{" "}
                <strong>Okuyama Ryuho</strong> (1901–1987), descendant of{" "}
                <strong>Daito-ryu</strong> and practitioner of{" "}
                <strong>shiatsu</strong>. The name translates as{" "}
                <strong>"The Style of the Eighth Light"</strong>, referring to
                the <strong>ultraviolet band</strong> — invisible yet powerful,
                like the techniques themselves.
              </Typography>
              <Typography sx={bodyTextSx}>
                This <strong>humanitarian martial technique</strong> focuses on{" "}
                <strong>qi meridian points</strong> sensitive to pain, allowing
                defenders to create sharp distracting pain without causing
                serious injury. True efficiency is{" "}
                <strong>invisible to the eyes</strong>, just as ultraviolet rays
                are invisible but very powerful.
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
                <strong>Hakko Denshin Ryu Jujutsu</strong> (八光伝心流柔術) was
                founded in <strong>1997</strong> by{" "}
                <strong>Yasuhiro Irie</strong>,{" "}
                <strong>Michael LaMonica</strong>, and{" "}
                <strong>Antonio Garcia</strong> — all high-ranking Hakko Ryu
                practitioners. The name means{" "}
                <strong>"Heart and Spirit of Hakko Ryu"</strong>, known in Japan
                as <strong>Kokodo</strong> (皇光道).
              </Typography>
              <Typography sx={bodyTextSx}>
                Each founder became a director (<strong>"Soke"</strong>) in
                their respective regions (<strong>Japan</strong>,{" "}
                <strong>USA</strong>, <strong>Europe</strong>) and formed the{" "}
                <strong>Kokodo Renmei</strong> federation. Other descendants
                include <strong>Dentokan Jujutsu</strong> founded by Roy Hobbs,
                and <strong>Hakko Densho Ryu</strong> founded by Palumbo in
                Colorado.
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
                "Pain as a tool of distraction, blended with humility and
                harmony."
              </Typography>
              <Divider sx={sectionDividerSx} />

              <Typography sx={bodyTextSx}>
                <strong>Hakko Denshin Ryu</strong> is based on the same
                fundamental principles as traditional Hakko Ryu, enriched with
                philosophies that promote not only{" "}
                <strong>physical strength</strong> but also{" "}
                <strong>mental resilience</strong> and{" "}
                <strong>personal growth</strong>.
              </Typography>
              <Typography sx={bodyTextSx}>
                Our curriculum incorporates both{" "}
                <strong>unarmed techniques</strong> and training with
                traditional Japanese weapons — the <strong>tambo</strong>,{" "}
                <strong>jo</strong>, <strong>katana</strong>,{" "}
                <strong>tanto</strong>, <strong>sensu</strong>,{" "}
                <strong>kasa</strong>, and many more. These tools symbolize the{" "}
                <strong>adaptability</strong> and <strong>grace</strong>{" "}
                inherent in Hakko Denshin Ryu.
              </Typography>
              <Typography sx={bodyTextSx}>
                At the heart of our practice are <strong>datsuryoku</strong>{" "}
                (effortless power) and <strong>kuzushi</strong> (balance
                breaking). Hakko Denshin Ryu is a <strong>philosophy</strong>{" "}
                that cultivates <strong>confident, humble individuals</strong>{" "}
                who embody <strong>respect</strong> and{" "}
                <strong>tradition</strong> in all areas of life.
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
                The term <strong>Ju-Jutsu</strong> (柔術) refers to disciplines
                whose efficiency lies in an{" "}
                <strong>appropriate and precise gesture</strong> whatever the
                situation may be — not only a{" "}
                <strong>self-defense method</strong> traceable to the{" "}
                <strong>Samurai</strong> (侍) period, but also a way of{" "}
                <strong>improving oneself</strong> through traditional practice.
              </Typography>
              <Typography sx={bodyTextSx}>
                <strong>Shirobei Akiyama</strong>, a doctor from Nagasaki,
                observed a <strong>willow tree</strong> during a snowy winter.
                Its branches bent under the weight of the snow, then sprang
                back. The <strong>cherry tree</strong>, which resisted, had its
                branches broken. From this, Akiyama founded{" "}
                <strong>Yoshin Ryu</strong> (楊心流) — the{" "}
                <strong>non-resistance principle</strong> that would shape all
                jujutsu that followed.
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
                Around <strong>1600</strong>, after centuries of wars, a long
                era of <strong>relative peace</strong> was established in{" "}
                <strong>Edo</strong>. Influenced by <strong>Bushido</strong>{" "}
                (武士道) and spiritual values, Ju-Jutsu schools became{" "}
                <strong>Budo</strong> (武道: the Path of Combat) — a support for{" "}
                <strong>spiritual improvement</strong>.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography sx={bodyTextSx}>
                More than defeating opponents, <strong>Ju-Jutsu</strong>{" "}
                develops <strong>observation</strong>, <strong>control</strong>,{" "}
                <strong>stability</strong>, <strong>adaptability</strong>,{" "}
                <strong>respect</strong>, and <strong>harmony</strong>. This is
                the challenge traditional Ju-Jutsu schools offer in our modern
                world.
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
            Companion Practices
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
                    <strong>Shi</strong> (指) means <strong>"finger"</strong>{" "}
                    and <strong>atsu</strong> (圧) means{" "}
                    <strong>"pressure"</strong>. Shiatsu aims at maintaining or
                    recovering the <strong>energetic balance</strong> our body
                    needs to be healthy.
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
                    <strong>Goshin</strong> (護身) means{" "}
                    <strong>"protection"</strong> and <strong>taiso</strong>{" "}
                    (体操) means <strong>"gymnastics"</strong>. Goshin Taiso is
                    a gymnastic system to maintain the equilibrium of forces in
                    our body — practiced alone for{" "}
                    <strong>energetic evaluation</strong>.
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
