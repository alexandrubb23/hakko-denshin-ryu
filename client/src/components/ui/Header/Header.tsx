import { Box } from "@mui/material";
import { ARC_NAV_HIDDEN_SX } from "@style/arcNavLayout";
import { normalizePath } from "@utils/routes";
import { useLocation } from "react-router";

import Logo from "./Logo";
import NavMenu from "./NavMenu/NavMenu";

const Header = () => {
  const location = useLocation();

  // The wide-screen home hero has its own arc menu and language switcher
  const isHome = location.pathname === normalizePath("home");

  return (
    // `&.header` outweighs the `.header { display: flex }` rule in App.css
    <Box
      className="header"
      sx={isHome ? { "&.header": ARC_NAV_HIDDEN_SX } : undefined}
    >
      <Logo />
      <NavMenu />
    </Box>
  );
};

export default Header;
