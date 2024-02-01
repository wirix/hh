import { Role } from '@prisma/client';
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import { getCurrentUser } from "@/actions";
import { ResponseError } from "@/api-service";
import { ICompanyForm } from "@/app/[lang]/(employer)/company/components";
import prisma from "@/libs/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await getCurrentUser();
    if (!user) {
      return ResponseError.Unauthorized();
    }

    const { password, ...data }: ICompanyForm = body;
    const { id: userId, role } = user;

    if (role !== Role.EMPLOYER) {
      return ResponseError.NotMatchesRole(Role.EMPLOYER);
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
    return ResponseError.InternalServer();
  }
}
