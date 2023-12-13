import Link from 'next/link';
import { FC } from 'react';
import cn from 'classnames';

interface ILink {
  href: string;
  text: string;
  appearance?: 'blue';
  className?: string;
}

export const LinkTag: FC<ILink> = ({ href, text, appearance = 'blue', className, ...props }) => {
  return (
    <span {...props}>
      <Link
        href={href}
        className={cn('text-xl', className, {
          ['text-blue-700']: appearance === 'blue',
        })}>
        {text}
      </Link>
    </span>
  );
};
