import cn from 'classnames';
import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';

interface ContainerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Container: FC<ContainerProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(`container w-[1280px] min-h-screen pt-2 lg:pt-0`, className)}
      {...props}>
      {children}
    </div>
  );
};
