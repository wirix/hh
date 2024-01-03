'use client';

import { useTransition } from 'react';
import { useRoutes } from '@/app/hooks';
import { HeaderMobileLink } from './HeaderMobileLink';
import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';
import { LinkTag } from '@/app/components';
import { CiLogout } from 'react-icons/ci';
import { $api } from '@/app/helpers';
import { useRouter } from 'next/navigation';
import { Role } from '@prisma/client';

export const HeaderDesktop = ({ role }: { role: Role | null }) => {
  const routes = useRoutes();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const logout = async () => {
    const res = await $api.get('./logout');
    if (res.data.logout === true) {
      router.push('/register');
      startTransition(() => {
        router.refresh();
      });
    }
  };

  const getSuitRoutes = () => {
    if (role) {
      return (
        <>
          {routes.map((route) => {
            if (route.role.includes(role)) {
              return <HeaderMobileLink key={route.href} {...route} />;
            }
          })}
        </>
      );
    } else {
      return (
        <>
          {routes.map((route) => {
            if (!route.isAuth) {
              return <HeaderMobileLink key={route.href} {...route} />;
            }
          })}
        </>
      );
    }
  };

  return (
    <div className="hidden py-8 lg:flex lg:items-center lg:justify-between">
      <div className="lg:flex">{getSuitRoutes()}</div>
      {role ? (
        <div className="flex">
          <CiLogout size="32px" onClick={logout} className="mr-8 cursor-pointer" />
          <Link href="/profile" className="cursor-pointer">
            <CgProfile size="32px" />
          </Link>
        </div>
      ) : (
        <LinkTag href="/signIn" color="green">
          Войти
        </LinkTag>
      )}
    </div>
  );
};
