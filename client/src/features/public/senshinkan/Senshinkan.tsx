import { Box, Container } from "@mui/material";

import FadeIn from "@components/ui/FadeIn/FadeIn";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import MoonCover from "@components/ui/MoonCover/MoonCover";
import PageSection from "@components/ui/PageSections/PageSection";
import Paragraphs from "@components/ui/PageSections/Paragraphs";
import PhotoSplit from "@components/ui/PageSections/PhotoSplit";
import PullQuote from "@components/ui/PageSections/PullQuote";
import SectionHeading from "@components/ui/PageSections/SectionHeading";

import clubLowQualityImage from "@assets/images/279-small.webp";
import clubHighQualityImage from "@assets/images/279.webp";

import { aboutColumnsSx } from "./Senshinkan.style";
import SenshinkanBridge from "./SenshinkanBridge";
import { SENSHINKAN_MOON_ART } from "./senshinkanArt";

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
    <MoonCover
      art={SENSHINKAN_MOON_ART}
      kanji="洗心館"
      eyebrow={<FormattedMessage id="page.senshinkan.hero.eyebrow" />}
      title="Senshinkan"
      tagline={<FormattedMessage id="page.senshinkan.hero.tagline" />}
    />

    <Container maxWidth="lg">
      {/* ── 01. About Senshinkan ─────────────────────────────────────────── */}
      <PageSection>
        <FadeIn>
          <SectionHeading number="01" />
          <PullQuote id="page.senshinkan.about.quote" />

          <Box sx={aboutColumnsSx}>
            <div>
              <Paragraphs
                ids={["page.senshinkan.about.p1", "page.senshinkan.about.p2"]}
              />
            </div>
            <div>
              <Paragraphs
                ids={["page.senshinkan.about.p3", "page.senshinkan.about.p4"]}
              />
            </div>
          </Box>
        </FadeIn>
      </PageSection>
    </Container>

    <SenshinkanBridge />

    <Container maxWidth="lg">
      {/* ── 02. Senshinkan Romania ───────────────────────────────────────── */}
      <PageSection>
        <PhotoSplit
          photoFirst
          photo={{
            lowQualitySrc: clubLowQualityImage,
            highQualitySrc: clubHighQualityImage,
            caption: "洗心館",
            aspectRatio: "2 / 3",
          }}
        >
          <SectionHeading
            number="02"
            title={<FormattedMessage id="page.senshinkan.romania.title" />}
            kanji="洗心館"
          />
          <Paragraphs
            ids={[
              "page.senshinkan.romania.p1",
              "page.senshinkan.romania.p2",
              "page.senshinkan.romania.p3",
            ]}
            values={richText}
          />
        </PhotoSplit>
      </PageSection>
    </Container>
  </>
);

export default Senshinkan;
