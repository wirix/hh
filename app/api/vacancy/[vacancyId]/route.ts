import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

import { getCurrentUser } from "@/actions";
import prisma from "@/libs/prismadb";
import { NextResponseError } from "@/utils";

interface IParams {
  vacancyId?: string;
}

export interface IVacancyResponse {
  isAllReady: boolean;
  message: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponseError.Unauthorized();
    }

    const { id: userId, role } = user;
    if (role !== Role.WORKER) {
      return NextResponseError.NotMatchesRole(Role.WORKER);
    }

    if (!user.resume) {
      return NextResponseError.NotFound("Resume");
    }

    const { vacancyId } = params;
    if (!vacancyId) {
      return NextResponseError.NotFound("VacancyId");
    }

    const vacancy = await prisma.vacancy.findUnique({
      where: {
        id: vacancyId,
      },
    });
    if (!vacancy) {
      return NextResponseError.NotFound("Vacancy");
    }

    const responderIds = vacancy.responderIds ?? [];
    if (responderIds.includes(userId)) {
      return NextResponse.json<IVacancyResponse>({
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

    const sendFeedbackToUser = await prisma.feedback.create({
      data: {
        vacancyId,
        userId,
      },
    });

    return NextResponse.json<IVacancyResponse>({
      isAllReady: false,
      message: "Заявка успешно принята!",
    });
  } catch (e: any) {
    return NextResponseError.InternalServer();
  }
}
