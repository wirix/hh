"use client";

import type { Role } from "@prisma/client";

import { useRoutes } from "@/app/hooks";

import { FooterLink } from "./FooterLink";

export const FooterMobile = ({ role }: { role: Role | null }) => {
  const routes = useRoutes();

  const getSuitRoutes = () => {
    if (role) {
      return (
        <>
          {routes.map((route) => {
            if (route.role.includes(role)) {
              return <FooterLink key={route.href} {...route} />;
            }
          })}
        </>
      );
    } else {
      return (
        <>
          {routes.map((route) => {
            if (!route.isAuth) {
              return <FooterLink key={route.href} {...route} />;
            }
          })}
        </>
      );
    }
  };

  return (
    <div className="fixed bottom-0 z-10 flex w-full flex-wrap items-center border-t-[1px] lg:hidden">
      {getSuitRoutes()}
    </div>
  );
};
