import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { tokenService } from "@/app/(pages)/(form)/token.services";
import { UserDto } from "@/app/dto";
import { EnumTokens } from "@/app/enum/token.enum";

import prisma from "../../libs/prismadb";

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
      return new NextResponse("Account not found", {
        status: 404,
      });
    }

    const isMatchesPassword = await bcrypt.compare(
      password,
      user.hashedPassword,
    );

    if (!isMatchesPassword) {
      return new NextResponse("Account not found", {
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

    cookies().set(EnumTokens.REFRESH_TOKEN, tokens.refresh_token, {
      httpOnly: true,
    });
    return NextResponse.json({
      user: userDto,
      access_token: tokens.access_token,
    });
  } catch (e: any) {
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
