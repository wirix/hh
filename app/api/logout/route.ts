import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { EnumTokens } from "@/enum";
import prisma from "@/libs/prismadb";
import { NextResponseError } from "@/utils";

export async function GET(req: Request) {
  try {
    const refresh_token = cookies().get(EnumTokens.REFRESH_TOKEN)?.value || "";

    const findToken = await prisma.token.findUnique({
      where: {
        refresh_token,
      },
    });

    if (!findToken) {
      return NextResponseError.Unauthorized();
    }

    cookies().delete(EnumTokens.REFRESH_TOKEN);
    return NextResponse.json({
      logout: true,
    });
  } catch (e: any) {
    return NextResponseError.InternalServer();
  }
}
