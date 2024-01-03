'use server';

import prisma from '@/app/libs/prismadb';
import { getCurrentUser } from '@/app/actions';
import { VacancyItem } from './components';

export default async function VacancyPage() {
  const user = await getCurrentUser();
  if (!user) {
    return <div>авторизуйтесь</div>;
  }

  const { userId, role } = user;

  if (role !== 'WORKER') {
    return <div>Вы не ищите работу.</div>;
  }

  const vacanies = await prisma.vacancy.findMany({
    take: 5,
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
        <VacancyItem userId={user.userId} key={v.id} className="mb-4 last:mb-0" {...v} />
      ))}
    </div>
  );
}
