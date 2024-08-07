"use client";

import type { Role } from "@prisma/client";

import { useRoutes } from "@/hooks";

import { HeaderLink } from "./HeaderLink";

export const NavRoutes = ({ role }: { role: Role | null }) => {
  const routes = useRoutes();

  const getSuitRoutes = () => {
    if (role) {
      return (
        <>
          {routes.map((route) => {
            if (route.role.includes(role)) {
              return <HeaderLink key={route.href} {...route} />;
            }
          })}
        </>
      );
    } else {
      return (
        <>
          {routes.map((route) => {
            if (route.role.length === 0) {
              return <HeaderLink key={route.href} {...route} />;
            }
          })}
        </>
      );
    }
  };

  return getSuitRoutes();
};
