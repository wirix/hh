import cn from "classnames";
import type { DetailedHTMLProps, FC, HTMLAttributes } from "react";

interface ICard
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  color: "gray" | "whiteShadow" | "white";
}

export const Card: FC<ICard> = ({
  children,
  color = "gray",
  className,
  ...props
}) => {
  return (
    <div
      className={cn("rounded-md", className, {
        ["bg-white"]: color === "white",
        ["bg-white shadow-lg shadow-gray-500/50 dark:bg-cyan-900 dark:shadow-cyan-500/50"]:
          color === "whiteShadow",
        ["bg-slate-800"]: color === "gray",
      })}
      {...props}
    >
      {children}
    </div>
  );
};
