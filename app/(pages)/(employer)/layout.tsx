import type { Metadata } from "next";

import { Layout } from "@/components/custom/layout";

export const metadata: Metadata = {
  title: "Страница Работодателя",
};

export default async function VacanciesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layout>{children}</Layout>;
}
