export interface Technique {
  number: number;
  name: string;
}

export interface BodyPositionGroup {
  id: string;
  name: string;
  techniques: Technique[];
}

export interface Suite {
  id: string;
  name: string;
  description: string;
  groups: BodyPositionGroup[];
}

export const techniques: Suite[] = [
  {
    id: "shodan-gi",
    name: "SHODAN GI 初段技",
    description:
      "The foundation of Hakko Denshin Ryu. First-degree techniques introduce the core principles of meridian-based control, joint manipulation, and pain-compliant throws practiced from seated, half-standing, and standing positions, as well as with the short staff (tambo).",
    groups: [
      {
        id: "shodan-suwari",
        name: "SUWARI WAZA 座技",
        techniques: [
          { number: 1, name: "Hakko dori 八光捕" },
          { number: 2, name: "Kao ate 顔当" },
          { number: 3, name: "Hiza gatame 膝固" },
          { number: 4, name: "Te kagami 手鏡" },
          { number: 5, name: "Aiki nage 合気投" },
          { number: 6, name: "Ude osae dori 腕押捕" },
          { number: 7, name: "Mune osae dori 胸押捕" },
          { number: 8, name: "Uchikomi dori 打込捕" },
        ],
      },
      {
        id: "shodan-hantachi",
        name: "HANTACHI WAZA 半立技",
        techniques: [
          { number: 1, name: "Yoko katate osae dori 横片手押捕" },
          { number: 2, name: "Kiza morote osae dori 椅座諸手押捕" },
        ],
      },
      {
        id: "shodan-tachi",
        name: "TACHI WAZA 立技",
        techniques: [
          { number: 1, name: "Hakko zeme dori 八光攻捕" },
          { number: 2, name: "Tachi ate 立当" },
          { number: 3, name: "Tachi te kagami 立手鏡" },
          { number: 4, name: "Hiki nage 引投" },
          { number: 5, name: "Ude osae dori 腕押捕" },
          { number: 6, name: "Mune osae dori 胸押捕" },
          { number: 7, name: "Uchikomi dori 打込捕" },
          { number: 8, name: "Kubi shime dori 首締捕" },
          { number: 9, name: "Ushiro zeme otoshi 後攻落" },
        ],
      },
      {
        id: "shodan-tambo",
        name: "TAMBO-JUTSU 短棒術",
        techniques: [
          { number: 1, name: "Furi age 振上" },
          { number: 2, name: "Furi gyaku kubi jime 振逆首締" },
          { number: 3, name: "Furi hadaka jime 振裸締" },
          { number: 4, name: "Yoko gyakute ude hishigi 横逆手腕挫" },
          { number: 5, name: "Yoko katate kannuki gatame 横片手閂固" },
          { number: 6, name: "Yokomen uchi te kagami 横面打手鏡" },
          { number: 7, name: "Ura yokomen uchi konoha gaeshi 裏横面打木葉返" },
          { number: 8, name: "Ura yokomen uchi mune gatame 裏横面打胸固" },
          { number: 9, name: "Ude osae dori 腕押捕" },
          { number: 10, name: "Mune osae dori 胸押捕" },
          { number: 11, name: "Uchikomi dori 打込捕" },
          { number: 12, name: "Shomen uchi tenchi nage 正面打天地投" },
          { number: 13, name: "Shomen uchi kata gatame 正面打肩固" },
        ],
      },
    ],
  },
  {
    id: "nidan-gi",
    name: "NIDAN GI 二段技",
    description:
      "Second-degree techniques build on the foundational principles with more complex entries, additional throwing and pinning applications, and the introduction of the long staff (jo) as a training instrument.",
    groups: [
      {
        id: "nidan-suwari",
        name: "SUWARI WAZA 座技",
        techniques: [
          { number: 1, name: "Matsuba dori 松葉捕" },
          { number: 2, name: "Te kagami 手鏡" },
          { number: 3, name: "Ude osae dori 腕押捕" },
          { number: 4, name: "Mune osae dori 胸押捕" },
          { number: 5, name: "Konoha gaeshi 木葉返" },
          { number: 6, name: "Uchikomi dori 打込捕" },
        ],
      },
      {
        id: "nidan-hantachi",
        name: "HANTACHI WAZA 半立技",
        techniques: [
          { number: 1, name: "Mae ryote osae dori 前両手押捕" },
          { number: 2, name: "Mae morote osae dori 前諸手押捕" },
        ],
      },
      {
        id: "nidan-tachi",
        name: "TACHI WAZA 立技",
        techniques: [
          { number: 1, name: "Matsuba dori 松葉捕" },
          { number: 2, name: "Makikomi 巻込" },
          { number: 3, name: "Shuto jime 手刀絞" },
          { number: 4, name: "Mune konoha gaeshi 胸木葉返" },
          { number: 5, name: "Konoha gaeshi 木葉返" },
          { number: 6, name: "Te kagami 手鏡" },
          { number: 7, name: "Ude osae dori 腕押捕" },
          { number: 8, name: "Mune osae dori 胸押捕" },
          { number: 9, name: "Aya dori 綾捕" },
          { number: 10, name: "Uchikomi dori 打込捕" },
          { number: 11, name: "Mae niho nage 前二方投" },
          { number: 12, name: "Ushiro niho nage 後二方投" },
        ],
      },
      {
        id: "nidan-jo",
        name: "JO-JUTSU 杖術",
        techniques: [
          { number: 1, name: "Tsuki iri 突入" },
          { number: 2, name: "Koshi ori 腰折" },
          { number: 3, name: "Ashi gatame 足固" },
          { number: 4, name: "Ganseki otoshi 岩石落" },
          { number: 5, name: "Tsuki ryufu 突龍風" },
          { number: 6, name: "Ryo mune dori 両胸捕" },
          { number: 7, name: "Ude makikomi 腕巻込" },
          { number: 8, name: "Jo gaeshi 杖返" },
          { number: 9, name: "Ushiro benkei dori 後弁慶捕" },
          { number: 10, name: "Ushiro ashi dori 後足捕" },
          { number: 11, name: "Age ashi gatame 上足固" },
          { number: 12, name: "Ashi garami 足絡" },
        ],
      },
    ],
  },
  {
    id: "sandan-gi",
    name: "SANDAN GI 三段技",
    description:
      "Third-degree techniques develop advanced control from multiple attack angles, including rear attacks, clothing grabs, and the specialised seated sword-drawing forms of Goshin Iai.",
    groups: [
      {
        id: "sandan-suwari",
        name: "SUWARI WAZA 座技",
        techniques: [
          { number: 1, name: "Ude osae dori 腕押捕" },
          { number: 2, name: "Mune osae dori 胸押捕" },
          { number: 3, name: "Te kagami 手鏡" },
          { number: 4, name: "Uchikomi dori 打込捕" },
          { number: 5, name: "Tsukimi dori 突身捕" },
          { number: 6, name: "Aya dori 綾捕" },
        ],
      },
      {
        id: "sandan-hantachi",
        name: "HANTACHI WAZA 半立技",
        techniques: [
          { number: 1, name: "Yoko dori 横捕" },
          { number: 2, name: "Morote osae dori 諸手押捕" },
          { number: 3, name: "Ushiro gyaku kubi jime dori 後逆首締捕" },
        ],
      },
      {
        id: "sandan-tachi",
        name: "TACHI WAZA 立技",
        techniques: [
          { number: 1, name: "Matsuba dori 松葉捕" },
          { number: 2, name: "Ryo mune osae dori 両胸押捕" },
          { number: 3, name: "Emon dori 衣紋捕" },
          { number: 4, name: "Te kagami 手鏡" },
          { number: 5, name: "Te kagami 2 手鏡" },
          { number: 6, name: "Uchikomi dori 打込捕" },
          { number: 7, name: "Tsukimi dori 突身捕" },
          { number: 8, name: "Katamune osae mochimawari 片胸押持廻" },
          { number: 9, name: "Katamune osae mochimawari 2 片胸押持廻" },
          { number: 10, name: "Yokomen uchi mochimawari 橫面打持廻" },
          { number: 11, name: "Ryote mochimawari 両手持廻" },
          { number: 12, name: "Ushiro zeme dori 後攻捕" },
          { number: 13, name: "Ushiro emon dori 後衣紋捕" },
          { number: 14, name: "Ushiro obi hiki dori 後帯引捕" },
          { number: 15, name: "Ushiro obi hiki dori 2 後帯引捕" },
          { number: 16, name: "Mae obi hiki dori 前帯引捕" },
          { number: 17, name: "Mae obi hiki dori 2 前帯引捕" },
          { number: 18, name: "Nuki uchi dori 抜打捕" },
          { number: 19, name: "Tsukkomi dori 突込捕" },
          { number: 20, name: "Ushiro hakko dori 後八光捕" },
        ],
      },
      {
        id: "sandan-goshin",
        name: "GOSHIN IAI 護身居合",
        techniques: [
          { number: 1, name: "Ude dori 腕捕" },
          { number: 2, name: "Mune dori 胸捕" },
          { number: 3, name: "Mae niho nage 前二方投" },
          { number: 4, name: "Yoko gyakute dori 横逆手捕" },
          { number: 5, name: "Yokomen tsuki mochimawari 横面突持廻" },
          { number: 6, name: "Konoha gaeshi 木葉返" },
          { number: 7, name: "Tsukimi nage 突身投" },
          { number: 8, name: "Gyaku matsuba dori 逆松葉捕" },
          { number: 9, name: "Te kagami 手鏡" },
          { number: 10, name: "Emon dori 衣紋捕" },
          { number: 11, name: "Ushiro emon dori 後衣紋捕" },
        ],
      },
    ],
  },
  {
    id: "yondan-gi",
    name: "YONDAN GI 四段技",
    description:
      "Fourth-degree techniques represent the highest level of refinement — multiple attackers, weapon draws, and precision control techniques that demand complete mastery of the entire system.",
    groups: [
      {
        id: "yondan-suwari",
        name: "SUWARI WAZA 座技",
        techniques: [
          { number: 1, name: "Mune osae dori 胸押捕" },
          { number: 2, name: "Ude osae dori 腕押捕" },
          { number: 3, name: "Emon dori 衣紋捕" },
          { number: 4, name: "Te kagami 手鏡" },
        ],
      },
      {
        id: "yondan-hantachi",
        name: "HANTACHI WAZA 半立技",
        techniques: [
          { number: 1, name: "Yoko dori 横捕" },
          { number: 2, name: "Yoko ninin dori 横二人捕" },
        ],
      },
      {
        id: "yondan-tachi",
        name: "TACHI WAZA 立技",
        techniques: [
          { number: 1, name: "Mune dori 胸捕" },
          { number: 2, name: "Te kagami 手鏡" },
          { number: 3, name: "Tsukimi dori 突身捕" },
          { number: 4, name: "Ushiro zeme dori 後攻捕" },
          { number: 5, name: "Ushiro hakko dori 後八光捕" },
          { number: 6, name: "Uchikomi dori 打込捕" },
          { number: 7, name: "Shomen ate dori 正面当捕" },
          { number: 8, name: "Yokomen uchi dori 横面打捕" },
          { number: 9, name: "Oikake dori 追懸捕" },
          { number: 10, name: "Oikake dori 2 追懸捕" },
          { number: 11, name: "Heiko dori 並行捕" },
          { number: 12, name: "Kote gaeshi dori 小手返捕" },
          { number: 13, name: "Shomen uchi dori 正面打捕" },
          { number: 14, name: "Nuki uchi dori 抜打捕" },
          { number: 15, name: "Tsukkomi dori 突込捕" },
        ],
      },
    ],
  },
];
