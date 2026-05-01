export interface KyuTechnique {
  number: number;
  name: string;
  isKihon: boolean;
}

export interface KyuGroup {
  id: string;
  name: string;
  techniques: KyuTechnique[];
}

export interface KyuLevel {
  id: string;
  name: string;
  shortName: string;
  belt: string;
  groups: KyuGroup[];
}

export const kyuProgram: KyuLevel[] = [
  {
    id: "5e-kyu",
    name: "5e KYU 五級",
    shortName: "5th Kyu",
    belt: "yellow",
    groups: [
      {
        id: "5e-suwari",
        name: "SUWARI WAZA 座技",
        techniques: [
          { number: 1, name: "Hakko dori 八光捕", isKihon: true },
          { number: 2, name: "Kao ate 顔当", isKihon: true },
          { number: 3, name: "Hiza gatame 膝固", isKihon: true },
          { number: 4, name: "Te kagami 手鏡", isKihon: true },
          { number: 5, name: "Waki gatame 脇固", isKihon: false },
        ],
      },
      {
        id: "5e-tachi",
        name: "TACHI WAZA 立技",
        techniques: [
          { number: 1, name: "Hakko zeme dori 八光攻捕", isKihon: true },
          { number: 2, name: "Tachi ate 立当", isKihon: true },
          { number: 3, name: "Te kagami 立手鏡", isKihon: true },
          { number: 4, name: "Waki gatame 脇固", isKihon: false },
        ],
      },
    ],
  },
  {
    id: "4e-kyu",
    name: "4e KYU 四級",
    shortName: "4th Kyu",
    belt: "orange",
    groups: [
      {
        id: "4e-suwari",
        name: "SUWARI WAZA 座技",
        techniques: [
          { number: 1, name: "Aiki nage 合気投", isKihon: true },
          { number: 2, name: "Ude osae dori (elbow) 腕押捕", isKihon: false },
          { number: 3, name: "Mune osae dori (elbow) 胸押捕", isKihon: false },
        ],
      },
      {
        id: "4e-hantachi",
        name: "HANTACHI WAZA 半立技",
        techniques: [
          {
            number: 1,
            name: "Yoko katate osae dori 横片手押捕",
            isKihon: true,
          },
          {
            number: 2,
            name: "Kiza morote osae dori 椅座諸手押捕",
            isKihon: true,
          },
        ],
      },
      {
        id: "4e-tachi",
        name: "TACHI WAZA 立技",
        techniques: [
          { number: 1, name: "Hiki nage 引投", isKihon: true },
          {
            number: 2,
            name: "Tenbin nage (on Katate dori) 天秤投",
            isKihon: false,
          },
          {
            number: 3,
            name: "Kote gaeshi (on Katate dori) 小手返",
            isKihon: false,
          },
          {
            number: 4,
            name: "Kote mawashi (on Katate dori) 小手回",
            isKihon: false,
          },
          { number: 5, name: "Ude osae dori (elbow) 腕押捕", isKihon: false },
          { number: 6, name: "Mune osae dori (elbow) 胸押捕", isKihon: false },
        ],
      },
    ],
  },
  {
    id: "3e-kyu",
    name: "3e KYU 三級",
    shortName: "3rd Kyu",
    belt: "green",
    groups: [
      {
        id: "3e-suwari",
        name: "SUWARI WAZA 座技",
        techniques: [
          {
            number: 1,
            name: "(Ryo) Ude osae dori (kata form) (両)腕押捕",
            isKihon: true,
          },
          { number: 2, name: "Soto ude garami 外腕絡", isKihon: false },
          {
            number: 3,
            name: "(Ryo) Mune osae dori (kata form) (両)胸押捕",
            isKihon: true,
          },
          {
            number: 4,
            name: "Uchi komi dori (on Shomen uchi) 打込捕",
            isKihon: true,
          },
          { number: 5, name: "Kuruma daoshi 車倒", isKihon: false },
        ],
      },
      {
        id: "3e-tachi",
        name: "TACHI WAZA 立技",
        techniques: [
          {
            number: 1,
            name: "(Ryo) Ude osae dori (kata form) (両)腕押捕",
            isKihon: true,
          },
          { number: 2, name: "Soto ude garami 外腕絡", isKihon: false },
          {
            number: 3,
            name: "(Ryo) Mune osae dori (kata form) (両)胸押捕",
            isKihon: true,
          },
          {
            number: 4,
            name: "Uchi komi dori (on Shomen uchi) 打込捕",
            isKihon: true,
          },
          { number: 5, name: "Kuruma daoshi 車倒", isKihon: false },
          { number: 6, name: "Mae shiho nage 前四方投", isKihon: false },
          { number: 7, name: "Ushiro shiho nage 後四方投", isKihon: false },
          {
            number: 8,
            name: "Kote gaeshi (on Ushiro ryote dori) 小手返",
            isKihon: false,
          },
          {
            number: 9,
            name: "Kote mawashi (on Ushiro ryote dori) 小手回",
            isKihon: false,
          },
          {
            number: 10,
            name: "Waki gatame (on Ushiro ryote dori) 脇固",
            isKihon: false,
          },
        ],
      },
    ],
  },
  {
    id: "2e-kyu",
    name: "2e KYU 二級",
    shortName: "2nd Kyu",
    belt: "blue",
    groups: [
      {
        id: "2e-suwari",
        name: "SUWARI WAZA 座技",
        techniques: [
          { number: 1, name: "Uchi ude garami 内腕絡", isKihon: false },
          {
            number: 2,
            name: "Uchi komi dori (on Jodan tsuki) 打込捕",
            isKihon: true,
          },
        ],
      },
      {
        id: "2e-tachi",
        name: "TACHI WAZA 立技",
        techniques: [
          { number: 1, name: "Shichi ri biki 七里引", isKihon: false },
          { number: 2, name: "Uchi ude garami 内腕絡", isKihon: false },
          { number: 3, name: "Kubi jime dori 首締捕", isKihon: true },
          { number: 4, name: "Obi otoshi 帯落", isKihon: false },
          {
            number: 5,
            name: "Uchi komi dori (on Jodan tsuki) 打込捕",
            isKihon: true,
          },
          { number: 6, name: "Kote gaeshi 小手返", isKihon: false },
          { number: 7, name: "Goshin nage 護身投", isKihon: false },
          { number: 8, name: "Ushiro zeme otoshi 後攻落", isKihon: true },
        ],
      },
      {
        id: "2e-tambo",
        name: "TAMBO-JUTSU 短棒術",
        techniques: [
          { number: 1, name: "Furi age 振上", isKihon: true },
          { number: 2, name: "Furi gyaku kubi jime 振逆首締", isKihon: true },
        ],
      },
    ],
  },
  {
    id: "1er-kyu",
    name: "1er KYU 一級",
    shortName: "1st Kyu",
    belt: "brown",
    groups: [
      {
        id: "1er-suwari",
        name: "SUWARI WAZA 座技",
        techniques: [{ number: 1, name: "Karami nage 搦投", isKihon: false }],
      },
      {
        id: "1er-tachi",
        name: "TACHI WAZA 立技",
        techniques: [
          {
            number: 1,
            name: "Mae kakae ude garami 前抱腕絡",
            isKihon: false,
          },
          {
            number: 2,
            name: "Mae kakae ushiro gaeshi 前抱後返",
            isKihon: false,
          },
          { number: 3, name: "Tsuki ryufu 突龍風", isKihon: false },
          { number: 4, name: "Hadaka jime 裸締", isKihon: false },
          { number: 5, name: "Koshi nage 腰投", isKihon: false },
          {
            number: 6,
            name: "Juji nage (on Ushiro kubi shime) 十字投",
            isKihon: false,
          },
        ],
      },
      {
        id: "1er-tambo",
        name: "TAMBO-JUTSU 短棒術",
        techniques: [
          { number: 1, name: "Furi hadaka jime 振裸締", isKihon: true },
          {
            number: 2,
            name: "Yoko gyakute ude hishigi 横逆手腕挫",
            isKihon: true,
          },
          {
            number: 3,
            name: "Yoko katate kannuki gatame 横片手閂固",
            isKihon: true,
          },
          {
            number: 4,
            name: "Yokomen uchi te kagami 横面打手鏡",
            isKihon: true,
          },
          {
            number: 5,
            name: "Ura yokomen uchi konoha gaeshi 裏横面打木葉返",
            isKihon: true,
          },
          {
            number: 6,
            name: "Ura yokomen uchi mune gatame 裏横面打胸固",
            isKihon: true,
          },
        ],
      },
    ],
  },
];
