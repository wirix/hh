import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/app/actions';

interface IParams {
  vacancyId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse('Unauthorized', {
        status: 401,
      });
    }
    
    const { id: userId, role } = user;
    if (role !== 'WORKER') {
      return new NextResponse('Not correct role', {
        status: 403,
      });
    }

    if (!user.resume) {
      return new NextResponse('No exist resume', {
        status: 400,
      });
    }

    const { vacancyId } = params;
    
    const vacancy = await prisma.vacancy.findUnique({
      where: {
        id: vacancyId,
      },
    });
    if (!vacancy) {
      return new NextResponse('Not exist vacancy', {
        status: 404,
      });
    }

    const responderIds = vacancy.responderIds ?? [];
    if (responderIds.includes(userId)) {
      return NextResponse.json({
        isSuccess: true,
        isAllReady: true,
        message: 'Ваша заявка была уже отправлена!',
      });
    }

    responderIds.push(userId);

    const pushUserIdToVacancy = await prisma.vacancy.update({
      where: {
        id: vacancyId,
      },
      data: {
        responderIds,
      },
    });

    return NextResponse.json({
      isSuccess: true,
      isAllReady: false,
      message: 'Заявка успешно принята!',
    });
  } catch (e: any) {
    return new NextResponse('Error', {
      status: 500,
    });
  }
}
