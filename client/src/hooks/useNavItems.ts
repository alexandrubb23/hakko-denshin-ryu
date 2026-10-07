import { matchPath, useLocation } from "react-router";

import { authClient } from "@lib/auth-client";
import { normalizePath } from "@utils/routes";
import type { IntlMessageID } from "i18n/messages";

import { navPages } from "../pages";

export interface NavItem {
  path: string;
  to: string;
  messageId: IntlMessageID;
  isActive: boolean;
}

/** The menu's pages, labelled for the visitor and marked when current */
const useNavItems = (): NavItem[] => {
  const { pathname } = useLocation();
  const { data: session } = authClient.useSession();

  return navPages.map((page) => {
    const to = normalizePath(page.path);

    return {
      path: page.path,
      to,
      messageId:
        page.path === "login" && session
          ? "header.menu.login.authenticated"
          : (`header.menu.${page.path}` as IntlMessageID),
      // Nested pages (e.g. one event) keep their section marked
      isActive: !!matchPath({ path: to, end: to === "/" }, pathname),
    };
  });
};

export default useNavItems;
