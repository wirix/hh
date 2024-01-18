"use server";

import { getCurrentUser } from "@/app/actions";
import prisma from "@/app/libs/prismadb";

import { Content } from "./components";

export default async function VacanciesPage() {
  const user = await getCurrentUser();
  if (!user) {
    return <div>авторизуйтесь</div>;
  }

  const { role } = user;

  if (role !== "WORKER") {
    return <div>Вы не ищите работу.</div>;
  }

  const vacanies = await prisma.vacancy.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      company: true,
    },
  });

  if (vacanies.length === 0) {
    return <div>Вакансий нет.</div>;
  }

  return <Content user={user} vacanies={vacanies} />;
}
