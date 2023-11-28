import { ReactNode } from 'react';
import { FooterMobile, HeaderDesktop } from './components';
import { Container } from '../container/Container';

export const Sidebar = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Container>
        <HeaderDesktop />
        <div>{children}</div>
      </Container>
      <FooterMobile />
    </>
  );
};
