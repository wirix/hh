"use server";

import "moment/locale/ru";

import moment from "moment";

import { getCurrentUser } from "@/app/actions";
import { LinkTag } from "@/app/components";
import prisma from "@/app/libs/prismadb";

export default async function FeedbackPage() {
  const user = await getCurrentUser();
  if (!user) {
    return <div>Вы не авторизованы. Авторизоваться.</div>;
  }

  const { role, resume, id } = user;
  if (role !== "WORKER") {
    return <div>Вы не соискатель, чтобы посетить эту страницу.</div>;
  }

  if (!resume) {
    return <div>У вас нет резюме, чтобы посетить эту страницу.</div>;
  }

  const feedback = await prisma.feedback.findMany({
    where: {
      userId: id,
    },
    include: {
      vacancy: {
        include: {
          company: true,
        },
      },
    },
  });

  if (feedback.length === 0) {
    return "Пусто";
  }

  return (
    <table className="w-full border-none text-left">
      <thead className="border-b-[1px]">
        <tr className="grid grid-cols-[300px_1fr_250px] items-center text-xs text-gray-500 underline decoration-dashed">
          <th className="px-4 py-2">Статус</th>
          <th className="px-4 py-2">Вакансия</th>
          <th className="px-4 py-2">Дата</th>
        </tr>
      </thead>
      <tbody>
        {feedback.map((f) => (
          <tr
            key={f.id}
            className="grid grid-cols-[300px_1fr_250px] items-center border-b-[1px]"
          >
            <th className="p-4">
              {f.isInvite ? (
                <div className="text-green-600">Приглашение</div>
              ) : f.isInvite === null ? (
                <div className="text-gray-500">Ожидание</div>
              ) : (
                <div className="text-red-500">Отказ</div>
              )}
            </th>
            <th className="p-4">
              <LinkTag color="gray" href={`/vacancies/${f.vacancyId}`}>
                {f.vacancy.name}
              </LinkTag>
              <div className="text-gray-500">в {f.vacancy.company.name}</div>
            </th>
            <th className="p-4">
              {moment(f.createdAt).locale("ru").format("DD MMMM YYYY")}
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
