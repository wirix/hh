import prisma from '../../libs/prismadb';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { EnumTokens } from '@/app/enums/token.enum';

export async function GET(req: Request) {
  try {
    const refresh_token = cookies().get(EnumTokens.REFRESH_TOKEN)?.value || '';

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

    cookies().delete(EnumTokens.REFRESH_TOKEN);
    return NextResponse.json({
      logout: true,
    });
  } catch (e: any) {
    return new NextResponse('Internal Error', {
      status: 500,
    });
  }
}
