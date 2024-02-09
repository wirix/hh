import { Role } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import { getCurrentUser } from "@/actions";
import { ICompanyForm } from "@/app/(pages)/(employer)/company/components";
import prisma from "@/libs/prismadb";
import { NextResponseError } from "@/utils";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await getCurrentUser();
    if (!user) {
      return NextResponseError.Unauthorized();
    }

    const { password, ...data }: ICompanyForm = body;
    const { id: userId, role } = user;

    if (role !== Role.EMPLOYER) {
      return NextResponseError.NotMatchesRole(Role.EMPLOYER);
    }

    const hashedPassword = await bcrypt.hash(password, 3);

    const createCompany = await prisma.company.create({
      data: {
        userId,
        hashedPassword,
        ...data,
      },
    });

    return NextResponse.json({});
  } catch (e) {
    return NextResponseError.InternalServer();
  }
}
