import prisma from '../../libs/prismadb';
import { NextResponse } from 'next/server';
import { KeySkills } from '@/app/types';

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
