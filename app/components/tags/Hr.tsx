import cn from 'classnames';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface IHr extends DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement> {}

export const Hr = ({ className }: IHr) => {
  return (
    <div className={className}>
      <hr className={'border-cyan-600'} />
    </div>
  );
};
