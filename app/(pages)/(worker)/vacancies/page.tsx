"use server";

import { getCurrentUser } from "@/actions";
import prisma from "@/prisma/prismadb";

import { VacancyItem } from "./components";

export default async function VacanciesPage() {
  const user = await getCurrentUser();
  if (!user) {
    return <div className="dark:text-white">авторизуйтесь</div>;
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

  if (!vacanies.length) {
    return <div className="dark:text-white">Вакансий нет.</div>;
  }

  return (
    <>
      {vacanies.map((v) => (
        <VacancyItem
          userId={user.id}
          key={v.id}
          className="mb-4 last:mb-0"
          {...v}
        />
      ))}
    </>
  );
}
