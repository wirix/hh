import type { DetailedHTMLProps, FC, HTMLAttributes } from "react";

import { cn } from "@/utils";

interface ContainerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Container: FC<ContainerProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        `container min-h-screen w-[1280px] pt-2 lg:pt-0`,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
