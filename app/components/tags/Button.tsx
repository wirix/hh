import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

import { cn } from "@/lib/utils";

interface IButton
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color?: "blue" | "black" | "gray" | "green" | "white" | "red" | "transparent";
}

export const Button: FC<IButton> = ({
  children,
  color = "blue",
  className,
  ...props
}) => {
  return (
    <span>
      <button
        className={cn(
          "rounded-md px-3 py-2",
          {
            ["bg-blue-700 text-white dark:bg-blue-700 dark:text-white"]:
              color === "blue",
            ["bg-black text-white dark:bg-white dark:text-black"]:
              color === "black",
            ["bg-slate-900 text-white dark:bg-slate-400 dark:text-black"]:
              color === "gray",
            ["bg-green-600 text-white dark:bg-green-400 dark:text-black"]:
              color === "green",
            ["bg-gray-200 text-black dark:bg-black dark:text-white"]:
              color === "white",
            ["bg-red-500 text-white dark:bg-red-400 dark:text-black"]:
              color === "red",
            ["bg-transparent text-black dark:text-white"]:
              color === "transparent",
          },
          className,
        )}
        {...props}
      >
        {children}
      </button>
    </span>
  );
};
