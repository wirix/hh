import type { Resume } from "@prisma/client";
import { NextResponse } from "next/server";

import { getCurrentUser } from "@/actions";
import prisma from "@/libs/prismadb";

interface IResume extends Omit<Resume, "id" | "userId"> {
  body: string;
  country: string;
  city: string;
}

export async function GET(req: Request) {
  try {
    return NextResponse.json({ data: "body" });
  } catch (e: any) {
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ...data }: IResume = body;

    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
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

    return NextResponse.json({ isSuccess: true });
  } catch (e: any) {
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
