"use server";

import type { ReactNode } from "react";

import { getCurrentUser } from "@/lib";

import { Container } from "../../../components/custom/container/Container";
import { HeaderDesktop } from "./components";

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
      <Container className="grid grid-cols-[1fr] grid-rows-[40px_1fr] gap-2 lg:grid-cols-[200px_1fr_200px] lg:grid-rows-[100px_1fr_30px] lg:gap-6">
        <HeaderDesktop
          className="col-span-3 row-start-1 row-end-2"
          role={role}
        />
        {leftSide && (
          <div className="hidden lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3 lg:block">
            {leftSide}
          </div>
        )}
        <div
          className={`col-span-3 lg:col-span-1 lg:col-start-${leftSide ? 2 : 1} lg:col-end-${rightSide ? 3 : 4} lg:row-start-2 lg:row-end-3`}
        >
          {children}
        </div>
        {rightSide && (
          <div className="hidden lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3 lg:block">
            {rightSide}
          </div>
        )}
      </Container>
    </main>
  );
};
