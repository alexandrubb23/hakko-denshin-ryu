import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightModeOutlined";
import { IconButton, Tooltip } from "@mui/material";
import { useIntl } from "react-intl";

import useColorSchemePreference from "@hooks/useColorSchemePreference";
import { stripDiacritics } from "@utils/string";

import { toggleSx } from "./ColorSchemeToggle.style";

/** Switches the public pages between the dark and light schemes */
const ColorSchemeToggle = () => {
  const intl = useIntl();
  const [scheme, setScheme] = useColorSchemePreference();
  const isLight = scheme === "light";

  const label = intl.formatMessage({
    id: isLight ? "ui.colorScheme.toDark" : "ui.colorScheme.toLight",
  });

  return (
    // Rendered in Jarene (the theme's font), which has no diacritic glyphs
    <Tooltip title={stripDiacritics(label)}>
      <IconButton
        aria-label={label}
        onClick={() => setScheme(isLight ? "dark" : "light")}
        sx={toggleSx}
      >
        {isLight ? (
          <DarkModeIcon fontSize="small" />
        ) : (
          <LightModeIcon fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ColorSchemeToggle;
