import { Box } from "@mui/material";
import { useLocation } from "react-router";

import { findPage } from "../../../pages";

import Logo from "./Logo";
import NavMenu from "./NavMenu/NavMenu";

const Header = () => {
  const location = useLocation();

  // Moon covers have their own arc menu and language switcher
  if (findPage(location.pathname)?.cover) return null;

  return (
    <Box className="header">
      <Logo />
      <NavMenu />
    </Box>
  );
};

export default Header;
