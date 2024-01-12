'use server';

import prisma from '@/app/libs/prismadb';
import { getCurrentUser } from '@/app/actions';
import { Content } from './components';

export default async function VacancyPage() {
  const user = await getCurrentUser();
  if (!user) {
    return <div>авторизуйтесь</div>;
  }

  const { role } = user;

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

  return <Content user={user} vacanies={vacanies} />;
}
