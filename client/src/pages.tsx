import React from "react";

import Contact from "@components/Pages/Contact/Contact";
import Dashboard from "@components/Pages/Dashboard";
import Dojo from "@components/Pages/Dojo";
import Events from "@components/Pages/Events/Events";
import PublicEvents from "@components/Pages/Events/PublicEvents";
import KyuProgram from "@components/Pages/KyuProgram/KyuProgram";
import Login from "@components/Pages/Login";
import Senshinkan from "@components/Pages/Senshinkan";
import SetPassword from "@components/Pages/SetPassword";
import Students from "@components/Pages/Students";
import Techniques from "@components/Pages/Techniques/Techniques";

import HakkoRyuRGB from "@components/Pages/HakkoRyu";
import Home from "@components/Pages/Home";

export type PagePath =
  | "home"
  | "hakko-ryu"
  | "senshinkan"
  | "dojo"
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
  title: string;
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
    title: "Home - Hakko Denshin Ryu Jujutsu",
  },
  {
    component: HakkoRyuRGB,
    path: "hakko-ryu",
    title: "Hakko Ryu - Hakko Denshin Ryu Jujutsu",
  },
  {
    component: Senshinkan,
    path: "senshinkan",
    title: "Senshinkan Romania - Hakko Denshin Ryu Jujutsu",
  },
  {
    component: Dojo,
    path: "dojo",
    title: "Senshinkan Dojo - Hakko Denshin Ryu Jujutsu",
  },
  {
    path: "contact",
    component: Contact,
    title: "Contact Senshinkan Romania - Hakko Denshin Ryu Jujutsu",
  },
  {
    path: "login",
    component: Login,
    title: "Log In - Senshinkan Romania",
    standalone: true,
  },
  {
    path: "set-password",
    component: SetPassword,
    title: "Set Password - Senshinkan Romania",
    standalone: true,
    hideFromNav: true,
  },
  {
    path: "dashboard",
    component: Dashboard,
    title: "Dashboard - Senshinkan Romania",
    hideFromNav: true,
    protected: true,
  },
  {
    path: "students",
    component: Students,
    title: "Students - Senshinkan Romania",
    hideFromNav: true,
    protected: true,
    adminOnly: true,
  },
  {
    path: "techniques",
    component: Techniques,
    title: "Techniques - Senshinkan Romania",
    hideFromNav: true,
    protected: true,
  },
  {
    path: "kyu-program",
    component: KyuProgram,
    title: "Kyu Program - Senshinkan Romania",
    hideFromNav: true,
    protected: true,
  },
  {
    path: "events",
    component: PublicEvents,
    title: "Events - Senshinkan Romania",
  },
  {
    path: "admin/events",
    component: Events,
    title: "Events - Senshinkan Romania",
    hideFromNav: true,
    protected: true,
    adminOnly: true,
  },
] as const;
