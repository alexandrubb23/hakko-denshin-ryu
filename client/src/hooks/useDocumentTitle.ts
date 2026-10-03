import { useEffect } from "react";
import { useIntl } from "react-intl";

import { type PageTitle, getPageTitle } from "../pages";

/** Keeps the document title on the page's title, if there is a page */
const useDocumentTitle = (page: PageTitle | undefined) => {
  const intl = useIntl();

  useEffect(() => {
    if (page) document.title = getPageTitle(page, intl);
  }, [page, intl]);
};

export default useDocumentTitle;
