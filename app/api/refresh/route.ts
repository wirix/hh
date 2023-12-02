import bcrypt from 'bcrypt';
import prisma from '../../libs/prismadb';
import { NextResponse } from 'next/server';
import { UserDto } from '@/app/dtos';
import { tokenService } from '@/app/services';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
  try {
    const refresh_token = cookies().get('refresh_token')?.value || '';
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
      return new NextResponse('Unauthorization', {
        status: 401,
      });
    }

    const userDto = new UserDto(token.user);
    const tokens = tokenService.generateTokens({ ...userDto });

    const updateToken = await prisma.token.update({
      where: {
        id: token.id,
      },
      data: {
        refresh_token: tokens.refresh_token,
      },
    });

    cookies().set('refresh_token', tokens.refresh_token, { httpOnly: true });
    return NextResponse.json({
      access_token: tokens.access_token,
    });
  } catch (e: any) {
    return new NextResponse('Internal Error', {
      status: 500,
    });
  }
}
