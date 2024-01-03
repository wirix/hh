import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';

interface IHTag
  extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
  tag: 'h1' | 'h2' | 'h3';
}

export const HTag: FC<IHTag> = ({ tag, children, className, ...props }) => {
  switch (tag) {
    case 'h1':
      return (
        <h1 className={cn('text-3xl', className)} {...props}>
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2 className={cn('text-2xl', className)} {...props}>
          {children}
        </h2>
      );
    case 'h3':
      return (
        <h3 className={cn('text-xl', className)} {...props}>
          {children}
        </h3>
      );
    default:
      return <></>;
  }
};
