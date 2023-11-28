import bcrypt from 'bcrypt';
import prisma from '../../libs/prismadb';
import { NextResponse } from 'next/server';
import { UserDto } from '@/app/dtos';
import { tokenService } from '@/app/services';

interface IRefresh {
  refresh_token: string;
}

export async function POST(req: Request) {
  try {
    const body: IRefresh = await req.json();
    const { refresh_token } = body;

    const isValidateToken = tokenService.validateRefreshToken(refresh_token);
    const token = await prisma.token.findUnique({
      where: {
        refresh_token,
      },
      include: {
        user: true,
      },
    });

    if (!isValidateToken || !token) {
      return new NextResponse('Unauthorized', {
        status: 401,
      });
    }

    const userDto = new UserDto(token.user);
    const tokens = tokenService.generateTokens(userDto);

    const updateToken = await prisma.token.update({
      where: {
        id: token.id,
      },
      data: {
        refresh_token: tokens.refresh_token,
      },
    });

    return NextResponse.json({
      access_token: tokens.access_token,
    });
  } catch (e: any) {
    return new NextResponse('Internal Error', {
      status: 500,
    });
  }
}
