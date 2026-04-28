import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Lang = 'ro' | 'en';

interface LangStore {
  lang: Lang;
  toggleLang: () => void;
  setLang: (lang: Lang) => void;
  hydrated: boolean;
  setHydrated: () => void;
}

const DEFAULT_LANG = 'ro';
export const LANG_STORAGE_KEY = 'lang-storage';

const useLangStore = create<LangStore>()(
  persist(
    set => ({
      lang: DEFAULT_LANG,
      hydrated: false,
      toggleLang: () =>
        set(state => ({ lang: state.lang === 'ro' ? 'en' : 'ro' })),
      setLang: lang => set({ lang }),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: LANG_STORAGE_KEY,
      onRehydrateStorage: () => state => {
        state?.setHydrated();
      },
    }
  )
);

export default useLangStore;
