import Link from "next/link";
import { useState } from "react";

import type { IRoutes } from "@/hooks";
import { cn } from "@/utils";

interface IHeaderLink extends IRoutes {
  className?: string;
}

export const HeaderLink = ({
  title,
  href,
  isDesktop,
  className,
}: IHeaderLink) => {
  const [isAuth] = useState();

  return (
    <Link
      href={href}
      className={cn(
        "mr-8 flex items-center justify-center text-black last:mr-0 dark:text-gray-200",
        {
          ["hidden"]: !isDesktop,
        },
        className,
      )}
    >
      {title}
    </Link>
  );
};
