'use client';

import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';

interface ContainerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
}

export const Container: FC<ContainerProps> = ({ children, className, ...props }) => {
  return (
    <div className={`m-0 mx-6 pt-6 min-h-screen ${className} pt-2 lg:pt-0 lg:mx-12`} {...props}>
      {children}
    </div>
  );
};
