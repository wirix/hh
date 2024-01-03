import { IRoutes } from '@/app/hooks';
import Link from 'next/link';

export const FooterMobileLink = ({ Icon, href }: IRoutes) => {
  return (
    <Link
      href={href}
      className="flex-1 flex items-center justify-center p-4 border-r-2 last:border-r-0">
      <Icon />
    </Link>
  );
};
