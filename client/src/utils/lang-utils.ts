export const setLangCookie = (lang: string) => {
  document.cookie = `lang=${lang}; path=/; max-age=31536000`; // 1 year
};
