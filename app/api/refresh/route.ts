import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { tokenService } from '@/app/(pages)/(form)/token.services';
import { UserDto } from '@/app/dtos';
import { EnumTokens } from '@/app/enums/token.enum';

import prisma from '../../libs/prismadb';

export async function GET(req: Request) {
  try {
    const refresh_token = cookies().get(EnumTokens.REFRESH_TOKEN)?.value || '';
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

    cookies().set(EnumTokens.REFRESH_TOKEN, tokens.refresh_token, { httpOnly: true });
    
    return NextResponse.json({
      access_token: tokens.access_token,
    });
  } catch (e: any) {
    return new NextResponse('Internal Error', {
      status: 500,
    });
  }
}
