import { usePathname } from 'next/navigation';
import { CgProfile } from 'react-icons/cg';
import { TbCurlyLoop } from 'react-icons/tb';
import { ImProfile } from 'react-icons/im';
import { IconType } from 'react-icons';
import { MdOutlineWorkOutline } from 'react-icons/md';
import { HiViewGrid } from 'react-icons/hi';
import { Role } from '@prisma/client';

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
      href: '/resume',
      title: 'Мое резюме',
      Icon: ImProfile,
      isActive: pathName === '/resume',
      isDesktop: true,
      role: [Role.WORKER],
      isAuth: true,
    },
    {
      href: '/negotiations',
      title: 'Отлики',
      Icon: TbCurlyLoop,
      isActive: pathName === '/negotiations',
      isDesktop: true,
      role: [Role.WORKER],
      isAuth: true,
    },
    {
      href: '/vacancy',
      title: 'Вакансии',
      Icon: MdOutlineWorkOutline,
      isActive: pathName === '/vacancy',
      isDesktop: true,
      role: [Role.WORKER],
      isAuth: false,
    },
    {
      href: '/profile',
      title: 'Профиль',
      Icon: CgProfile,
      isActive: pathName === '/profile',
      isDesktop: false,
      role: [Role.WORKER, Role.EMPLOYER],
      isAuth: true,
    },
    {
      href: '/company',
      title: 'Компания',
      Icon: HiViewGrid,
      isActive: pathName === '/company',
      isDesktop: true,
      role: [Role.EMPLOYER],
      isAuth: true,
    },
    {
      href: '/company/vacancies',
      title: 'Текущие вакансии',
      Icon: HiViewGrid,
      isActive: pathName === '/company/vacancies',
      isDesktop: true,
      role: [Role.EMPLOYER],
      isAuth: true,
    },
  ];

  return routes;
};
