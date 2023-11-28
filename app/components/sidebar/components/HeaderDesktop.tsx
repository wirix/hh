'use client';

import { useRoutes } from '@/app/hooks';
import { HeaderMobileLink } from './HeaderMobileLink';

export const HeaderDesktop = () => {
  const routes = useRoutes();

  return (
    <div className="hidden py-8 lg:flex">
      {routes.map((route) => (
        <HeaderMobileLink key={route.href} href={route.href} title={route.title} />
      ))}
    </div>
  );
};
