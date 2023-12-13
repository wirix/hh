import { usePathname } from 'next/navigation';
import { CgProfile } from 'react-icons/cg';
import { TbCurlyLoop } from 'react-icons/tb';
import { ImProfile } from 'react-icons/im';
import { IconType } from 'react-icons';
import { MdOutlineWorkOutline } from 'react-icons/md';

export interface IRoutes {
  href: string;
  title: string;
  Icon: IconType;
  isActive: boolean;
  isDesktop: boolean;
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
    },
    {
      href: '/negotiations',
      title: 'Отлики',
      Icon: TbCurlyLoop,
      isActive: pathName === '/negotiations',
      isDesktop: true,
    },
    {
      href: '/vacancy',
      title: 'Вакансии',
      Icon: MdOutlineWorkOutline,
      isActive: pathName === '/vacancy',
      isDesktop: true,
    },
    {
      href: '/profile',
      title: 'Профиль',
      Icon: CgProfile,
      isActive: pathName === '/profile',
      isDesktop: false,
    },
  ];

  return routes;
};
