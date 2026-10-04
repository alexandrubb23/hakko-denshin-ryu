import { Box } from "@mui/material";
import { useLocation } from "react-router";

import { NOT_FOUND_PAGE, findPage } from "../../../pages";
import CoverControls from "../CoverControls/CoverControls";

import Logo from "./Logo";
import NavMenu from "./NavMenu/NavMenu";

const Header = () => {
  const location = useLocation();

  // Moon covers have their own arc menu; only their controls stay pinned
  if ((findPage(location.pathname) ?? NOT_FOUND_PAGE).cover) {
    return <CoverControls />;
  }

  return (
    <Box className="header">
      <Logo />
      <NavMenu />
    </Box>
  );
};

export default Header;
