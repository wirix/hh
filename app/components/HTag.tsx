import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';

interface IHTag
  extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
  tag: 'h1' | 'h2' | 'h3';
}

export const HTag: FC<IHTag> = ({ tag, children, ...props }) => {
  switch (tag) {
    case 'h1':
      return (
        <h1 className={'text-3xl'} {...props}>
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2 className={'text-2xl'} {...props}>
          {children}
        </h2>
      );
    case 'h3':
      return (
        <h3 className={'text-xl'} {...props}>
          {children}
        </h3>
      );
    default:
      return <></>;
  }
};
