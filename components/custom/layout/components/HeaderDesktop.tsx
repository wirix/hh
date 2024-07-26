"use client";

import { Role } from "@prisma/client";
import { useRouter } from "next/navigation";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { TbLogout2 } from "react-icons/tb";

import { LinkTag, ThemeSwitcher } from "@/components/custom";
import { cn } from "@/lib/utils";
import { apiTypedRoutes } from "@/utils";

import { NavRoutes } from ".";

interface HeaderDesktopProps
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    "role"
  > {
  role: Role | null;
}

export const HeaderDesktop = ({
  role,
  className,
  ...props
}: HeaderDesktopProps) => {
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

  return (
    <div
      className={cn(
        "hidden py-8 lg:flex lg:items-center lg:justify-between",
        className,
      )}
      {...props}
    >
      <div className="lg:flex">
        <NavRoutes role={role} />
      </div>
      {role ? (
        <div className="flex items-center justify-center">
          <span className="cursor-pointer">
            <ThemeSwitcher className="mr-4" />
          </span>
          <span className="cursor-pointer">
            <TbLogout2
              size="32px"
              onClick={logout}
              className="сursor-pointer text-black dark:text-white"
            />
          </span>
        </div>
      ) : (
        <LinkTag href="/signIn" color="green">
          Войти
        </LinkTag>
      )}
    </div>
  );
};
