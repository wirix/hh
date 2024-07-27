import type { DetailedHTMLProps, FC, HTMLAttributes } from "react";

import { cn } from "@/utils";

type ColorType = "cyan" | "white" | "black";
interface IHTag
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  color?: ColorType;
}

const styles = (className: string | undefined, color: ColorType) =>
  cn(
    "text-3xl",
    {
      ["text-cyan-600 dark:text-white"]: color === "cyan",
      ["text-white dark:text-gray-900"]: color === "white",
      ["text-gray-900 dark:text-yellow-500"]: color === "black",
    },
    className,
  );

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
        <h1 className={styles(className, color)} {...props}>
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 className={styles(className, color)} {...props}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 className={styles(className, color)} {...props}>
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4 className={styles(className, color)} {...props}>
          {children}
        </h4>
      );
    case "h5":
      return (
        <h5 className={styles(className, color)} {...props}>
          {children}
        </h5>
      );
    case "h6":
      return (
        <h6 className={styles(className, color)} {...props}>
          {children}
        </h6>
      );
    default:
      return <></>;
  }
};
