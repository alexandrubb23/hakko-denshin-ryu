import LanguageSwitcher from "@components/ui/LanguageSwitcher/LanguageSwitcher";

import { ListItemStyle } from "./ListPages.style";

const LangItem = () => (
  <ListItemStyle key="language-switcher" sx={{ paddingTop: 0 }}>
    <LanguageSwitcher />
  </ListItemStyle>
);

export default LangItem;
