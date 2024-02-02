import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { tokenService } from "@/app/[lang]/(form)/token-services";
import { UserDto } from "@/dto";
import { EnumTokens } from "@/enum";
import prisma from "@/libs/prismadb";
import { NextResponseError } from "@/utils";

export async function GET(req: Request) {
  try {
    const refresh_token = cookies().get(EnumTokens.REFRESH_TOKEN)?.value || "";
    const token = await prisma.token.findUnique({
      where: {
        refresh_token,
      },
      include: {
        user: true,
      },
    });

    if (!token) {
      return NextResponseError.Unauthorized();
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

    cookies().set(EnumTokens.REFRESH_TOKEN, tokens.refresh_token, {
      httpOnly: true,
    });

    return NextResponse.json({
      access_token: tokens.access_token,
    });
  } catch (e: any) {
    return NextResponseError.InternalServer();
  }
}
