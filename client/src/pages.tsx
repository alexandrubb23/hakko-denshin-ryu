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
  },
  {
    component: HakkoRyuRGB,
    path: "hakko-ryu",
    titleId: "page.title.hakko-ryu",
    titleSuffix: SITE_NAME,
  },
  {
    component: Senshinkan,
    path: "senshinkan",
    titleId: "page.title.senshinkan",
    titleSuffix: SITE_NAME,
  },
  {
    component: Dojo,
    path: "dojo",
    titleId: "page.title.dojo",
    titleSuffix: SITE_NAME,
  },
  {
    path: "schedule",
    component: Schedule,
    titleId: "page.title.schedule",
    titleSuffix: SITE_NAME,
  },
  {
    path: "contact",
    component: Contact,
    titleId: "page.title.contact",
    titleSuffix: SITE_NAME,
  },
  {
    path: "login",
    component: Login,
    titleId: "page.title.login",
    titleSuffix: DOJO_NAME,
    standalone: true,
  },
  {
    path: "set-password",
    component: SetPassword,
    titleId: "page.title.set-password",
    titleSuffix: DOJO_NAME,
    standalone: true,
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

export const getPageTitle = (
  page: Pick<Page, "titleId" | "titleSuffix">,
  intl: Pick<IntlShape, "formatMessage">
) => `${intl.formatMessage({ id: page.titleId })} - ${page.titleSuffix}`;
