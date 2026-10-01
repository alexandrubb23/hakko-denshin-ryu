import { Container, Typography } from "@mui/material";

import FadeIn from "@components/ui/FadeIn/FadeIn";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import MoonCover from "@components/ui/MoonCover/MoonCover";
import ArtBand from "@components/ui/PageSections/ArtBand";
import CardGrid from "@components/ui/PageSections/CardGrid";
import KanjiCard from "@components/ui/PageSections/KanjiCard";
import PageSection from "@components/ui/PageSections/PageSection";
import Paragraphs from "@components/ui/PageSections/Paragraphs";
import PhotoSplit from "@components/ui/PageSections/PhotoSplit";
import SectionHeading from "@components/ui/PageSections/SectionHeading";

import trainingLowQualityImage from "@assets/images/108-small.jpg";
import trainingHighQualityImage from "@assets/images/108.webp";
import valleyArt from "@assets/images/hakko-ryu-valley.webp";

import type { IntlMessageID } from "i18n/messages";

import { closingKanjiSx, closingTextSx, offerTextSx } from "./Dojo.style";
import { DOJO_MOON_ART } from "./dojoArt";

const OFFERS: { kanji: string; textId: IntlMessageID }[] = [
  { kanji: "技", textId: "page.dojo.offer.techniques" }, // waza — techniques
  { kanji: "武器", textId: "page.dojo.offer.weapons" }, // buki — weapons
  { kanji: "指圧", textId: "page.dojo.offer.shiatsu" },
  { kanji: "護身", textId: "page.dojo.offer.goshin-taiso" },
  { kanji: "瞑想", textId: "page.dojo.offer.meditation" }, // meisō — meditation
];

const Dojo = () => (
  <>
    <MoonCover
      art={DOJO_MOON_ART}
      kanji="洗心館"
      eyebrow={<FormattedMessage id="page.dojo.hero.eyebrow" />}
      title="Senshinkan"
      tagline={<FormattedMessage id="page.dojo.hero.tagline" />}
    />

    <Container maxWidth="lg">
      {/* ── 01. The dojo ─────────────────────────────────────────────────── */}
      <PageSection>
        <PhotoSplit
          photo={{
            lowQualitySrc: trainingLowQualityImage,
            highQualitySrc: trainingHighQualityImage,
            caption: "洗心",
          }}
        >
          <SectionHeading
            number="01"
            title={<FormattedMessage id="page.dojo.title" />}
            kanji="洗心館"
          />
          <Paragraphs ids={["page.dojo.p1", "page.dojo.p2", "page.dojo.p3"]} />
        </PhotoSplit>
      </PageSection>

      {/* ── 02. What we offer ────────────────────────────────────────────── */}
      <PageSection>
        <FadeIn>
          <SectionHeading
            number="02"
            title={<FormattedMessage id="page.dojo.offer.title" />}
          />
        </FadeIn>

        <CardGrid size={{ xs: 12, sm: 6, md: 4 }} stagger={0.08}>
          {OFFERS.map(({ kanji, textId }) => (
            <KanjiCard key={textId} kanji={kanji}>
              <Paragraphs ids={[textId]} sx={offerTextSx} />
            </KanjiCard>
          ))}
        </CardGrid>
      </PageSection>
    </Container>

    {/* ── 03. Closing (moonlit valley band) ────────────────────────────── */}
    <ArtBand src={valleyArt}>
      <SectionHeading number="03" />
      <Typography sx={closingKanjiSx} lang="ja" aria-hidden>
        道
      </Typography>
      <Paragraphs ids={["page.dojo.closing"]} sx={closingTextSx} />
    </ArtBand>
  </>
);

export default Dojo;
