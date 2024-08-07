"use client";

import type { Role } from "@prisma/client";
import { DetailedHTMLProps, HTMLAttributes } from "react";

import { useRoutes } from "@/hooks";
import { cn } from "@/utils";

import { FooterLink } from "./FooterLink";

interface FooterMobileProps
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    "role"
  > {
  role: Role | null;
}

export const FooterMobile = ({
  role,
  className,
  ...props
}: FooterMobileProps) => {
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
    <div
      className={cn(
        "fixed top-0 z-10 flex w-full flex-wrap items-center border-t-[1px] lg:hidden",
        className,
      )}
      {...props}
    >
      {getSuitRoutes()}
    </div>
  );
};
