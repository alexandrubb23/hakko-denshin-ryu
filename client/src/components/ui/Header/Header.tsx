import useCurrentPage from "@hooks/useCurrentPage";
import { Box } from "@mui/material";

import { NOT_FOUND_PAGE } from "../../../pages";
import CoverControls from "../CoverControls/CoverControls";

import Logo from "./Logo";
import NavMenu from "./NavMenu/NavMenu";

const Header = () => {
  const page = useCurrentPage();

  // Moon covers have their own arc menu; only their controls stay pinned
  if ((page ?? NOT_FOUND_PAGE).cover) {
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
