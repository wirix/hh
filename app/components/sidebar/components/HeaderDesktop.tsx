'use client';

import { useRoutes } from '@/app/hooks';
import { HeaderMobileLink } from './HeaderMobileLink';
import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';

export const HeaderDesktop = () => {
  const routes = useRoutes();

  return (
    <div className="hidden py-8 lg:flex lg:items-center lg:justify-between">
      <div className="lg:flex">
        {routes.map((route) => (
          <HeaderMobileLink key={route.href} {...route} />
        ))}
      </div>
      <Link href={'/profile'} className=''>
        <CgProfile size={'32px'} />
      </Link>
    </div>
  );
};
