import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib";
import prisma from "@/prisma/prismadb";
import { NextResponseError } from "@/utils";

export interface IFeedback {
  isInvite?: boolean;
  vacancyId: string;
  userId: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ...data }: IFeedback = body;

    const user = await getCurrentUser();
    if (!user) {
      return NextResponseError.Unauthorized();
    }

    const sendFeedbackToUser = await prisma.feedback.upsert({
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

    return NextResponse.json({});
  } catch (e: any) {
    return NextResponseError.InternalServer();
  }
}
