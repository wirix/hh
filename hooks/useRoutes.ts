import { Role } from "@prisma/client";
import type { IconType } from "react-icons";
import { CgProfile } from "react-icons/cg";
import { HiViewGrid } from "react-icons/hi";
import { ImProfile } from "react-icons/im";
import { MdOutlineWorkOutline } from "react-icons/md";
import { TbCurlyLoop } from "react-icons/tb";

export interface IRoutes {
  href: string;
  title: string;
  Icon: IconType;
  isDesktop?: boolean;
  role: Role[];
  isAuth: boolean;
}

export const useRoutes = () => {
  const routes: IRoutes[] = [
    {
      href: "/resume",
      title: "Мое резюме",
      Icon: ImProfile,
      isDesktop: true,
      role: [Role.WORKER],
      isAuth: true,
    },
    {
      href: "/feedback",
      title: "Отлики",
      Icon: TbCurlyLoop,
      isDesktop: true,
      role: [Role.WORKER],
      isAuth: true,
    },
    {
      href: "/vacancies",
      title: "Вакансии",
      Icon: MdOutlineWorkOutline,
      isDesktop: true,
      role: [Role.WORKER],
      isAuth: false,
    },
    {
      href: "/profile",
      title: "Профиль",
      Icon: CgProfile,
      isDesktop: false,
      role: [Role.WORKER, Role.EMPLOYER],
      isAuth: true,
    },
    {
      href: "/company",
      title: "Компания",
      Icon: HiViewGrid,
      isDesktop: true,
      role: [Role.EMPLOYER],
      isAuth: true,
    },
    {
      href: "/company/vacancies",
      title: "Текущие вакансии",
      Icon: HiViewGrid,
      isDesktop: true,
      role: [Role.EMPLOYER],
      isAuth: true,
    },
  ];

  return routes;
};
