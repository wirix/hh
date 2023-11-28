'use client';

import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';

interface ContainerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
}

export const Container: FC<ContainerProps> = ({ children, className, ...props }) => {
  return (
    <div className={`m-0 mx-12 min-h-screen ${className} pt-2 lg:pt-0`} {...props}>
      {children}
    </div>
  );
};
