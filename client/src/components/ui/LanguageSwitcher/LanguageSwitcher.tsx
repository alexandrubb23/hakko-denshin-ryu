import { Button } from "@mui/material";

import { controlOutlineSx } from "@components/ui/PageSections/PageSections.style";
import useLangStore from "@store/useLangStore";
import useCloseMenuOnLangChange from "@hooks/useCloseMenuOnLangChange";

const LanguageSwitcher = () => {
  useCloseMenuOnLangChange();

  const lang = useLangStore((state) => state.lang);
  const toggleLang = useLangStore((state) => state.toggleLang);

  const label = lang === "ro" ? "EN" : "RO";

  return (
    <Button variant="outlined" onClick={toggleLang} sx={controlOutlineSx}>
      {label}
    </Button>
  );
};

export default LanguageSwitcher;
