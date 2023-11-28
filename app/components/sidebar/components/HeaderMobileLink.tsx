'use client';

import Link from 'next/link';

export const HeaderMobileLink = ({ title, href }: { href: string; title: string }) => {
  return (
    <Link href={href} className="flex items-center justify-center mr-8 last:mr-0">
      {title}
    </Link>
  );
};
