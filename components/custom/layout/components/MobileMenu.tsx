import type { Role } from "@prisma/client";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IoClose } from "react-icons/io5";

import { cn } from "@/utils";

import { NavRoutes } from ".";

interface MobileMenuProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isOpen: boolean;
  roleNav: Role | null;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  roleNav,
  className,
  ...props
}: MobileMenuProps) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition-transform",
        {
          "translate-x-0 transform": isOpen,
          "-translate-x-full transform": !isOpen,
        },
        className,
      )}
      {...props}
    >
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="absolute left-0 top-0 h-full w-64 overflow-y-auto bg-white px-4 py-2 dark:bg-gray-800">
        <button onClick={onClose} className="mb-4">
          <IoClose size="32px" />
        </button>
        <div
          id="flex flex-col"
          className="flex flex-col items-start justify-start"
        >
          <NavRoutes role={roleNav} />
        </div>
      </div>
    </div>
  );
};
