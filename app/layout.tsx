import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from './components';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'RU.HH',
  description: 'Поиск работы',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <Providers>
        <body className={inter.className}>
          <Sidebar>{children}</Sidebar>
        </body>
      </Providers>
    </html>
  );
}
