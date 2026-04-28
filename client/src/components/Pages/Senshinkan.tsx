
import { Typography } from "@mui/material";

import mobileLowQuality from "@assets/images/--262-small.webp";
import mobileHighQuality from "@assets/images/--262.webp";
import senshinkanLowQualityImage from "@assets/images/279-small.webp";
import senshinkanHighQualityImage from "@assets/images/279.webp";
import SectionsList, { type Section } from "@components/Layout/SectionsList";
import Strong from "@components/Layout/Strong";

const sections: Section[] = [
  {
    image: {
      lowQualitySrc: mobileLowQuality,
      highQualitySrc: mobileHighQuality,
    },
    imageFirstOnMobile: true,
    imageFirstOnDesktop: true,
    sectionTitle: "Senshinkan (洗心館)",
    children: (
      <>
        <Typography variant="body1" data-aos="fade">
          <Strong>Senshinkan (洗心館)</Strong>, whose name can be translated as
          "the place (館) where you purify (洗) your heart/mind (心)", is a dojo
          where we teach <Strong>Hakko Denshin Ryu Ju Jutsu</Strong>{" "}
          (八光伝心流柔術), a self-defence system without any violence.
        </Typography>
        <Typography variant="body1" data-aos="fade">
          The main difference with most of the other Ju Jutsu styles is the use
          of wrist locks and Gakun, 雅勲, pressure on kyusho (急処 or 急所,
          vital points situated along the meridians). short period.
        </Typography>
        <Typography variant="body1" data-aos="fade">
          The essence of <Strong>Hakko Denshin Ryu</Strong> is learning the
          appropriate and precise gesture, and adopting the right attitude.
        </Typography>
        <Typography variant="body1" data-aos="fade">
          We hope this site will bring you some additional information about our
          art.
        </Typography>
      </>
    ),
  },
  {
    image: {
      lowQualitySrc: senshinkanLowQualityImage,
      highQualitySrc: senshinkanHighQualityImage,
      sx: {
        aspectRatio: "auto 360 / 539",
        width: {
          lg: "80%",
          md: "100%",
          sm: "80%",
          xs: "80%",
        },
      },
    },
    imageFirstOnMobile: true,
    imageFirstOnDesktop: false,
    sectionTitle: "Senshinkan Romania",
    children: (
      <>
        <Typography variant="body1" data-aos="fade">
          <Strong>Senshinkan Romania (洗心館)</Strong> is a dedicated dojo
          located in Romania, recognized as an official affiliate of the{" "}
          <a
            href="https://hakkodenshinryu.net/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hombu Dojo
          </a>
          . We are honored to train under the supervision of{" "}
          <Strong>Menkyo Kaiden Shihan Leempoels Eric San Dai Kichu </Strong>,
          who serves as the{" "}
          <a
            href="https://hakkodenshinryu.net/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hombu Dojo's official representative in Romania
          </a>
          , upholding the integrity of the lineage.
        </Typography>
        <Typography variant="body1" data-aos="fade">
          Our curriculum incorporates both <Strong>unarmed techniques</Strong>
          &nbsp; and training with traditional Japanese weapons and objects such
          as the
          <Strong>tambo</Strong>,&nbsp;<Strong>jo</Strong>,&nbsp;
          <Strong>katana</Strong>, <Strong>tanto</Strong>, &nbsp;
          <Strong>sensu (fan)</Strong>, <Strong>kasa (umbrella)</Strong>
          ,&nbsp;<Strong>walking cane</Strong>, <Strong>paper scroll</Strong>,
          and many more. These tools symbolize the <Strong>adaptability</Strong>
          &nbsp; and <Strong>grace</Strong>&nbsp; inherent in{" "}
          <Strong>Hakko Denshin Ryu</Strong>.
        </Typography>
        <Typography variant="body1" data-aos="fade">
          At the heart of our practice are the principles of&nbsp;
          <Strong>datsuryoku</Strong>&nbsp; (effortless power) and{" "}
          <Strong>kuzushi</Strong> (balance breaking). We use&nbsp;
          <Strong>pain as a tool of distraction</Strong>, blending it seamlessly
          with techniques that emphasize <Strong>humility</Strong>
          &nbsp; and <Strong>harmony</Strong>.
        </Typography>
        <Typography variant="body1" data-aos="fade">
          <Strong>Hakko Ryu Denshin Ryu</Strong> is a practice that goes beyond
          the dojo. It is a <Strong>philosophy</Strong>
          that guides decision-making, supports&nbsp;
          <Strong>mental well-being</Strong>, and enriches&nbsp;
          <Strong>social interactions</Strong>. We aim to empower our students,
          cultivating not just skilled practitioners but&nbsp;
          <Strong>confident, humble individuals</Strong> who embody&nbsp;
          <Strong>respect</Strong>
          and <Strong>tradition</Strong> in all areas of life.
        </Typography>
      </>
    ),
  },
];

const Senshinkan = () => <SectionsList sections={sections} />;

export default Senshinkan;
