'use server';

import prisma from '../../libs/prismadb';
import { getCurrentUser } from '@/app/actions';
import { VacancyItem } from '@/app/components';

export default async function Vacancy() {
  const user = await getCurrentUser();
  if (!user) {
    return <div>авторизуйтесь</div>;
  }

  const { userId, role } = user;

  const vacanies = await prisma.vacancy.findMany({
    take: 3,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      company: true,
    },
  });

  return (
    <div>
      {vacanies.map((v) => (
        <VacancyItem key={v.id} className="mb-4 last:mb-0" {...v} />
      ))}
    </div>
  );
}
