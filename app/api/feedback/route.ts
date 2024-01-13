import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/app/actions';

interface IFeedback {
  isInvite: boolean;
  vacancyId: string;
  userId: string;
}

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

    const createFeedback = await prisma.feedback.upsert({
      where: {
        vacancyId_userId: {
          vacancyId: data.vacancyId,
          userId: data.userId,
        },
      },
      update: {
        ...data,
      },
      create: {
        ...data,
      },
    });

    return NextResponse.json({ isSuccess: true });
  } catch (e: any) {
    return new NextResponse('Internal Error', {
      status: 500,
    });
  }
}
