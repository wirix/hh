"use server";

import "moment/locale/ru";

import moment from "moment";

import { LinkTag, PTag } from "@/components/custom";
import { getCurrentUser } from "@/lib";
import prisma from "@/prisma/prismadb";

export default async function FeedbackPage() {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <div className="dark:text-white">Вы не авторизованы. Авторизоваться.</div>
    );
  }

  const { resume, id } = user;

  if (!resume) {
    return (
      <div className="dark:text-white">
        У вас нет резюме, чтобы посетить эту страницу.
      </div>
    );
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

  if (!feedback.length) {
    return <div className="dark:text-white">Пока ничего нет.</div>;
  }

  return (
    <table className="w-full border-none text-left">
      <thead className="border-b-[1px]">
        <tr className="grid grid-cols-[300px_1fr_250px] items-center text-xs text-gray-500 underline decoration-dashed dark:decoration-neutral-100">
          <th className="px-4 py-2 dark:text-white">Статус</th>
          <th className="px-4 py-2 dark:text-white">Вакансия</th>
          <th className="px-4 py-2 dark:text-white">Дата</th>
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
                <div className="text-green-600 dark:text-green-400">
                  Приглашение
                </div>
              ) : f.isInvite === null ? (
                <div className="text-gray-500 dark:text-gray-300">Ожидание</div>
              ) : (
                <div className="text-red-500 dark:text-red-300">Отказ</div>
              )}
            </th>
            <th className="p-4">
              <LinkTag color="gray" href={`/vacancies/${f.vacancyId}`}>
                {f.vacancy.name}
              </LinkTag>
              <PTag color="gray">в {f.vacancy.company.name}</PTag>
            </th>
            <th className="p-4">
              <PTag color="gray">
                {moment(f.createdAt).locale("ru").format("DD MMMM YYYY")}
              </PTag>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
