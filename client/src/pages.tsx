import React from "react";

import Contact from "@features/public/contact/Contact";
import Dashboard from "@features/dashboard/Dashboard";
import Dojo from "@features/public/dojo/Dojo";
import Events from "@features/admin/events/components/Events";
import PublicEvents from "@features/public/events/PublicEvents";
import KyuProgram from "@features/public/kyu-program/KyuProgram";
import Login from "@features/auth/Login";
import Senshinkan from "@features/public/senshinkan/Senshinkan";
import SetPassword from "@features/auth/SetPassword";
import Students from "@features/admin/students/components/Students";
import Techniques from "@features/public/techniques/Techniques";

import HakkoRyuRGB from "@features/public/hakko-ryu/HakkoRyu";
import Home from "@features/public/home/Home";

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
