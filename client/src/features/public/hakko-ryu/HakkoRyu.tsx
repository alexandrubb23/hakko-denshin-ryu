import { Box, Container } from "@mui/material";

import CoverPhoto from "@components/ui/CoverPhoto/CoverPhoto";
import FadeIn from "@components/ui/FadeIn/FadeIn";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import MoonCover from "@components/ui/MoonCover/MoonCover";
import ArtBand from "@components/ui/PageSections/ArtBand";
import CardGrid from "@components/ui/PageSections/CardGrid";
import KanjiCard from "@components/ui/PageSections/KanjiCard";
import PageSection from "@components/ui/PageSections/PageSection";
import Paragraphs from "@components/ui/PageSections/Paragraphs";
import PhotoSplit from "@components/ui/PageSections/PhotoSplit";
import PullQuote from "@components/ui/PageSections/PullQuote";
import SectionHeading from "@components/ui/PageSections/SectionHeading";
import SectionNav from "@components/ui/SectionNav/SectionNav";
import type { SectionNavSection } from "@components/ui/SectionNav/sections";

import wristLockImage from "@assets/images/53.webp";
import valleyArt from "@assets/images/hakko-ryu-valley.webp";
import suwariArt from "@assets/syllabus/suwari.webp";
import tachiArt from "@assets/syllabus/tachi.webp";

import GradingSystem from "./GradingSystem";
import {
  denshinGridSx,
  denshinKanjiSx,
  gradesIntroSx,
  jujutsuNotesSx,
} from "./HakkoRyu.style";
import { HAKKO_RYU_MOON_ART } from "./hakkoRyuArt";
import KyuProgramSection from "./KyuProgramSection";
import Syllabus from "./Syllabus";

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

// The page's chapters, in page order: their headings and the section nav
const SECTIONS = {
  origins: { id: "origins", title: "Hakko Ryu" },
  denshin: { id: "hakko-denshin-ryu", title: "Hakko Denshin Ryu Jujutsu" },
  philosophy: { id: "philosophy", titleId: "page.hakko-ryu.philosophy.title" },
  jujutsu: { id: "ju-jutsu", title: "Ju Jutsu" },
  companions: {
    id: "companion-practices",
    titleId: "page.hakko-ryu.companion.title",
  },
  grades: { id: "grading-system", titleId: "page.hakko-ryu.grades.title" },
  kyu: { id: "kyu-program", titleId: "page.hakko-ryu.kyu.title" },
  syllabus: { id: "syllabus", titleId: "page.hakko-ryu.syllabus.title" },
} as const satisfies Record<string, SectionNavSection>;

const SECTION_LIST = Object.values(SECTIONS);

