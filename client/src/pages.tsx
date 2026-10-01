import React from "react";
import type { IntlShape } from "react-intl";

import Events from "@features/admin/events/components/Events";
import Students from "@features/admin/students/components/Students";
import Login from "@features/auth/Login";
import SetPassword from "@features/auth/SetPassword";
import Dashboard from "@features/dashboard/Dashboard";
import Contact from "@features/public/contact/Contact";
import Dojo from "@features/public/dojo/Dojo";
import PublicEvents from "@features/public/events/PublicEvents";
import KyuProgram from "@features/public/kyu-program/KyuProgram";
import Schedule from "@features/public/schedule/Schedule";
import Senshinkan from "@features/public/senshinkan/Senshinkan";
import Techniques from "@features/public/techniques/Techniques";

import HakkoRyuRGB from "@features/public/hakko-ryu/HakkoRyu";
import Home from "@features/public/home/Home";
import { normalizePath } from "@utils/routes";
import type { IntlMessageID } from "i18n/messages";

// Brand names appended to every document title (not translated)
const SITE_NAME = "Hakko Denshin Ryu Jujutsu";
const DOJO_NAME = "Senshinkan Romania";

export type PagePath =
  | "home"
  | "hakko-ryu"
  | "senshinkan"
  | "dojo"
  | "schedule"
  | "contact"
  | "login"
  | "set-password"
  | "dashboard"
  | "students"
  | "techniques"
  | "kyu-program"
  | "events"
  | "admin/events";

export interface Page {
  path: PagePath;
  /** Translation ID of the document title (without the brand suffix) */
  titleId: IntlMessageID;
  titleSuffix: typeof SITE_NAME | typeof DOJO_NAME;
  bgImage?: string;
  hideFromNav?: boolean;
  /** Keep the page out of search engines */
  noIndex?: boolean;
  /** The page opens on a moon cover with its own arc menu, so it has no header */
  cover?: boolean;
  protected?: boolean;
  adminOnly?: boolean;
  standalone?: boolean;
  loader?: () => Promise<unknown>;
  component: React.FC<{ data: any }>;
}

export const pages: Page[] = [
  {
    component: Home,
    path: "home",
    titleId: "page.title.home",
    titleSuffix: SITE_NAME,
    cover: true,
  },
  {
    component: HakkoRyuRGB,
    path: "hakko-ryu",
    titleId: "page.title.hakko-ryu",
    titleSuffix: SITE_NAME,
    cover: true,
  },
  {
    component: Senshinkan,
    path: "senshinkan",
    titleId: "page.title.senshinkan",
    titleSuffix: SITE_NAME,
    cover: true,
  },
  {
    component: Dojo,
    path: "dojo",
    titleId: "page.title.dojo",
    titleSuffix: SITE_NAME,
    cover: true,
  },
  {
    path: "schedule",
    component: Schedule,
    titleId: "page.title.schedule",
    titleSuffix: SITE_NAME,
    cover: true,
  },
  {
    path: "contact",
    component: Contact,
    titleId: "page.title.contact",
    titleSuffix: SITE_NAME,
    cover: true,
  },
  {
    path: "login",
    component: Login,
    titleId: "page.title.login",
    titleSuffix: DOJO_NAME,
    cover: true,
    noIndex: true,
  },
  {
    path: "set-password",
    component: SetPassword,
    titleId: "page.title.set-password",
    titleSuffix: DOJO_NAME,
    standalone: true,
    noIndex: true,
    hideFromNav: true,
  },
  {
    path: "dashboard",
    component: Dashboard,
    titleId: "page.title.dashboard",
    titleSuffix: DOJO_NAME,
    hideFromNav: true,
    protected: true,
  },
  {
    path: "students",
    component: Students,
    titleId: "page.title.students",
    titleSuffix: DOJO_NAME,
    hideFromNav: true,
    protected: true,
    adminOnly: true,
  },
  {
    path: "techniques",
    component: Techniques,
    titleId: "page.title.techniques",
    titleSuffix: DOJO_NAME,
    hideFromNav: true,
    protected: true,
  },
  {
    path: "kyu-program",
    component: KyuProgram,
    titleId: "page.title.kyu-program",
    titleSuffix: DOJO_NAME,
    hideFromNav: true,
    protected: true,
  },
  {
    path: "events",
    component: PublicEvents,
    titleId: "page.title.events",
    titleSuffix: DOJO_NAME,
    cover: true,
  },
  {
    path: "admin/events",
    component: Events,
    titleId: "page.title.events",
    titleSuffix: DOJO_NAME,
    hideFromNav: true,
    protected: true,
    adminOnly: true,
  },
] as const;

/** Pages listed in the site menus (header, mobile drawer, home arc) */
export const navPages = pages.filter((page) => !page.hideFromNav);

/** The page served at `pathname` (e.g. "/" or "/hakko-ryu"), if any */
export const findPage = (pathname: string) =>
  pages.find((page) => normalizePath(page.path) === pathname);

export const getPageTitle = (
  page: Pick<Page, "titleId" | "titleSuffix">,
  intl: Pick<IntlShape, "formatMessage">
) => `${intl.formatMessage({ id: page.titleId })} - ${page.titleSuffix}`;
