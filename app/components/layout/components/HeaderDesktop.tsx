"use client";

import { Role } from "@prisma/client";
import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { TbLogout2 } from "react-icons/tb";

import { LinkTag, ThemeSwitcher } from "@/app/components";
import { useRoutes } from "@/hooks";
import { apiTypedRoutes } from "@/utils";

import { HeaderLink } from "./HeaderLink";

export const HeaderDesktop = ({ role }: { role: Role | null }) => {
  const routes = useRoutes();
  const router = useRouter();

  const logout = async () => {
    try {
      await apiTypedRoutes.logout.get();
      router.push("/register");
    } catch (e: any) {
      console.log(e);
    } finally {
      router.refresh();
    }
  };

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
    }

    return (
      <>
        {routes.map((route) => {
          if (!route.isAuth) {
            return <HeaderLink key={route.href} {...route} />;
          }
        })}
      </>
    );
  };

  return (
    <div className="hidden py-8 lg:flex lg:items-center lg:justify-between">
      <div className="lg:flex">{getSuitRoutes()}</div>
      {role ? (
        <div className="flex items-center justify-center">
          <ThemeSwitcher className="mr-4" />
          <LinkTag href="/profile" className="mr-4">
            <CgProfile size="32px" className="text-black dark:text-white" />
          </LinkTag>
          <TbLogout2
            size="32px"
            onClick={logout}
            className="сursor-pointer text-black dark:text-white"
          />
        </div>
      ) : (
        <LinkTag href="/signIn" color="green">
          Войти
        </LinkTag>
      )}
    </div>
  );
};
