import { Container } from "@mui/material";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import MoonCover from "@components/ui/MoonCover/MoonCover";
import ArtBand from "@components/ui/PageSections/ArtBand";
import LinkButton from "@components/ui/PageSections/LinkButton";
import PageSection from "@components/ui/PageSections/PageSection";
import Paragraphs from "@components/ui/PageSections/Paragraphs";
import PhotoSplit from "@components/ui/PageSections/PhotoSplit";
import SectionHeading from "@components/ui/PageSections/SectionHeading";
import { Routes } from "@lib/routes";

import trainingLowQualityImage from "@assets/images/180-small.jpg";
import trainingHighQualityImage from "@assets/images/180.webp";
import pathArt from "@assets/images/contact-path.webp";

import ContactCards from "./ContactCards";
import { CONTACT_MOON_ART } from "./contactArt";

import { scheduleButtonSx } from "./Contact.style";

const Contact = () => (
  <>
    <MoonCover
      art={CONTACT_MOON_ART}
      kanji="連絡先"
      eyebrow={<FormattedMessage id="page.contact.hero.eyebrow" />}
      title={<FormattedMessage id="page.contact.title" />}
      compactTitle
      tagline={<FormattedMessage id="page.contact.description" />}
    />

    <Container maxWidth="lg">
      {/* ── 01. Get in touch ─────────────────────────────────────────────── */}
      <PageSection>
        <PhotoSplit
          photo={{
            lowQualitySrc: trainingLowQualityImage,
            highQualitySrc: trainingHighQualityImage,
            caption: "稽古",
            aspectRatio: "2 / 3",
          }}
        >
          <SectionHeading
            number="01"
            title={<FormattedMessage id="page.contact.block.touch" />}
            kanji="連絡先"
          />
          <ContactCards />
        </PhotoSplit>
      </PageSection>
    </Container>

    {/* ── 02. Visit the dojo (the lantern path) ────────────────────────── */}
    <ArtBand src={pathArt}>
      <SectionHeading
        number="02"
        title={<FormattedMessage id="page.contact.visit.title" />}
        kanji="道場"
      />
      <Paragraphs ids={["page.contact.visit.p1"]} />
      <LinkButton to={Routes.schedule} sx={scheduleButtonSx}>
        <FormattedMessage id="page.contact.visit.button" />
      </LinkButton>
    </ArtBand>
  </>
);

export default Contact;
