'use client';

import { Role } from '@prisma/client';

import { useRoutes } from '@/app/hooks';

import { FooterMobileLink } from './FooterMobileLink';

export const FooterMobile = ({ role }: { role: Role | null }) => {
  const routes = useRoutes();
  
  const getSuitRoutes = () => {
    if (role) {
      return (
        <>
          {routes.map((route) => {
            if (route.role.includes(role)) {
              return <FooterMobileLink key={route.href} {...route} />;
            }
          })}
        </>
      );
    } else {
      return (
        <>
          {routes.map((route) => {
            if (!route.isAuth) {
              return <FooterMobileLink key={route.href} {...route} />;
            }
          })}
        </>
      );
    }
  };

  return (
    <div className="fixed w-full bottom-0 z-10 flex items-center border-t-[1px] flex-wrap lg:hidden">
      {getSuitRoutes()}
    </div>
  );
};
