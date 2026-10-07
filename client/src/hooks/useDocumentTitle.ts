import { useEffect } from "react";
import { useIntl } from "react-intl";

import { type PageTitle, getPageTitle } from "../pages";

/** Keeps the document title on the page's title, or on `title` as given */
const useDocumentTitle = (title: PageTitle | string | undefined) => {
  const intl = useIntl();

  useEffect(() => {
    if (!title) return;
    document.title =
      typeof title === "string" ? title : getPageTitle(title, intl);
  }, [title, intl]);
};

export default useDocumentTitle;
