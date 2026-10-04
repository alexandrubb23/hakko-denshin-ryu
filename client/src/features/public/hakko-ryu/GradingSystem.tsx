import CardGrid from "@components/ui/PageSections/CardGrid";

import beltMudansha from "@assets/grades/belt-mudansha.webp";
import beltShihansha from "@assets/grades/belt-shihansha.webp";
import beltYudansha from "@assets/grades/belt-yudansha.webp";

import GradeCard, { Tier } from "./GradeCard";
import { DAN_RANKS, KYU_RANKS } from "./ranks";

const TIERS: Tier[] = [
  {
    title: "Mudansha",
    kanji: "無段者",
    index: "壱",
    subtitleId: "page.hakko-ryu.grades.mudansha.subtitle",
    belt: beltMudansha,
    grade: "kyu",
    ranks: KYU_RANKS,
  },
  {
    title: "Yudansha",
    kanji: "有段者",
    index: "弐",
    subtitleId: "page.hakko-ryu.grades.yudansha.subtitle",
    belt: beltYudansha,
    grade: "dan",
    ranks: DAN_RANKS,
  },
  {
    title: "Shihan",
    kanji: "師範者",
    index: "参",
    subtitleId: "page.hakko-ryu.grades.shihansha.subtitle",
    belt: beltShihansha,
    grade: "dan",
    // Titles rather than grades; the dan beside each is only a familiar equivalent
    ranks: [
      { name: "Shihan", kanji: "師範", n: 5 },
      { name: "Kaiden Shihan", kanji: "皆伝師範", n: 6 },
      { name: "Sandai Kichu", kanji: "三大基柱", n: 7 },
    ],
  },
];

/** The three circles of rank, side by side */
const GradingSystem = () => (
  <CardGrid size={{ xs: 12, md: 4 }} stagger={0.12}>
    {TIERS.map((tier) => (
      <GradeCard key={tier.title} {...tier} />
    ))}
  </CardGrid>
);

export default GradingSystem;
