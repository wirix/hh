"use server";

import type { ReactNode } from "react";

import { getCurrentUser } from "@/app/actions";

import { Container } from "../container/Container";
import { FooterMobile, HeaderDesktop } from "./components";

export const Layout = async ({ children }: { children: ReactNode }) => {
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
