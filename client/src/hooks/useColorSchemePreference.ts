import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

import { type ColorScheme, SCHEME_ATTR } from "@style/colorScheme";

const COLOR_SCHEME_STORAGE_KEY = "color-scheme";

/**
 * The visitor's chosen scheme for the public pages, kept in local storage and
 * shared by every caller. Read after mounting, so the first render matches
 * the server's (dark).
 */
const useColorSchemePreference = () =>
  useLocalStorage<ColorScheme>(COLOR_SCHEME_STORAGE_KEY, "dark", {
    initializeWithValue: false,
  });

/**
 * Applies the chosen scheme to the page (see `@style/colorScheme`) while the
 * caller is mounted, so it reaches only the pages that call it
 */
export const useApplyColorScheme = () => {
  const [scheme] = useColorSchemePreference();

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute(SCHEME_ATTR, scheme);
    return () => root.removeAttribute(SCHEME_ATTR);
  }, [scheme]);
};

export default useColorSchemePreference;
