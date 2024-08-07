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
        `lg: ml-auto mr-auto min-h-screen w-full pl-4 pr-4 lg:pl-12 lg:pr-12`,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
