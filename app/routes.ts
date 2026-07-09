import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("layouts/auth-layout.tsx", [
    route("login", "routes/login.tsx"),
    route("register", "routes/register.tsx"),
    route("*", "routes/public-404.tsx"),
  ]),
  layout("layouts/dashboard-layout.tsx", [
    route("dashboard", "routes/dashboard.tsx"),
    route("dashboard/*", "routes/dashboard-404.tsx"),
  ]),
] satisfies RouteConfig;
