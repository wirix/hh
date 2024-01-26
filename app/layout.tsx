import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

import { Layout } from "./components";
import { ProviderTheme } from "./provider-theme";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "RU.HH",
  description: "Поиск работы",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className + " dark:bg-gray-900"} id="__next">
        <ProviderTheme>
          <Layout>{children}</Layout>
          <ToastContainer position="bottom-right" />
        </ProviderTheme>
      </body>
    </html>
  );
}
