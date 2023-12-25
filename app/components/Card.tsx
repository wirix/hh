import cn from 'classnames';
import React, { DetailedHTMLProps, FC } from 'react';

interface ICard extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  color: 'gray' | 'whiteShadow';
}

export const Card: FC<ICard> = ({ children, color = 'gray', className, ...props }) => {
  return (
    <div
      className={cn('rounded-md', className, {
        ['bg-slate-900']: color === 'gray',
        ['bg-black shadow-2xl shadow-slate-400']: color === 'whiteShadow',
      })}
      {...props}>
      {children}
    </div>
  );
};
