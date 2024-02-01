import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ResponseError } from "@/api-service";
import { EnumTokens } from "@/enum/token.enum";
import prisma from "@/libs/prismadb";

export async function GET(req: Request) {
  try {
    const refresh_token = cookies().get(EnumTokens.REFRESH_TOKEN)?.value || "";

    const findToken = await prisma.token.findUnique({
      where: {
        refresh_token,
      },
    });

    if (!findToken) {
      return ResponseError.Unauthorized();
    }

    cookies().delete(EnumTokens.REFRESH_TOKEN);
    return NextResponse.json({
      logout: true,
    });
  } catch (e: any) {
    return ResponseError.InternalServer();
  }
}
