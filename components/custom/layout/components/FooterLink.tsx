import Link from "next/link";

import type { IRoutes } from "@/hooks";

export const FooterLink = ({ Icon, href }: IRoutes) => {
  return (
    <Link
      href={href}
      className="flex flex-1 items-center justify-center border-r-2 p-4 last:border-r-0"
    >
      <Icon />
    </Link>
  );
};