const HakkoRyu = () => (
  <>
    <SectionNav sections={SECTION_LIST} />

    <MoonCover
      art={HAKKO_RYU_MOON_ART}
      kanji="八光流"
      eyebrow={<FormattedMessage id="page.hakko-ryu.hero.eyebrow" />}
      title="Hakko Ryu"
      subtitle={<FormattedMessage id="page.hakko-ryu.hero.subtitle" />}
      aboveTitle={<CoverPhoto src={wristLockImage} />}
    />

    <Container maxWidth="lg">
      {/* ── 01. Origins ──────────────────────────────────────────────────── */}
      <PageSection>
        <PhotoSplit
          // The kyu program's paintings: the real photos are on the covers
          photo={{
            lowQualitySrc: suwariArt,
            highQualitySrc: suwariArt,
            caption: "柔よく剛を制す",
            aspectRatio: "1 / 1",
          }}
        >
          <SectionHeading
            id={SECTIONS.origins.id}
            number="01"
            title={SECTIONS.origins.title}
            kanji="八光流"
          />
          <Paragraphs
            ids={["page.hakko-ryu.origins.p1", "page.hakko-ryu.origins.p2"]}
          />
        </PhotoSplit>
      </PageSection>

      {/* ── 02. Hakko Denshin Ryu ─────────────────────────────────────────── */}
      <PageSection>
        <FadeIn>
          <SectionHeading
            id={SECTIONS.denshin.id}
            number="02"
            title={SECTIONS.denshin.title}
          />
          <Box sx={denshinGridSx}>
            <Box sx={denshinKanjiSx} lang="ja" aria-hidden>
              八光伝心流
            </Box>
            <Paragraphs
              ids={["page.hakko-ryu.denshin.p1", "page.hakko-ryu.denshin.p2"]}
            />
          </Box>
        </FadeIn>
      </PageSection>
    </Container>

    {/* ── 03. Philosophy (moonlit valley band) ─────────────────────────── */}
    <ArtBand src={valleyArt}>
      <SectionHeading id={SECTIONS.philosophy.id} number="03" />
      <PullQuote id="page.hakko-ryu.philosophy.quote" />

      <Paragraphs
        ids={[
          "page.hakko-ryu.philosophy.p1",
          "page.hakko-ryu.philosophy.p2",
          "page.hakko-ryu.philosophy.p3",
        ]}
      />
    </ArtBand>

    <Container maxWidth="lg">
      {/* ── 04. Ju Jutsu ─────────────────────────────────────────────────── */}
      <PageSection>
        <PhotoSplit
          photoFirst
          photo={{
            lowQualitySrc: tachiArt,
            highQualitySrc: tachiArt,
            caption: "崩し",
            aspectRatio: "1 / 1",
          }}
        >
          <SectionHeading
            id={SECTIONS.jujutsu.id}
            number="04"
            title={SECTIONS.jujutsu.title}
            kanji="柔術"
          />
          <Paragraphs
            ids={["page.hakko-ryu.jujutsu.p1", "page.hakko-ryu.jujutsu.p2"]}
          />
        </PhotoSplit>

        <FadeIn>
          <Box sx={jujutsuNotesSx}>
            <Paragraphs
              ids={["page.hakko-ryu.jujutsu.p3", "page.hakko-ryu.jujutsu.p4"]}
            />
          </Box>
        </FadeIn>
      </PageSection>

      {/* ── 05 & 06. Companion Practices ─────────────────────────────────── */}
      <PageSection>
        <FadeIn>
          <SectionHeading
            id={SECTIONS.companions.id}
            number="05 & 06"
            title={<FormattedMessage id={SECTIONS.companions.titleId} />}
          />
        </FadeIn>

        <CardGrid size={{ xs: 12, md: 6 }} stagger={0.12}>
          {COMPANIONS.map(({ title, kanji, descriptionId }) => (
            <KanjiCard key={title} kanji={kanji} title={title}>
              <Paragraphs ids={[descriptionId]} />
            </KanjiCard>
          ))}
        </CardGrid>
      </PageSection>

      {/* ── 07. Grading System ───────────────────────────────────────────── */}
      <PageSection>
        <FadeIn>
          <SectionHeading
            id={SECTIONS.grades.id}
            number="07"
            title={<FormattedMessage id={SECTIONS.grades.titleId} />}
            kanji="段級制度"
          />
          <Box sx={gradesIntroSx}>
            <Paragraphs ids={["page.hakko-ryu.grades.intro"]} />
          </Box>
        </FadeIn>

        <GradingSystem />
      </PageSection>

      {/* ── 08. Kyu Program ──────────────────────────────────────────────── */}
      <PageSection>
        <FadeIn>
          <SectionHeading
            id={SECTIONS.kyu.id}
            number="08 · Mudansha · 無段者"
            title={<FormattedMessage id={SECTIONS.kyu.titleId} />}
            kanji="五級 — 一級"
          />
          <Box sx={gradesIntroSx}>
            <Paragraphs ids={["page.hakko-ryu.kyu.subtitle"]} />
          </Box>
        </FadeIn>

        <FadeIn>
          <KyuProgramSection />
        </FadeIn>
      </PageSection>

      {/* ── 09. Shodan–Yondan Syllabus ───────────────────────────────────── */}
      <PageSection>
        <FadeIn>
          <SectionHeading
            id={SECTIONS.syllabus.id}
            number="09 · Hakko Denshin Ryu · 八光伝心流"
            title={<FormattedMessage id={SECTIONS.syllabus.titleId} />}
            kanji="基本技"
          />
          <Box sx={gradesIntroSx}>
            <Paragraphs ids={["page.hakko-ryu.syllabus.subtitle"]} />
          </Box>
        </FadeIn>

        <FadeIn>
          <Syllabus />
        </FadeIn>
      </PageSection>
    </Container>
  </>
);

export default HakkoRyu;
