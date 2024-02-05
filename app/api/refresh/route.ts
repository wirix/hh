import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { Token } from "@/constants";
import { UserDto } from "@/helpers";
import prisma from "@/libs/prismadb";
import { tokenMethods } from "@/utils";
import { NextResponseError } from "@/utils";

export async function GET(req: Request) {
  try {
    const token = cookies().get(Token)?.value ?? "";
    const findToken = await prisma.token.findUnique({
      where: {
        token,
      },
      include: {
        user: true,
      },
    });

    if (!findToken) {
      return NextResponseError.Unauthorized();
    }

    const userDto = new UserDto(findToken.user);

    const newToken = tokenMethods.generateToken({ ...userDto });
    if (!newToken) {
      return NextResponseError.NotFound("Token");
    }

    const updateToken = await prisma.token.update({
      where: {
        id: findToken.id,
      },
      data: {
        token: newToken,
      },
    });

    cookies().set(Token, newToken, {
      httpOnly: true,
    });

    return NextResponse.json({
      isSuccess: true,
    });
  } catch (e: any) {
    return NextResponseError.InternalServer();
  }
}
