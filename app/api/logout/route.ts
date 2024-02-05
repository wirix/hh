import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { Token } from "@/constants";
import prisma from "@/libs/prismadb";
import { NextResponseError } from "@/utils";

export async function GET(req: Request) {
  try {
    const token = cookies().get(Token)?.value || "";

    const findToken = await prisma.token.findUnique({
      where: {
        token,
      },
    });

    if (!findToken) {
      return NextResponseError.Unauthorized();
    }

    cookies().delete(Token);
    return NextResponse.json({});
  } catch (e: any) {
    return NextResponseError.InternalServer();
  }
}
