"use server";

import { getCurrentUser } from "@/actions";
import prisma from "@/prisma/prismadb";

import { NewVacancy } from "./components";
import VacancyTable from "./components/VacancyTable";

export default async function CompanyVacancyPage() {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <div className="dark:text-white">Вы не авторизованы. Авторизоваться</div>
    );
  }

  const { id: userId } = user;

  const company = await prisma.company.findUnique({
    where: { userId },
  });
  if (!company) {
    return (
      <div className="dark:text-white">
        Нет компании, по которой вы ищете вакансии.
      </div>
    );
  }

  const { id: companyId } = company;

  const vacancies = await prisma.vacancy.findMany({
    where: { companyId },
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      company: true,
      feedback: true,
    },
  });

  return (
    <div className="flex flex-col">
      <NewVacancy />
      <VacancyTable vacancies={vacancies} />
    </div>
  );
}
