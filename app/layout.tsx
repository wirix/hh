import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from './components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'RU.HH',
  description: 'Поиск работы',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={inter.className} id="__next" suppressHydrationWarning>
        <Sidebar>{children}</Sidebar>
        <ToastContainer />
      </body>
    </html>
  );
}
