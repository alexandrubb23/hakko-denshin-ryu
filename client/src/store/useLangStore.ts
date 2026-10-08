import { create } from "zustand";
import { persist } from "zustand/middleware";

import { getSearchParams } from "@utils/routes";

const LANGS = ["ro", "en"] as const;
export type Lang = (typeof LANGS)[number];

const isLang = (value: string | null): value is Lang =>
  LANGS.includes(value as Lang);

interface LangStore {
  lang: Lang;
  toggleLang: () => void;
  setLang: (lang: Lang) => void;
  hydrated: boolean;
  setHydrated: () => void;
}

const DEFAULT_LANG: Lang = "ro";
export const LANG_STORAGE_KEY = "lang-storage";

const useLangStore = create<LangStore>()(
  persist(
    (set) => ({
      lang: DEFAULT_LANG,
      hydrated: false,
      toggleLang: () =>
        set((state) => ({ lang: state.lang === "ro" ? "en" : "ro" })),
      setLang: (lang) => set({ lang }),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: LANG_STORAGE_KEY,
      onRehydrateStorage: () => (state) => {
        // A `?lang=ro|en` link picks the language, and it's saved like a
        // switcher click. Applied before `hydrated` so nothing shows in the
        // stored language first.
        const queryLang = getSearchParams().get("lang");
        if (isLang(queryLang)) state?.setLang(queryLang);
        state?.setHydrated();
      },
    }
  )
);

export default useLangStore;
