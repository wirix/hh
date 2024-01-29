import { Role } from '@prisma/client';
import { usePathname } from 'next/navigation';
import type { IconType } from 'react-icons';
import { CgProfile } from 'react-icons/cg';
import { HiViewGrid } from 'react-icons/hi';
import { ImProfile } from 'react-icons/im';
import { MdOutlineWorkOutline } from 'react-icons/md';
import { TbCurlyLoop } from 'react-icons/tb';

export interface IRoutes {
  href: string;
  title: string;
  Icon: IconType;
  isActive: boolean;
  isDesktop?: boolean;
  role: Role[];
  isAuth: boolean;
}

export const useRoutes = () => {
  const pathName = usePathname();

  const routes: IRoutes[] = [
    {
      href: "/resume",
      title: "Мое резюме",
      Icon: ImProfile,
      isActive: pathName === "/resume",
      isDesktop: true,
      role: [Role.WORKER],
      isAuth: true,
    },
    {
      href: "/feedback",
      title: "Отлики",
      Icon: TbCurlyLoop,
      isActive: pathName === "/feedback",
      isDesktop: true,
      role: [Role.WORKER],
      isAuth: true,
    },
    {
      href: "/vacancies",
      title: "Вакансии",
      Icon: MdOutlineWorkOutline,
      isActive: pathName === "/vacancies",
      isDesktop: true,
      role: [Role.WORKER],
      isAuth: false,
    },
    {
      href: "/profile",
      title: "Профиль",
      Icon: CgProfile,
      isActive: pathName === "/profile",
      isDesktop: false,
      role: [Role.WORKER, Role.EMPLOYER],
      isAuth: true,
    },
    {
      href: "/company",
      title: "Компания",
      Icon: HiViewGrid,
      isActive: pathName === "/company",
      isDesktop: true,
      role: [Role.EMPLOYER],
      isAuth: true,
    },
    {
      href: "/company/vacancies",
      title: "Текущие вакансии",
      Icon: HiViewGrid,
      isActive: pathName === "/company/vacancies",
      isDesktop: true,
      role: [Role.EMPLOYER],
      isAuth: true,
    },
  ];

  return routes;
};
