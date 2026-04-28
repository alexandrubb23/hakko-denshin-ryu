import { Typography } from "@mui/material";

import hakkoRyuLowQualityImage from "@assets/images/53-small.webp";
import hakkoRyuHighQualityImage from "@assets/images/53.webp";

import hakkoDenshinRyuLowQualityImage from "@assets/images/200-small.webp";
import hakkoDenshinRyuHighQualityImage from "@assets/images/200.webp";

import shiatsuLowQualityImage from "@assets/images/21-small.webp";
import shiatsuHighQualityImage from "@assets/images/21.webp";

import goshinTaisoLowQualityImage from "@assets/images/89-small.webp";
import goshinTaisoHighQualityImage from "@assets/images/89.webp";

import mobileLowQuality from "@assets/images/180-small.jpg";
import mobileHighQuality from "@assets/images/180.webp";

import Strong from "@components/Layout/Strong";

import contactLowQualityImage from "@assets/images/--58-small.webp";
import contactHighQualityImage from "@assets/images/--58.webp";
import SectionsList, { Section } from "@components/Layout/SectionsList";

const sections: Section[] = [
  {
    sectionTitle: "Hakko Ryu - The Eighth Light",
    image: {
      lowQualitySrc: hakkoRyuLowQualityImage,
      highQualitySrc: hakkoRyuHighQualityImage,
    },
    children: (
      <>
        <Typography
          variant="body1"
          color="text.primary"
          align="left"
          data-aos="fade"
        >
          <Strong>Hakkō-ryū</Strong> (八光流) is a school of jujutsu founded in{" "}
          <Strong>1941</Strong> by <Strong>Okuyama Ryuho</Strong> (1901–1987), 
          descendant of <Strong>Daito-ryu</Strong> and practitioner of{" "}
          <Strong>shiatsu</Strong>. The name translates as{" "}
          <Strong>"The Style of the Eighth Light"</Strong>, referring to the{" "}
          <Strong>ultraviolet band</Strong> — invisible yet powerful, like the 
          techniques themselves.
        </Typography>
        <Typography
          variant="body1"
          color="text.primary"
          align="left"
          data-aos="fade"
        >
          This <Strong>humanitarian martial technique</Strong> focuses on{" "}
          <Strong>qi meridian points</Strong> sensitive to pain, allowing 
          defenders to create sharp distracting pain without causing serious 
          injury. The meaning reflects that <Strong>true efficiency is invisible 
          to the eyes</Strong>, just as ultraviolet rays are invisible but very 
          powerful.
        </Typography>
      </>
    ),
  },
  {
    sectionTitle: "Hakko Denshin Ryu Jujutsu",
    imageFirstOnDesktop: true,
    image: {
      lowQualitySrc: hakkoDenshinRyuLowQualityImage,
      highQualitySrc: hakkoDenshinRyuHighQualityImage,
    },
    children: (
      <>
        <Typography
          variant="body1"
          color="text.primary"
          align="left"
          data-aos="fade"
        >
          <Strong>Hakko Denshin Ryu Jujutsu</Strong> (八光伝心流柔術) was founded 
          in <Strong>1997</Strong> by <Strong>Yasuhiro Irie</Strong>,{" "}
          <Strong>Michael LaMonica</Strong>, and <Strong>Antonio Garcia</Strong> — 
          all high-ranking Hakko Ryu practitioners. The name means{" "}
          <Strong>"Heart and Spirit of Hakko Ryu"</Strong>, known in Japan as{" "}
          <Strong>Kokodo</Strong> (皇光道).
        </Typography>
        <Typography
          variant="body1"
          color="text.primary"
          align="left"
          data-aos="fade"
        >
          Each founder became a director (<Strong>"Soke"</Strong>) in their 
          respective regions (<Strong>Japan</Strong>, <Strong>USA</Strong>,{" "}
          <Strong>Europe</Strong>) and formed the <Strong>Kokodo Renmei</Strong>{" "}
          federation. Other descendants include <Strong>Dentokan Jujutsu</Strong>{" "}
          founded by Roy Hobbs, and <Strong>Hakko Densho Ryu</Strong> founded 
          by Palumbo in Colorado.
        </Typography>
      </>
    ),
  },
  {
    sectionTitle: "Philosophy",
    image: {
      lowQualitySrc: mobileLowQuality,
      highQualitySrc: mobileHighQuality,
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
    children: (
      <>
        <Typography
          variant="body1"
          color="text.primary"
          align="left"
          data-aos="fade"
        >
          <Strong>Hakko Denshin Ryu</Strong> is based on the same fundamental
          principles as traditional Hakko Ryu, enriched with philosophies that
          promote not only <Strong>physical strength</Strong> but also{" "}
          <Strong>mental resilience</Strong> and{" "}
          <Strong>personal growth</Strong>.
        </Typography>
        <Typography
          variant="body1"
          color="text.primary"
          align="left"
          data-aos="fade"
        >
          Our curriculum incorporates both <Strong>unarmed techniques</Strong>
          {" "}and training with traditional Japanese weapons and objects such
          as the <Strong>tambo</Strong>, <Strong>jo</Strong>,{" "}
          <Strong>katana</Strong>, <Strong>tanto</Strong>,{" "}
          <Strong>sensu (fan)</Strong>, <Strong>kasa (umbrella)</Strong>,{" "}
          <Strong>walking cane</Strong>, <Strong>paper scroll</Strong>, and many
          more. These tools symbolize the <Strong>adaptability</Strong>
          {" "}and <Strong>grace</Strong> inherent in Hakko Denshin Ryu.
        </Typography>
        <Typography
          variant="body1"
          color="text.primary"
          align="left"
          data-aos="fade"
        >
          At the heart of our practice are the principles of{" "}
          <Strong>datsuryoku</Strong> (effortless power) and{" "}
          <Strong>kuzushi</Strong> (balance breaking). We use{" "}
          <Strong>pain as a tool of distraction</Strong>, blending it seamlessly
          with techniques that emphasize <Strong>humility</Strong>
          {" "}and <Strong>harmony</Strong>.
        </Typography>
        <Typography
          variant="body1"
          color="text.primary"
          align="left"
          data-aos="fade"
        >
          <Strong>Hakko Ryu Denshin Ryu</Strong> is a practice that goes beyond
          the dojo. It is a <Strong>philosophy</Strong> that guides
          decision-making, supports <Strong>mental well-being</Strong>, and 
          enriches <Strong>social interactions</Strong>. We aim to empower our 
          students, cultivating not just skilled practitioners but{" "}
          <Strong>confident, humble individuals</Strong> who embody{" "}
          <Strong>respect</Strong> and <Strong>tradition</Strong> in all areas 
          of life.
        </Typography>
      </>
    ),
  },
  {
    sectionTitle: "Ju Jutsu 柔術",
    imageFirstOnDesktop: true,
    image: {
      lowQualitySrc: shiatsuLowQualityImage,
      highQualitySrc: shiatsuHighQualityImage,
    },
    children: (
      <>
        <Typography
          variant="body1"
          color="text.primary"
          align="left"
          data-aos="fade"
        >
          The term <Strong>Ju-Jutsu</Strong> (柔術) is a Japanese word which
          refers to a kind or group of disciplines or arts (術) whose efficiency
          lies in an <Strong>appropriate and precise gesture</Strong> (柔) 
          whatever the situation may be. It is not only a{" "}
          <Strong>self-defense method</Strong> which can be traced back to
          the <Strong>Samurai</Strong> (侍) period, but it is also a way of{" "}
          <Strong>improving oneself</Strong> by practicing in a traditional way.
        </Typography>
        <Typography
          variant="body1"
          color="text.primary"
          align="left"
          data-aos="fade"
        >
          For a very long time, oriental people have understood that{" "}
          <Strong>suppleness</Strong> and <Strong>adaptability</Strong>{" "}
          mean life, whereas <Strong>hardness</Strong> and{" "}
          <Strong>stiffness</Strong> are often synonymous with death.{" "}
          <Strong>Shirobei Akiyama</Strong>, a doctor from Nagasaki, is said to
          have observed a <Strong>willow tree</Strong> during a snowy winter.
          The branches of the tree did not resist the weight of the snow and so
          bent, allowing the snow to eventually fall off them when they would
          then return to their original position.
        </Typography>
        <Typography
          variant="body1"
          color="text.primary"
          align="left"
          data-aos="fade"
        >
          On the other hand, the <Strong>cherry tree</Strong>, which resisted
          the weight of the snow without bending, would often have its branches
          broken when the accumulated snow became too heavy. Akiyama later
          founded a ju-jutsu style he named <Strong>Yoshin Ryu</Strong> (楊心流): 
          the <Strong>"willow heart style/school"</Strong>. This{" "}
          <Strong>non-resistance principle</Strong> also influenced{" "}
          <Strong>Jigoro Kano</Strong> when he created his{" "}
          <Strong>Kodokan Judo</Strong> (講道館柔道) some 300 years later.
        </Typography>
        <Typography
          variant="body1"
          color="text.primary"
          align="left"
          data-aos="fade"
        >
          Around <Strong>1600</Strong>, after centuries of wars, conflicts and
          unrest, a long era of <Strong>relative peace</Strong> was established
          in <Strong>Edo</Strong> (currently Tokyo) and spread throughout the
          country. Influenced by the <Strong>Bushido</Strong>
          {" "}(武士道: honor code of the Samurai) and the spiritual values of
          some masters, the <Strong>Ju-Jutsu Ryuha</Strong> (流派:
          schools/styles) were at the origin of new research with a more{" "}
          <Strong>educational</Strong>, <Strong>philosophical</Strong>, or even
          sometimes <Strong>religious</Strong> aim.
        </Typography>
        <Typography
          variant="body1"
          color="text.primary"
          align="left"
          data-aos="fade"
        >
          The martial techniques/arts (<Strong>Bugei</Strong>, 武芸)
          became <Strong>Budo</Strong>
          (武道: the Path of Combat) and the support for{" "}
          <Strong>spiritual improvement</Strong>. More than just making oneself
          able to defeat one or even several opponents,{" "}
          <Strong>Ju-Jutsu</Strong> allows one to develop qualities such
          as <Strong>observation</Strong>, <Strong>control</Strong>,{" "}
          <Strong>stability</Strong>, <Strong>adaptability</Strong>,{" "}
          <Strong>respect for others</Strong>, <Strong>health</Strong>…
          and <Strong>harmony</Strong>. This is still the challenge that traditional
          Ju-Jutsu schools offer in our modern world.
        </Typography>
      </>
    ),
  },
  {
    sectionTitle: "Shiatsu 指圧",
    image: {
      lowQualitySrc: contactLowQualityImage,
      highQualitySrc: contactHighQualityImage,
    },
    children: (
      <Typography
        variant="body1"
        color="text.primary"
        align="left"
        data-aos="fade"
      >
        <Strong>Shi</Strong> (指) means <Strong>"finger"</Strong> and{" "}
        <Strong>atsu</Strong> (圧) means <Strong>"pressure"</Strong>.{" "}
        <Strong>Shiatsu</Strong> is a technique aiming at maintaining or
        recovering the <Strong>energetic balance</Strong> our body needs to be
        healthy.
      </Typography>
    ),
  },
  {
    sectionTitle: "Goshin Taiso 護身体操",
    imageFirstOnDesktop: true,
    image: {
      lowQualitySrc: goshinTaisoLowQualityImage,
      highQualitySrc: goshinTaisoHighQualityImage,
    },
    children: (
      <Typography
        variant="body1"
        color="text.primary"
        align="left"
        data-aos="fade"
      >
        <Strong>Goshin</Strong> (護身) means <Strong>"protection"</Strong>
        {" "}or <Strong>"defense"</Strong> and <Strong>taiso</Strong> (体操) means{" "}
        <Strong>"gymnastics"</Strong>. <Strong>Goshin Taiso</Strong> is a
        gymnastic system used to maintain the equilibrium of the forces present
        in our body. It is practiced alone and allows any individual to make
        their own <Strong>energetic evaluation</Strong>.
      </Typography>
    ),
  },
];

const HakkoRyu = () => <SectionsList sections={sections} />;

export default HakkoRyu;
