import React from "react";
import type { IntlShape } from "react-intl";
import { type Params, matchPath } from "react-router";

import Events from "@features/admin/events/components/Events";
import Students from "@features/admin/students/components/Students";
import Login from "@features/auth/Login";
import SetPassword from "@features/auth/SetPassword";
import Dashboard from "@features/dashboard/Dashboard";
import Contact from "@features/public/contact/Contact";
import Dojo from "@features/public/dojo/Dojo";
import EventDetail from "@features/public/events/EventDetail";
import { fetchEventHead } from "@features/public/events/eventHead";
import PublicEvents from "@features/public/events/PublicEvents";
import KyuProgram from "@features/public/kyu-program/KyuProgram";
import Schedule from "@features/public/schedule/Schedule";
import Senshinkan from "@features/public/senshinkan/Senshinkan";
import Techniques from "@features/public/techniques/Techniques";

import { DOJO_NAME, SITE_NAME, brandedTitle } from "@constants/brand";
import HakkoRyuRGB from "@features/public/hakko-ryu/HakkoRyu";
import Home from "@features/public/home/Home";
import { normalizePath } from "@utils/routes";
import type { IntlMessageID } from "i18n/messages";

export type PagePath =
  | "home"
  | "hakko-denshin-ryu"
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
  | "events/:slug"
  | "admin/events";

/** A page's own head tags, read from what it shows (e.g. its event) */
export interface PageHead {
  title: string;
  description: string;
  /** Absolute; when absent, the page's `ogImage` */
  image?: string;
}

export interface Page {
  path: PagePath;
  /** Translation ID of the document title (without the brand suffix) */
  titleId: IntlMessageID;
  titleSuffix: typeof SITE_NAME | typeof DOJO_NAME;
  /** Translation ID of the meta description (falls back to the site-wide one) */
  descriptionId?: IntlMessageID;
  /** Social preview image in public/og (falls back to the home one) */
  ogImage?: string;
  bgImage?: string;
  hideFromNav?: boolean;
  /** The page keeps the document title itself, e.g. naming what it loads */
  ownTitle?: boolean;
  /** Keep the page out of search engines */
  noIndex?: boolean;
  /** The page opens on a moon cover with its own arc menu, so it has no header */
  cover?: boolean;
  protected?: boolean;
  adminOnly?: boolean;
  standalone?: boolean;
  loader?: () => Promise<unknown>;
  /** Server-side, the head tags taken from what the page shows */
  head?: (params: Params, locale: string) => Promise<PageHead>;
  component: React.FC<{ data: any }>;
}

export const pages: Page[] = [
  {
    component: Home,
    path: "home",
    titleId: "page.title.home",
    titleSuffix: SITE_NAME,
    descriptionId: "page.description.home",
    ogImage: "/og/home.jpg",
    cover: true,
  },
  {
    component: HakkoRyuRGB,
    path: "hakko-denshin-ryu",
    titleId: "page.title.hakko-ryu",
    titleSuffix: SITE_NAME,
    descriptionId: "page.description.hakko-ryu",
    ogImage: "/og/hakko-ryu.jpg",
    cover: true,
  },
  {
    component: Senshinkan,
    path: "senshinkan",
    titleId: "page.title.senshinkan",
    titleSuffix: SITE_NAME,
    descriptionId: "page.description.senshinkan",
    ogImage: "/og/senshinkan.jpg",
    cover: true,
  },
  {
    component: Dojo,
    path: "dojo",
    titleId: "page.title.dojo",
    titleSuffix: SITE_NAME,
    descriptionId: "page.description.dojo",
    ogImage: "/og/dojo.jpg",
    cover: true,
  },
  {
    path: "schedule",
    component: Schedule,
    titleId: "page.title.schedule",
    titleSuffix: SITE_NAME,
    descriptionId: "page.description.schedule",
    ogImage: "/og/schedule.jpg",
    cover: true,
  },
  {
    path: "contact",
    component: Contact,
    titleId: "page.title.contact",
    titleSuffix: SITE_NAME,
    descriptionId: "page.description.contact",
    ogImage: "/og/contact.jpg",
    cover: true,
  },
  {
    path: "login",
    component: Login,
    titleId: "page.title.login",
    titleSuffix: DOJO_NAME,
    descriptionId: "page.description.login",
    ogImage: "/og/login.jpg",
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
    descriptionId: "page.description.events",
    ogImage: "/og/events.jpg",
    cover: true,
  },
  {
    path: "events/:slug",
    component: EventDetail,
    titleId: "page.title.event",
    titleSuffix: DOJO_NAME,
    descriptionId: "page.description.events",
    ogImage: "/og/events.jpg",
    cover: true,
    hideFromNav: true,
    // Named after the event: by the server, then by the page once it loads
    head: ({ slug = "" }, locale) => fetchEventHead(slug, locale),
    ownTitle: true,
    // Every id renders the same placeholder until the page shows the event
    noIndex: true,
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

/** What the document title is built from */
export type PageTitle = Pick<Page, "titleId" | "titleSuffix">;

/** Everything about a page that shapes its head and chrome, not its content */
export type PageMeta = PageTitle &
  Pick<Page, "descriptionId" | "ogImage" | "noIndex" | "cover" | "protected">;

/** The page served at any path no page answers to */
export const NOT_FOUND_PAGE: PageMeta = {
  titleId: "page.title.not-found",
  titleSuffix: SITE_NAME,
  noIndex: true,
  cover: true,
};

/** Pages listed in the site menus (header, mobile drawer, home arc) */
export const navPages = pages.filter((page) => !page.hideFromNav);

/** The page served at `pathname`, and the params its path reads from it */
export const matchPage = (pathname: string) => {
  for (const page of pages) {
    const match = matchPath(normalizePath(page.path), pathname);
    if (match) return { page, params: match.params };
  }
  return undefined;
};

/** The page served at `pathname` (e.g. "/" or "/events/taikai-2026"), if any */
export const findPage = (pathname: string) => matchPage(pathname)?.page;

export const getPageTitle = (
  page: PageTitle,
  intl: Pick<IntlShape, "formatMessage">
) => brandedTitle(intl.formatMessage({ id: page.titleId }), page.titleSuffix);

export const getPageDescription = (
  page: Pick<Page, "descriptionId"> | undefined,
  intl: Pick<IntlShape, "formatMessage">
) =>
  intl.formatMessage({ id: page?.descriptionId ?? "page.description.default" });
