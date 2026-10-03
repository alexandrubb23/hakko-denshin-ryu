import beltBlue from "@assets/kyu/belt-blue.webp";
import beltBrown from "@assets/kyu/belt-brown.webp";
import beltGreen from "@assets/kyu/belt-green.webp";
import beltOrange from "@assets/kyu/belt-orange.webp";
import beltYellow from "@assets/kyu/belt-yellow.webp";

import type { KyuLevel } from "@api/kyuProgram";
import { Belt, type BeltValue } from "@hakko/core";

import type { IntlMessageID } from "i18n/messages";

import type { Rank } from "./GradeRank";
import { KYU_RANKS } from "./ranks";

interface KyuGrade {
  rank?: Rank;
  /** The embroidered belt */
  src: string;
  nameId: IntlMessageID;
}

const kyu = (n: number) => KYU_RANKS.find((rank) => rank.n === n);

// Each kyu level by the color of its belt
const KYU_GRADES: Partial<Record<BeltValue, KyuGrade>> = {
  [Belt.yellow]: {
    rank: kyu(5),
    src: beltYellow,
    nameId: "page.hakko-ryu.kyu.belt.yellow",
  },
  [Belt.orange]: {
    rank: kyu(4),
    src: beltOrange,
    nameId: "page.hakko-ryu.kyu.belt.orange",
  },
  [Belt.green]: {
    rank: kyu(3),
    src: beltGreen,
    nameId: "page.hakko-ryu.kyu.belt.green",
  },
  [Belt.blue]: {
    rank: kyu(2),
    src: beltBlue,
    nameId: "page.hakko-ryu.kyu.belt.blue",
  },
  [Belt.brown]: {
    rank: kyu(1),
    src: beltBrown,
    nameId: "page.hakko-ryu.kyu.belt.brown",
  },
};

/** A yellow belt level → Gokyū 五級 and its belt */
export const kyuGrade = (level: KyuLevel) =>
  KYU_GRADES[level.belt as BeltValue];
