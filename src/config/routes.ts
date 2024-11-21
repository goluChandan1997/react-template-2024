import { lazy } from "react";
import { RouteConfig } from "../types/routes.types";

const DashboardPage = lazy(() => import("../pages/Dashboard/DashboardPage"));
const HomePage = lazy(() => import("../pages/Home/HomePage"));
const LoginPage = lazy(() => import("../pages/Auth/LoginPage"));
const SettingsPage = lazy(() => import("../pages/Settings/SettingsPage"));

export const routes: RouteConfig[] = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/dashboard",
    component: DashboardPage,
    auth: true,
  },
  {
    path: "/settings",
    component: SettingsPage,
    auth: true,
  },
  {
    path: "/login",
    component: LoginPage,
  },
];
