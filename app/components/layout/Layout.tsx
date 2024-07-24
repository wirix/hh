"use server";

import type { ReactNode } from "react";

import { getCurrentUser } from "@/actions";

import { Container } from "../container/Container";
import { FilterDesktop, FooterMobile, HeaderDesktop } from "./components";

export const Layout = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser();
  const role = user ? user.role : null;

  return (
    <>
      <Container
        className={
          "grid grid-cols-[200px_1fr_200px] grid-rows-[100px_1fr_100px] gap-6"
        }
      >
        <HeaderDesktop
          className="col-span-3 row-start-1 row-end-2"
          role={role}
        />
        <FilterDesktop className="col-start-1 col-end-2 row-start-2 row-end-3" />
        <div className="col-start-2 col-end-4 row-start-2 row-end-3">
          {children}
        </div>
      </Container>
      <FooterMobile role={role} />
    </>
  );
};
