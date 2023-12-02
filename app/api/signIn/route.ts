import bcrypt from 'bcrypt';
import prisma from '../../libs/prismadb';
import { NextResponse } from 'next/server';
import { UserDto } from '@/app/dtos';
import { tokenService } from '@/app/services';
import { cookies } from 'next/headers';

interface ISignIn {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const body: ISignIn = await req.json();
    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return new NextResponse('Account not found', {
        status: 404,
      });
    }

    const isMatchesPassword = await bcrypt.compare(password, user.hashedPassword);

    if (!isMatchesPassword) {
      return new NextResponse('Account not found', {
        status: 404,
      });
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    const token = await prisma.token.upsert({
      where: {
        userId: user.id,
      },
      update: {
        refresh_token: tokens.refresh_token,
      },
      create: {
        refresh_token: tokens.refresh_token,
        userId: user.id,
      },
    });

    cookies().set('refresh_token', tokens.refresh_token, { httpOnly: true });
    return NextResponse.json({
      user: userDto,
      access_token: tokens.access_token,
    });
  } catch (e: any) {
    return new NextResponse('Internal Error', {
      status: 500,
    });
  }
}
