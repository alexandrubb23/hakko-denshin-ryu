import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightModeOutlined";
import { IconButton, Tooltip } from "@mui/material";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useLocalStorage } from "usehooks-ts";

import { stripDiacritics } from "@utils/string";

import { toggleSx } from "./ColorSchemeToggle.style";

type ColorScheme = "dark" | "light";

/**
 * PROTOTYPE: switches the page between the dark and light schemes (see
 * `@style/colorScheme`). The light scheme lasts only while this is mounted,
 * so it stays on the pages that render it.
 */
const ColorSchemeToggle = () => {
  const intl = useIntl();
  // Read after mounting, so the first render matches the server's (dark)
  const [scheme, setScheme] = useLocalStorage<ColorScheme>(
    "color-scheme",
    "dark",
    { initializeWithValue: false }
  );
  const isLight = scheme === "light";

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.colorScheme = scheme;
    return () => {
      delete root.dataset.colorScheme;
    };
  }, [scheme]);

  const label = intl.formatMessage({
    id: isLight ? "ui.colorScheme.toDark" : "ui.colorScheme.toLight",
  });

  return (
    // Rendered in Jarene (the theme's font), which has no diacritic glyphs
    <Tooltip title={stripDiacritics(label)} placement="left">
      <IconButton
        aria-label={label}
        onClick={() => setScheme(isLight ? "dark" : "light")}
        sx={toggleSx}
      >
        {isLight ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ColorSchemeToggle;
