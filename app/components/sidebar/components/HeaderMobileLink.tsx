'use client';

import Link from 'next/link';
import cn from 'classnames';
import { IRoutes } from '@/app/hooks';

export const HeaderMobileLink = ({ title, href, isDesktop }: IRoutes) => {
return (
    <Link
      href={href}
      className={cn('flex items-center justify-center mr-8 last:mr-0', {
        ['hidden']: !isDesktop,
      })}>
      {title}
    </Link>
  );
};
