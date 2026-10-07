import { useLocation } from "react-router";

import { findPage } from "../pages";

const useBackgroundImage = () => {
  const { pathname } = useLocation();

  return findPage(pathname)?.bgImage;
};

export default useBackgroundImage;
