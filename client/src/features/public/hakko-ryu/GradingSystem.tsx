import CardGrid from "@components/ui/PageSections/CardGrid";

import beltMudansha from "@assets/grades/belt-mudansha.webp";
import beltShihansha from "@assets/grades/belt-shihansha.webp";
import beltYudansha from "@assets/grades/belt-yudansha.webp";

import GradeCard, { Tier } from "./GradeCard";

const TIERS: Tier[] = [
  {
    title: "Mudansha",
    kanji: "無段者",
    index: "壱",
    subtitleId: "page.hakko-ryu.grades.mudansha.subtitle",
    belt: beltMudansha,
    grade: "kyu",
    ranks: [
      { name: "Rokkyū", kanji: "六級", n: 6 },
      { name: "Gokyū", kanji: "五級", n: 5 },
      { name: "Yonkyū", kanji: "四級", n: 4 },
      { name: "Sankyū", kanji: "三級", n: 3 },
      { name: "Nikyū", kanji: "二級", n: 2 },
      { name: "Ikkyū", kanji: "一級", n: 1 },
    ],
  },
  {
    title: "Yudansha",
    kanji: "有段者",
    index: "弐",
    subtitleId: "page.hakko-ryu.grades.yudansha.subtitle",
    belt: beltYudansha,
    grade: "dan",
    ranks: [
      { name: "Shodan", kanji: "初段", n: 1 },
      { name: "Nidan", kanji: "弐段", n: 2 },
      { name: "Sandan", kanji: "参段", n: 3 },
      { name: "Yondan", kanji: "四段", n: 4 },
    ],
  },
  {
    title: "Shihansha",
    kanji: "師範者",
    index: "参",
    subtitleId: "page.hakko-ryu.grades.shihansha.subtitle",
    belt: beltShihansha,
    grade: "dan",
    ranks: [
      { name: "Kōshi", kanji: "光師", n: 5 },
      { name: "Kageshi", kanji: "影師", n: 6 },
      { name: "Kaiden Shihan", kanji: "皆伝師範", n: 7 },
      { name: "Myōshi Shihan", kanji: "妙師", n: 8 },
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
