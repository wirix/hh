import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import { ICompanyForm } from "@/app/[lang]/(employer)/company/components";
import { getCurrentUser } from "@/actions";
import prisma from "@/libs/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const { password, ...data }: ICompanyForm = body;
    const { id: userId, role } = user;

    if (role === "WORKER") {
      return new NextResponse("Not correct role", {
        status: 403,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 3);

    const createCompany = await prisma.company.create({
      data: {
        userId,
        hashedPassword,
        ...data,
      },
    });

    return NextResponse.json({ isSuccess: true });
  } catch (e) {
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
