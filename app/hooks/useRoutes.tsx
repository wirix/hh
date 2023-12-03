import { usePathname } from 'next/navigation';
import { CgProfile } from 'react-icons/cg';
import { TbCurlyLoop } from 'react-icons/tb';
import { ImProfile } from 'react-icons/im';
import { IconType } from 'react-icons';

interface IRoutes {
  href: string;
  title: string;
  icon: IconType;
  isActive: boolean;
}

export const useRoutes = () => {
  const pathName = usePathname();

  const routes: IRoutes[] = [
    {
      href: '/resume',
      title: 'Мое резюме',
      icon: ImProfile,
      isActive: pathName === '/resume',
    },
    {
      href: '/negotiations',
      title: 'Отлики',
      icon: TbCurlyLoop,
      isActive: pathName === '/negotiations',
    },
    {
      href: '/profile',
      title: 'Профиль',
      icon: CgProfile,
      isActive: pathName === '/profile',
    },
  ];

  return routes;
};
