import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ResponseError } from "@/api-service";
import { tokenService } from "@/app/[lang]/(form)/token-services";
import { UserDto } from "@/dto";
import { EnumTokens } from "@/enum/token.enum";
import prisma from "@/libs/prismadb";

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
      return ResponseError.NotFound("Account");
    }

    const isMatchesPassword = await bcrypt.compare(
      password,
      user.hashedPassword,
    );

    if (!isMatchesPassword) {
      return ResponseError.NotFound("Account");
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

    cookies().set(EnumTokens.REFRESH_TOKEN, tokens.refresh_token, {
      httpOnly: true,
    });
    return NextResponse.json({
      user: userDto,
      access_token: tokens.access_token,
    });
  } catch (e: any) {
    return ResponseError.InternalServer();
  }
}
