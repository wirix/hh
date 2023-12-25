import Link from 'next/link';
import { FC } from 'react';
import cn from 'classnames';

interface ILink {
  href: string;
  text: string;
  color?: 'blue' | 'green';
  className?: string;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
}

export const LinkTag: FC<ILink> = ({
  href,
  text,
  color = 'blue',
  size = 'base',
  className,
  ...props
}) => {
  return (
    <>
      <Link
        href={href}
        className={cn(className, {
          ['text-blue-700']: color === 'blue',
          ['text-green-600']: color === 'green',
          ['text-xs']: size === 'xs',
          ['text-sm']: size === 'sm',
          ['text-base']: size === 'base',
          ['text-lg']: size === 'lg',
          ['text-xl']: size === 'xl',
          ['text-2xl']: size === '2xl',
        })}
        {...props}>
        {text}
      </Link>
    </>
  );
};
