'use server';

import { ReactNode } from 'react';
import { FooterMobile, HeaderDesktop } from './components';
import { Container } from '../container/Container';
import { getCurrentUser } from '@/app/actions';

export const Sidebar = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser();

  return (
    <>
      <Container>
        <HeaderDesktop role={user ? user.role : null} />
        <div>{children}</div>
      </Container>
      <FooterMobile role={user ? user.role : null} />
    </>
  );
};
