import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from 'react';
import { ToastContainer } from "react-toastify";

import type { LangParamsType } from '@/libs/dictionary';

import { Layout } from "../components";
import { ProviderTheme } from "./provider-theme";
import { i18n } from '@/i18n.config';

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "RU.HH",
  description: "Поиск работы",
};

export default function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: LangParamsType;
}) {
  return (
    <html lang={params.lang ?? i18n.defaultLocale}>
      <body className={inter.className + " dark:bg-gray-900"} id="__next">
        <ProviderTheme>
          <Layout>{children}</Layout>
          <ToastContainer position="bottom-right" />
        </ProviderTheme>
      </body>
    </html>
  );
}
