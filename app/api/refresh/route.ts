import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import { encrypt } from "@/libs/session/session";
import { NextResponseError } from "@/utils";

export async function GET(req: Request) {
  try {
    const token = cookies().get("Token")?.value ?? "";
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

    const newToken = await encrypt(findToken.user);
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

    cookies().set("Token", newToken, {
      httpOnly: true,
    });

    return NextResponse.json({
      isSuccess: true,
    });
  } catch (e: any) {
    return NextResponseError.InternalServer();
  }
}
