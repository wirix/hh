"use server";

import { getCurrentUser } from "@/app/actions";
import prisma from "@/app/libs/prismadb";

import { Content } from "./components";

interface IParams {
  id?: string;
}

export default async function ListResume({ params }: { params: IParams }) {
  const { id: vacancyId } = params;

  const user = await getCurrentUser();
  if (!user) {
    return <div className='dark:text-white'>Вы не авторизованы. Авторизоваться.</div>;
  }

  const { role } = user;
  if (role === "WORKER") {
    return <div className='dark:text-white'>Вы не работодатель, чтобы посетить эту страницу.</div>;
  }

  const vacancy = await prisma.vacancy.findUnique({
    where: {
      id: vacancyId,
    },
    include: {
      responders: {
        include: {
          resume: true,
          feedback: {
            where: {
              vacancyId,
            },
          },
        },
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!vacancy?.responderIds.length) {
    return <div className="dark:text-white">Никто пока не откликнулся на эту вакансию.</div>;
  }

  return <Content vacancy={vacancy} />;
}
