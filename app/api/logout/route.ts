import prisma from '../../libs/prismadb';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
  try {
    const refresh_token = cookies().get('refresh_token')?.value || '';

    const findToken = await prisma.token.findUnique({
      where: {
        refresh_token,
      },
    });

    if (!findToken) {
      return new NextResponse('Unauthorization', {
        status: 401,
      });
    }

    cookies().delete('refresh_token');
    return NextResponse.json({
      logout: true,
    });
  } catch (e: any) {
    return new NextResponse('Internal Error', {
      status: 500,
    });
  }
}
