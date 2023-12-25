'use client';

import { useRoutes } from '@/app/hooks';
import { FooterMobileLink } from './FooterMobileLink';
import { Role } from '@prisma/client';

export const FooterMobile = ({ role }: { role: Role | null }) => {
  const routes = useRoutes();

  return (
    <div className="fixed w-full bottom-0 z-10 flex items-center border-t-[1px] flex-wrap lg:hidden">
      {routes.map((route) => (
        <FooterMobileLink key={route.href} {...route} />
      ))}
    </div>
  );
};
