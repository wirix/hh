import type { Metadata } from "next";

import { Layout } from "@/components/custom/layout";

export const metadata: Metadata = {
  title: "Вход",
};

export default async function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layout>{children}</Layout>;
}
