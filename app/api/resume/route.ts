import type { Resume } from "@prisma/client";
import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib";
import prisma from "@/prisma/prismadb";
import { NextResponseError } from "@/utils";

interface IResume extends Omit<Resume, "id" | "userId"> {
  body: string;
  country: string;
  city: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ...data }: IResume = body;

    const user = await getCurrentUser();
    if (!user) {
      return NextResponseError.Unauthorized();
    }

    const { id: userId } = user;

    const upsertResume = await prisma.resume.upsert({
      where: {
        userId,
      },
      update: {
        ...data,
        userId,
      },
      create: {
        ...data,
        userId,
      },
    });

    return NextResponse.json({});
  } catch (e: any) {
    return NextResponseError.InternalServer();
  }
}
