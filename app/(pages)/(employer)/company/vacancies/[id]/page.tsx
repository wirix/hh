"use server";

import { getCurrentUser } from "@/lib";
import prisma from "@/prisma/prismadb";

import { Content } from "./components";

interface IParams {
  id?: string;
}

export default async function ListResume({ params }: { params: IParams }) {
  const { id: vacancyId } = params;

  const user = await getCurrentUser();
  if (!user) {
    return (
      <div className="dark:text-white">Вы не авторизованы. Авторизоваться.</div>
    );
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
    return (
      <div className="dark:text-white">
        Никто пока не откликнулся на эту вакансию.
      </div>
    );
  }

  return <Content vacancy={vacancy} />;
}
