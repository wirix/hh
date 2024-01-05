import prisma from '../../libs/prismadb';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/app/actions';
import { Feedback } from '@prisma/client';

interface IFeedback extends Omit<Feedback, 'id'> {}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ...data }: IFeedback = body;

    const user = await getCurrentUser();
    if (!user) {
      return null;
    }
    if (user.role === 'WORKER') {
      return new NextResponse('Not correct role', {
        status: 403,
      });
    }

    const findFeedBack = await prisma.feedback.findMany({
      where: {
        vacancyId: data.vacancyId,
        userId: data.userId,
      },
    });

    if (findFeedBack[0]) {
      const createFeedback = await prisma.feedback.upsert({
        where: {
          id: findFeedBack[0].id,
        },
        update: {
          ...data,
        },
        create: {
          ...data,
        },
      });
    } else {
      const createFeedback = await prisma.feedback.create({
        data: {
          ...data,
        },
      });
    }

    return NextResponse.json({ isSuccess: true });
  } catch (e: any) {
    return new NextResponse('Internal Error', {
      status: 500,
    });
  }
}
