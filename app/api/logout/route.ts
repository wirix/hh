import bcrypt from 'bcrypt';
import prisma from '../../libs/prismadb';
import { NextResponse } from 'next/server';
import { UserDto } from '@/app/dtos';
import { tokenService } from '@/app/services';

interface ILogout {
  refresh_token: string;
}

export async function POST(req: Request) {
  try {
    const body: ILogout = await req.json();
    const { refresh_token } = body;

    const findToken = await prisma.token.findUnique({
      where: {
        refresh_token,
      },
    });

    if (!findToken) {
      return new NextResponse('Unauthorized', {
        status: 401,
      });
    }

    const deleteToken = await prisma.token.delete({
      where: {
        refresh_token,
      },
    });

    return NextResponse.json({
      logout: true,
    });
  } catch (e: any) {
    return new NextResponse('Internal Error', {
      status: 500,
    });
  }
}
