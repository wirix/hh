"use client";

import { Role } from "@prisma/client";
import { useRouter } from "next/navigation";
import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";

import { LinkTag, ThemeSwitcher } from "@/components/custom";
import { cn } from "@/utils";
import { apiTypedRoutes } from "@/utils";

import { NavRoutes } from ".";
import { MobileMenu } from "./MobileMenu";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div
        className={cn(
          "hidden lg:flex lg:items-center lg:justify-between lg:py-8",
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
                className="cursor-pointer text-black dark:text-white"
              />
            </span>
          </div>
        ) : (
          <LinkTag href="/signIn" color="green">
            Войти
          </LinkTag>
        )}
      </div>
      <div className="flex items-center justify-between py-4 lg:hidden">
        <button
          className="ma5menu__toggle"
          type="button"
          onClick={toggleMobileMenu}
        >
          <span className="ma5menu__sr-only">
            <IoMenu size="28px" />{" "}
          </span>
        </button>
        {role ? (
          <span className="cursor-pointer">
            <ThemeSwitcher className="mr-0 lg:mr-4" />
          </span>
        ) : (
          <LinkTag href="/signIn" color="green">
            Войти
          </LinkTag>
        )}
      </div>
      <MobileMenu
        roleNav={role}
        isOpen={isMobileMenuOpen}
        onClose={toggleMobileMenu}
      />
    </>
  );
};
