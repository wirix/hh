import prisma from '../../libs/prismadb';
import { NextResponse } from 'next/server';
import { KeySkills } from '@/app/types';
import { getCurrentUser } from '@/app/actions';

interface IResume {
  body: string;
  keySkills: KeySkills[];
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

    const userId = await getCurrentUser();
    if (!userId) {
      return null;
    }

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
    
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return new NextResponse('Internal Error', {
      status: 500,
    });
  }
}
