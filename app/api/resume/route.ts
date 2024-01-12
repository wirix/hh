import prisma from '../../libs/prismadb';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/app/actions';
import { Resume } from '@prisma/client';

interface IResume extends Omit<Resume, 'id' | 'userId'> {
  body: string;
  country: string;
  city: string;
}

export async function GET(req: Request) {
  try {
    return NextResponse.json({ data: 'body' });
  } catch (e: any) {
    return new NextResponse('Internal Error', {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ...data }: IResume = body;

    const user = await getCurrentUser();
    if (!user) {
      return null;
    }

    const { id: userId } = user;

    const findResume = await prisma.resume.findUnique({
      where: {
        userId,
      },
    });

    if (findResume) {
      const createResume = await prisma.resume.upsert({
        where: {
          userId,
        },
        update: {
          ...data,
          userId,
        },
        create: {
          ...data,
          userId,
        },
      });
    } else {
      const createResume = await prisma.resume.create({
        data: {
          ...data,
          userId,
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
