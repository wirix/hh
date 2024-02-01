import { Role } from '@prisma/client';
import { NextResponse } from "next/server";

import { getCurrentUser } from "@/actions";
import { ResponseError } from "@/api-service";
import prisma from "@/libs/prismadb";

interface IParams {
  vacancyId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return ResponseError.Unauthorized();
    }

    const { id: userId, role } = user;
    if (role !== Role.WORKER) {
      return ResponseError.NotMatchesRole(Role.WORKER);
    }

    if (!user.resume) {
      return ResponseError.NotFound("Resume");
    }

    const { vacancyId } = params;

    const vacancy = await prisma.vacancy.findUnique({
      where: {
        id: vacancyId,
      },
    });
    if (!vacancy) {
      return ResponseError.NotFound("Vacancy");
    }

    const responderIds = vacancy.responderIds ?? [];
    if (responderIds.includes(userId)) {
      return NextResponse.json({
        isSuccess: true,
        isAllReady: true,
        message: "Ваша заявка была уже отправлена!",
      });
    }

    responderIds.push(userId);

    const pushUserIdToVacancy = await prisma.vacancy.update({
      where: {
        id: vacancyId,
      },
      data: {
        responderIds,
      },
    });

    return NextResponse.json({
      isSuccess: true,
      isAllReady: false,
      message: "Заявка успешно принята!",
    });
  } catch (e: any) {
    return ResponseError.InternalServer();
  }
}
