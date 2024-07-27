"use server";

import { getCurrentUser } from "@/lib";
import prisma from "@/prisma/prismadb";

import { CompanyCard, VacancyCard, VacancyRequirements } from "./components";

interface IParams {
  id?: string;
}

export default async function VacancyContent({ params }: { params: IParams }) {
  const { id: vacancyId } = params;

  const user = await getCurrentUser();
  if (!user) {
    return (
      <div className="dark:text-white">Вы не авторизованы. Авторизоваться.</div>
    );
  }

  const { id: userId, role } = user;

  const vacancy = await prisma.vacancy.findUnique({
    where: {
      id: vacancyId,
    },
    include: {
      responders: true,
      company: true,
    },
  });

  if (!vacancy) {
    return <div className="dark:text-white">Такой вакансии нет.</div>;
  }

  return (
    <div className="grid grid-cols-[770px_450px] grid-rows-[140px_80px_auto] gap-2 p-4">
      <VacancyCard
        role={role}
        userId={userId}
        vacancy={vacancy}
        className="col-span-1 row-span-2"
      />
      <CompanyCard className="col-[2/3] row-span-1" company={vacancy.company} />
      <VacancyRequirements
        vacancyText={vacancy.text}
        responsibilities={vacancy.responsibilities}
        conditions={vacancy.conditions}
        companyText={vacancy.company.text}
        className="col-span-1 row-[3/4]"
      />
    </div>
  );
}
