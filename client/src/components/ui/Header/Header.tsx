import { Box } from "@mui/material";
import { normalizePath } from "@utils/routes";
import { useLocation } from "react-router";

import Logo from "./Logo";
import NavMenu from "./NavMenu/NavMenu";

const Header = () => {
  const location = useLocation();

  // The home cover has its own arc menu and language switcher
  if (location.pathname === normalizePath("home")) return null;

  return (
    <Box className="header">
      <Logo />
      <NavMenu />
    </Box>
  );
};

export default Header;
