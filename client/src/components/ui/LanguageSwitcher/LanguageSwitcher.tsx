import { Button } from "@mui/material";

import { toggleOutlineSx } from "@components/ui/ColorSchemeToggle/ColorSchemeToggle.style";
import useLangStore from "@store/useLangStore";
import useCloseMenuOnLangChange from "@hooks/useCloseMenuOnLangChange";

const LanguageSwitcher = () => {
  useCloseMenuOnLangChange();

  const lang = useLangStore((state) => state.lang);
  const toggleLang = useLangStore((state) => state.toggleLang);

  const label = lang === "ro" ? "EN" : "RO";

  return (
    <Button variant="outlined" onClick={toggleLang} sx={toggleOutlineSx}>
      {label}
    </Button>
  );
};

export default LanguageSwitcher;
