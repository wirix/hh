'use server';

import { ReactNode } from 'react';
import { FooterMobile, HeaderDesktop } from './components';
import { Container } from '../container/Container';
import { getCurrentUser } from '@/app/actions';

export const Sidebar = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser();
  const role = user ? user.role : null;

  return (
    <>
      <Container>
        <HeaderDesktop role={role} />
        {children}
      </Container>
      <FooterMobile role={role} />
    </>
  );
};
