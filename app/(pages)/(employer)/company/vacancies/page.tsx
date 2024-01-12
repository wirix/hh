'use server';

import { getCurrentUser } from '@/app/actions';
import prisma from '@/app/libs/prismadb';
import { CompanyVacancyContent } from './components';

export default async function CompanyVacancyPage() {
  const user = await getCurrentUser();
  if (!user) {
    return <div>Вы не авторизованы. Авторизоваться</div>;
  }

  const { id: userId, role } = user;
  if (role === 'WORKER') {
    return <div>Вы не работодатель, чтобы посетить эту страницу.</div>;
  }

  const company = await prisma.company.findUnique({
    where: { userId },
  });
  if (!company) {
    return <div>Нет компании, по которой вы ищете вакансии.</div>;
  }

  const { id: companyId } = company;

  const vacancies = await prisma.vacancy.findMany({
    where: { companyId },
    take: 10,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      company: true,
      feedback: true
    },
  });

  return <CompanyVacancyContent vacancies={vacancies} />;
}
