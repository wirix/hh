"use server";

import type { ReactNode } from "react";

import { getCurrentUser } from "@/lib";

import { Container } from "../../../components/custom/container/Container";
import { FooterMobile, HeaderDesktop } from "./components";

interface LayoutProps {
  children: ReactNode;
  leftSide?: ReactNode;
  rightSide?: ReactNode;
}

export const Layout = async ({
  children,
  leftSide,
  rightSide,
}: LayoutProps) => {
  const user = await getCurrentUser();
  const role = user ? user.role : null;

  return (
    <main>
      <Container
        className={
          "grid grid-cols-[200px_1fr_200px] grid-rows-[100px_1fr_100px] gap-6"
        }
      >
        <HeaderDesktop
          className="col-span-3 row-start-1 row-end-2"
          role={role}
        />
        {leftSide && (
          <div className="col-start-1 col-end-2 row-start-2 row-end-3">
            {leftSide}
          </div>
        )}
        <div
          className={`col-start-${leftSide ? 2 : 1} col-end-${rightSide ? 3 : 4} row-start-2 row-end-3`}
        >
          {children}
        </div>
        {rightSide && (
          <div className="col-start-3 col-end-4 row-start-2 row-end-3">
            {rightSide}
          </div>
        )}
      </Container>
      <FooterMobile role={role} />
    </main>
  );
};
