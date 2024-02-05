import { Role, type Vacancy } from "@prisma/client";
import { NextResponse } from "next/server";

import { getCurrentUser } from "@/actions";
import prisma from "@/libs/prismadb";
import { NextResponseError } from "@/utils";

export async function POST(req: Request) {
  try {
    const body: Vacancy = await req.json();
    const user = await getCurrentUser();
    if (!user) {
      return NextResponseError.Unauthorized();
    }

    const { id: userId, role } = user;
    if (role !== Role.EMPLOYER) {
      return NextResponseError.NotMatchesRole(Role.EMPLOYER);
    }

    const company = await prisma.company.findUnique({
      where: { userId },
    });
    if (!company) {
      return NextResponseError.NotFound("Company");
    }

    const { id: companyId } = company;

    const createVacancy = await prisma.vacancy.create({
      data: {
        ...body,
        companyId,
      },
    });

    return NextResponse.json({});
  } catch (e: any) {
    return NextResponseError.InternalServer();
  }
}
