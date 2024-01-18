import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';

import { Sidebar } from './components';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'RU.HH',
  description: 'Поиск работы',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={inter.className} id="__next">
        <Sidebar>{children}</Sidebar>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
