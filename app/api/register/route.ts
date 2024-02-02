import { Role } from "@prisma/client";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { tokenService } from "@/app/[lang]/(form)/token-services";
import { UserDto } from "@/dto";
import { EnumTokens } from "@/enum";
import prisma from "@/libs/prismadb";
import { NextResponseError } from "@/utils";

interface IRegister {
  email: string;
  password: string;
  username: string;
  role: Role;
}

export async function POST(req: Request) {
  try {
    const body: IRegister = await req.json();
    const { email, password, username, role } = body;

    const candidate = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (candidate) {
      return NextResponseError.AccountExistsAlready();
    }

    const hashedPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();
    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
        name: username,
        role,
        activationLink,
      },
    });

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    const createToken = await prisma.token.create({
      data: {
        refresh_token: tokens.refresh_token,
        user: {
          connect: {
            id: user.id,
          },
        },
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
    return NextResponseError.InternalServer();
  }
}
