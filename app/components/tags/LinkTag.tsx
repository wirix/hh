import Link from 'next/link';
import { FC, AnchorHTMLAttributes } from 'react';
import cn from 'classnames';

interface ILinkTag extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  color?: 'blue' | 'green';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
}

export const LinkTag: FC<ILinkTag> = ({
  href,
  color = 'blue',
  size = 'base',
  children,
  className,
  ...props
}) => {
  return (
    <span>
      <Link
        href={href}
        className={cn(
          {
            ['text-blue-700']: color === 'blue',
            ['text-green-600']: color === 'green',
            ['text-xs']: size === 'xs',
            ['text-sm']: size === 'sm',
            ['text-base']: size === 'base',
            ['text-lg']: size === 'lg',
            ['text-xl']: size === 'xl',
            ['text-2xl']: size === '2xl',
          },
          className,
        )}
        {...props}>
        {children}
      </Link>
    </span>
  );
};
