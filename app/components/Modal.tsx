'use client';

import cn from 'classnames';
import { Portal } from './portal/Portal';
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from 'react';

interface IModal extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  message: string;
  status?: number | null;
}

export const Modal = ({ message, status, className, ...props }: IModal) => {
  const [isOpened, setIsOpened] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpened(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpened]);

  if (!isOpened || !message || !status) {
    return <></>;
  }

  return (
    <Portal>
      <div
        className={cn(
          'p-4 font-semibold bg-yellow-500',
          {
            ['bg-green-600']: 200 <= status && status < 300,
            ['bg-red-400']: 400 <= status && status < 500,
          },
          className,
        )}
        {...props}>
        {message}
      </div>
    </Portal>
  );
};
