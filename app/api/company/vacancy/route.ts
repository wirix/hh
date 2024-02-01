import { Role, type Vacancy } from "@prisma/client";
import { NextResponse } from "next/server";

import { getCurrentUser } from "@/actions";
import { ResponseError } from "@/api-service";
import prisma from "@/libs/prismadb";

export async function POST(req: Request) {
  try {
    const body: Vacancy = await req.json();
    const user = await getCurrentUser();
    if (!user) {
      return ResponseError.Unauthorized();
    }

    const { id: userId, role } = user;
    if (role !== Role.EMPLOYER) {
      return ResponseError.NotMatchesRole(Role.EMPLOYER);
    }

    const company = await prisma.company.findUnique({
      where: { userId },
    });
    if (!company) {
      return ResponseError.NotFound("Company");
    }

    const { id: companyId } = company;

    const createVacancy = await prisma.vacancy.create({
      data: {
        ...body,
        companyId,
      },
    });

    return NextResponse.json({
      isSuccess: true,
    });
  } catch (e: any) {
    return ResponseError.InternalServer();
  }
}
