"use client";

import cn from "classnames";
import { useTheme } from "next-themes";
import type { IconBaseProps } from "react-icons";
import { FaMoon, FaSun } from "react-icons/fa";

interface IThemeSwitcher extends IconBaseProps {}

export const ThemeSwitcher = ({ className, ...props }: IThemeSwitcher) => {
  const { systemTheme, theme, setTheme } = useTheme();
  const renderThemeChanger = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <FaMoon
          className={cn("h-6 w-6 text-white", className)}
          onClick={() => setTheme("light")}
          {...props}
        />
      );
    }

    return (
      <FaSun
        className={cn("h-7 w-7 text-yellow-500", className)}
        onClick={() => setTheme("dark")}
        {...props}
      />
    );
  };

  return <>{renderThemeChanger()}</>;
};
