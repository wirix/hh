import { NextResponse } from "next/server";

import { getCurrentUser } from "@/actions";
import { ResponseError } from "@/api-service";
import prisma from "@/libs/prismadb";

interface IFeedback {
  isInvite: boolean;
  vacancyId: string;
  userId: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ...data }: IFeedback = body;

    const user = await getCurrentUser();
    if (!user) {
      return ResponseError.Unauthorized();
    }

    const createFeedback = await prisma.feedback.upsert({
      where: {
        vacancyId_userId: {
          vacancyId: data.vacancyId,
          userId: data.userId,
        },
      },
      update: {
        ...data,
      },
      create: {
        ...data,
      },
    });

    return NextResponse.json(
      { isSuccess: true },
      {
        status: 200,
      },
    );
  } catch (e: any) {
    return ResponseError.InternalServer();
  }
}
