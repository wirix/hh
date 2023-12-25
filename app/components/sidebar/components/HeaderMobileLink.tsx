'use client';

import Link from 'next/link';
import cn from 'classnames';
import { IRoutes } from '@/app/hooks';

export const HeaderMobileLink = ({ title, href, isDesktop, isActive }: IRoutes) => {
return (
  <Link
    href={href}
    className={cn('flex items-center justify-center mr-8 last:mr-0', {
      ['hidden']: !isDesktop,
      ['text-blue-600']: isActive,
    })}>
    {title}
  </Link>
);
};
