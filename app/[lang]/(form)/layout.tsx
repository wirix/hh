import type { ReactNode } from "react";
export default function FormLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div>{children}</div>;
}
