'use server';

import { getCurrentUser } from '@/app/actions';
import prisma from '@/app/libs/prismadb';
import { CompanyCard, VacancyCard, VacancyRequirements } from './components';

interface IParams {
  id?: string;
}

export default async function VacancyContent({ params }: { params: IParams }) {
  const { id: vacancyId } = params;

  const user = await getCurrentUser();
  if (!user) {
    return <div>Вы не авторизованы. Авторизоваться.</div>;
  }

  const { role, id: userId } = user;
  if (role !== 'WORKER') {
    return <div>Вы не соискатель, чтобы посетить эту страницу.</div>;
  }

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
    return <div>Такой вакансии нет.</div>;
  }

  return (
    <div className="grid grid-cols-[770px_450px] grid-rows-[140px_80px_auto] gap-2 p-4">
      <VacancyCard userId={userId} vacancy={vacancy} className="col-span-1 row-span-2" />
      <CompanyCard className="row-span-1 col-[2/3]" company={vacancy.company} />
      <VacancyRequirements
        vacancyText={vacancy.text}
        responsibilities={vacancy.responsibilities}
        conditions={vacancy.conditions}
        companyText={vacancy.company.text}
        className={'row-[3/4] col-span-1'}
      />
    </div>
  );
}
