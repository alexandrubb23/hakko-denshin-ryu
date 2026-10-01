import { Box, Container, Grid, Typography } from "@mui/material";

import FadeIn from "@components/ui/FadeIn/FadeIn";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import BlurredUpImage from "@components/ui/Image/BlurredUpImage";

import pinLowQualityImage from "@assets/images/200-small.webp";
import pinHighQualityImage from "@assets/images/200.webp";
import wristLockLowQualityImage from "@assets/images/53-small.webp";
import wristLockHighQualityImage from "@assets/images/53.webp";

import {
  bodyTextSx,
  companionCardSx,
  companionKanjiSx,
  companionTitleSx,
  denshinGridSx,
  denshinKanjiSx,
  jujutsuNotesSx,
  philosophyBandSx,
  philosophyContentSx,
  photoCaptionSx,
  photoFrameSx,
  photoSx,
  pullQuoteSx,
  quoteRuleSx,
  sectionKanjiSx,
  sectionNumberSx,
  sectionTitleSx,
  sectionWrapperSx,
} from "./HakkoRyu.style";
import HakkoRyuHero from "./HakkoRyuHero";

interface SectionHeadingProps {
  number: string;
  title?: React.ReactNode;
  kanji?: string;
}

const SectionHeading = ({ number, title, kanji }: SectionHeadingProps) => (
  <>
    <Typography sx={sectionNumberSx}>{number}</Typography>
    {title && (
      <Typography component="h2" sx={sectionTitleSx}>
        {title}
      </Typography>
    )}
    {kanji && (
      <Typography sx={sectionKanjiSx} lang="ja">
        {kanji}
      </Typography>
    )}
  </>
);

interface PhotoProps {
  lowQualitySrc: string;
  highQualitySrc: string;
  caption: string;
}

/** A studio photo melted into the page, over a soft moon glow */
const Photo = ({ lowQualitySrc, highQualitySrc, caption }: PhotoProps) => (
  <Box sx={photoFrameSx}>
    <BlurredUpImage
      lowQualitySrc={lowQualitySrc}
      highQualitySrc={highQualitySrc}
      sx={photoSx}
      animate="none"
    />
    <Typography sx={photoCaptionSx} lang="ja">
      {caption}
    </Typography>
  </Box>
);

const COMPANIONS = [
  {
    title: "Shiatsu",
    kanji: "指圧",
    descriptionId: "page.hakko-ryu.companion.shiatsu.description",
  },
  {
    title: "Goshin Taiso",
    kanji: "護身体操",
    descriptionId: "page.hakko-ryu.companion.goshin-taiso.description",
  },
] as const;

const HakkoRyu = () => (
  <>
    <HakkoRyuHero />

    <Container maxWidth="lg">
      {/* ── 01. Origins ──────────────────────────────────────────────────── */}
      <Box sx={sectionWrapperSx}>
        <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <FadeIn>
              <SectionHeading number="01" title="Hakko Ryu" kanji="八光流" />
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
              <Photo
                lowQualitySrc={wristLockLowQualityImage}
                highQualitySrc={wristLockHighQualityImage}
                caption="柔よく剛を制す"
              />
            </FadeIn>
          </Grid>
        </Grid>
      </Box>

      {/* ── 02. Hakko Denshin Ryu ─────────────────────────────────────────── */}
      <Box sx={sectionWrapperSx}>
        <FadeIn>
          <SectionHeading number="02" title="Hakko Denshin Ryu Jujutsu" />
          <Box sx={denshinGridSx}>
            <Box sx={denshinKanjiSx} lang="ja" aria-hidden>
              八光伝心流
            </Box>
            <Typography sx={bodyTextSx}>
              <FormattedMessage id="page.hakko-ryu.denshin.p1" />
            </Typography>
            <Typography sx={bodyTextSx}>
              <FormattedMessage id="page.hakko-ryu.denshin.p2" />
            </Typography>
          </Box>
        </FadeIn>
      </Box>
    </Container>

    {/* ── 03. Philosophy (moonlit valley band) ─────────────────────────── */}
    <Box sx={philosophyBandSx}>
      <Container maxWidth="lg">
        <Box sx={philosophyContentSx}>
          <FadeIn>
            <SectionHeading number="03" />
            <Typography sx={pullQuoteSx}>
              <FormattedMessage id="page.hakko-ryu.philosophy.quote" />
            </Typography>
            <Box sx={quoteRuleSx} />

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
        </Box>
      </Container>
    </Box>

    <Container maxWidth="lg">
      {/* ── 04. Ju Jutsu ─────────────────────────────────────────────────── */}
      <Box sx={sectionWrapperSx}>
        <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }} order={{ xs: 1, md: 0 }}>
            <FadeIn>
              <Photo
                lowQualitySrc={pinLowQualityImage}
                highQualitySrc={pinHighQualityImage}
                caption="崩し"
              />
            </FadeIn>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }} order={{ xs: 0, md: 1 }}>
            <FadeIn delay={0.15}>
              <SectionHeading number="04" title="Ju Jutsu" kanji="柔術" />
              <Typography sx={bodyTextSx}>
                <FormattedMessage id="page.hakko-ryu.jujutsu.p1" />
              </Typography>
              <Typography sx={bodyTextSx}>
                <FormattedMessage id="page.hakko-ryu.jujutsu.p2" />
              </Typography>
            </FadeIn>
          </Grid>
        </Grid>

        <FadeIn>
          <Box sx={jujutsuNotesSx}>
            <Typography sx={bodyTextSx}>
              <FormattedMessage id="page.hakko-ryu.jujutsu.p3" />
            </Typography>
            <Typography sx={bodyTextSx}>
              <FormattedMessage id="page.hakko-ryu.jujutsu.p4" />
            </Typography>
          </Box>
        </FadeIn>
      </Box>

      {/* ── 05 & 06. Companion Practices ─────────────────────────────────── */}
      <Box sx={sectionWrapperSx}>
        <FadeIn>
          <SectionHeading
            number="05 & 06"
            title={<FormattedMessage id="page.hakko-ryu.companion.title" />}
          />
        </FadeIn>

        <Grid container spacing={3} sx={{ mt: 4 }}>
          {COMPANIONS.map(({ title, kanji, descriptionId }, i) => (
            <Grid key={title} size={{ xs: 12, md: 6 }}>
              <FadeIn delay={i * 0.12} fullHeight>
                <Box sx={companionCardSx}>
                  <Box sx={companionKanjiSx} lang="ja" aria-hidden>
                    {kanji}
                  </Box>
                  <Typography component="h3" sx={companionTitleSx}>
                    {title}
                  </Typography>
                  <Typography sx={bodyTextSx}>
                    <FormattedMessage id={descriptionId} />
                  </Typography>
                </Box>
              </FadeIn>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  </>
);

export default HakkoRyu;
