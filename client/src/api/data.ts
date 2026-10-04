import { Lang } from "@store/useLangStore";

type Data = {
  root: {
    header: {
      menu: {
        [key in Lang]: {
          [key: string]: string;
        };
      };
    };
  };
};

export const data: Data = {
  root: {
    header: {
      menu: {
        en: {
          home: "Home",
          "hakko-denshin-ryu": "Hakko Denshin Ryu",
          senshinkan: "Senshinkan",
          dojo: "Dojo",
          contact: "Contact",
        },
        ro: {
          home: "Acasă",
          "hakko-denshin-ryu": "Hakko Denshin Ryu",
          senshinkan: "Senshinkan",
          dojo: "Dojo",
          contact: "Contact",
        },
      },
    },
  },
};

export const headerMenu = data.root.header.menu;
