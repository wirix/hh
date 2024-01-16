'use server';

import { getCurrentUser } from '@/app/actions';
import prisma from '@/app/libs/prismadb';
import { ListResumeContent } from './components';

interface IParams {
  id?: string;
}

export default async function ListResume({ params }: { params: IParams }) {
  const { id: vacancyId } = params;

  const user = await getCurrentUser();
  if (!user) {
    return <div>Вы не авторизованы. Авторизоваться.</div>;
  }

  const { role } = user;
  if (role === 'WORKER') {
    return <div>Вы не работодатель, чтобы посетить эту страницу.</div>;
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
      },
    },
  });

  if (!vacancy || vacancy.responderIds.length === 0) {
    return <div>Никто пока не откликнулся на эту вакансию.</div>;
  }

  return <ListResumeContent vacancy={vacancy} />;
}
