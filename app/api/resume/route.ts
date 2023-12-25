import prisma from '../../libs/prismadb';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/app/actions';

interface IResume {
  body: string;
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

    const findResume = await prisma.resume.findUnique({
      where: {
        userId: user.userId,
      },
    });

    if (findResume) {
      const createResume = await prisma.resume.upsert({
        where: {
          userId: user.userId,
        },
        update: {
          ...data,
          userId: user.userId,
        },
        create: {
          ...data,
          userId: user.userId,
        },
      });
    } else {
      const createResume = await prisma.resume.create({
        data: {
          ...data,
          userId: user.userId,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return new NextResponse('Internal Error', {
      status: 500,
    });
  }
}
