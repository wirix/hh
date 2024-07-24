import { DetailedHTMLProps, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface FilterDesktopProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const FilterDesktop = ({ className, ...props }: FilterDesktopProps) => {
  return (
    <div className={cn(className, "")} {...props}>
      Filter
    </div>
  );
};
