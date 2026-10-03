import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export type ColorScheme = "dark" | "light";

/**
 * The visitor's chosen scheme for the public pages, kept in local storage and
 * shared by every caller. Read after mounting, so the first render matches
 * the server's (dark).
 */
const useColorSchemePreference = () =>
  useLocalStorage<ColorScheme>("color-scheme", "dark", {
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
    root.dataset.colorScheme = scheme;
    return () => {
      delete root.dataset.colorScheme;
    };
  }, [scheme]);
};

export default useColorSchemePreference;
