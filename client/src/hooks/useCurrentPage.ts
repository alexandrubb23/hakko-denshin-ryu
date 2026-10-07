import { useLocation } from "react-router";

import { findPage } from "../pages";

/** The page at the current location, if any page answers to it */
const useCurrentPage = () => findPage(useLocation().pathname);

export default useCurrentPage;
