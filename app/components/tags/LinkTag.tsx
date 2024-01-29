import cn from "classnames";
import Link from "next/link";
import type { AnchorHTMLAttributes, FC } from "react";

interface ILinkTag extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  color?: "blue" | "green" | "gray" | "white";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
}

export const LinkTag: FC<ILinkTag> = ({
  href,
  color = "white",
  size = "base",
  children,
  className,
  ...props
}) => {
  // const isDefaultLang = lang === i18n.defaultLocale;
  // const path = isDefaultLang ? href : `/${lang}${href}`;
  return (
    <span className="flex items-center">
      <Link
        href={href}
        className={cn(
          {
            ["text-blue-700 dark:text-blue-300"]: color === "blue",
            ["text-green-600 dark:text-green-300"]: color === "green",
            ["text-white"]: color === "white",
            ["text-gray-600 dark:text-gray-300"]: color === "gray",
            ["text-xs"]: size === "xs",
            ["text-sm"]: size === "sm",
            ["text-base"]: size === "base",
            ["text-lg"]: size === "lg",
            ["text-xl"]: size === "xl",
            ["text-2xl"]: size === "2xl",
          },
          className,
        )}
        {...props}
      >
        {children}
      </Link>
    </span>
  );
};
