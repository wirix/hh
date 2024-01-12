import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/app/actions';
import { Vacancy } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const body: Vacancy = await req.json();
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse('Unauthorized', {
        status: 401,
      });
    }

    const { id: userId, role } = user;
    if (role === 'WORKER') {
      return new NextResponse('Not correct role', {
        status: 403,
      });
    }

    const company = await prisma.company.findUnique({
      where: { userId },
    });
    if (!company) {
      return new NextResponse('Not exist company', {
        status: 404,
      });
    }

    const { id: companyId } = company;

    const createVacancy = await prisma.vacancy.create({
      data: {
        ...body,
        companyId,
      },
    });

    return NextResponse.json({
      isSuccess: true,
    });
  } catch (e: any) {
    return new NextResponse('Internal Error', {
      status: 500,
    });
  }
}
