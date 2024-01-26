import cn from "classnames";
import type { DetailedHTMLProps, FC, HTMLAttributes } from "react";

interface IHTag
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  color?: "cyan" | "white" | "black";
}

export const HTag: FC<IHTag> = ({
  tag,
  children,
  color = "black",
  className,
  ...props
}) => {
  switch (tag) {
    case "h1":
      return (
        <h1
          className={cn(
            "text-3xl",
            {
              ["text-cyan-600 dark:text-white"]: color === "cyan",
              ["text-white dark:text-gray-900"]: color === "white",
              ["text-gray-900 dark:text-yellow-500"]: color === "black",
            },
            className,
          )}
          {...props}
        >
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={cn(
            "text-2xl",
            {
              ["text-cyan-600 dark:text-white"]: color === "cyan",
              ["text-white dark:text-gray-900"]: color === "white",
              ["text-gray-900 dark:text-yellow-500"]: color === "black",
            },
            className,
          )}
          {...props}
        >
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={cn(
            "text-xl",
            {
              ["text-cyan-600 dark:text-white"]: color === "cyan",
              ["text-white dark:text-gray-900"]: color === "white",
              ["text-gray-900 dark:text-yellow-500"]: color === "black",
            },
            className,
          )}
          {...props}
        >
          {children}
        </h3>
      );
    case "h4":
      return (
        <h1
          className={cn(
            "text-lg",
            {
              ["text-cyan-600 dark:text-white"]: color === "cyan",
              ["text-white dark:text-gray-900"]: color === "white",
              ["text-gray-900 dark:text-yellow-500"]: color === "black",
            },
            className,
          )}
          {...props}
        >
          {children}
        </h1>
      );
    case "h5":
      return (
        <h2
          className={cn(
            "text-base",
            {
              ["text-cyan-600 dark:text-white"]: color === "cyan",
              ["text-white dark:text-gray-900"]: color === "white",
              ["text-gray-900 dark:text-yellow-500"]: color === "black",
            },
            className,
          )}
          {...props}
        >
          {children}
        </h2>
      );
    case "h6":
      return (
        <h3
          className={cn(
            "text-sm",
            {
              ["text-cyan-600 dark:text-white"]: color === "cyan",
              ["text-white dark:text-gray-900"]: color === "white",
              ["text-gray-900 dark:text-yellow-500"]: color === "black",
            },
            className,
          )}
          {...props}
        >
          {children}
        </h3>
      );
    default:
      return <></>;
  }
};
