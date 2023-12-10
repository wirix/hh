import { getCurrentUser } from '@/app/actions';
import prisma from '../../libs/prismadb';

export const getContent = async () => {
  'use server';
  const userId = await getCurrentUser();
  console.log('🚀 ~ file: getResume.ts:7 ~ getResume ~ userId:', userId);

  if (!userId) {
    return;
  }

  const body = await prisma.resume.findUnique({
    where: {
      userId,
    },
  });
  return body;
};
