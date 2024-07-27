"use server";

import { City, ExperienceTime, ScheduleWork } from "@prisma/client";

import { getCurrentUser } from "@/lib";
import prisma from "@/prisma/prismadb";

import { VacancyItem } from "./components";

export default async function VacanciesPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const user = await getCurrentUser();
  if (!user) {
    return <div className="dark:text-white">авторизуйтесь</div>;
  }

  const { isAscendDate, schedulesWork, experienceTime, cities, salary } =
    searchParams as Record<string, string>;

  const vacanies = await prisma.vacancy.findMany({
    take: 7,
    orderBy: {
      createdAt: isAscendDate === "true" ? "asc" : "desc",
    },
    where: {
      experience: experienceTime as ExperienceTime,
      scheduleWork: {
        in:
          schedulesWork && !!schedulesWork.split(",").length
            ? (schedulesWork.split(",") as ScheduleWork[])
            : ["FLEX", "FULL_DAY", "REMOTE"],
      },
      salary: { gte: salary ? Number(salary) : 0 },
      city: {
        in:
          cities && !!cities.split(",").length
            ? (cities.split(",") as City[])
            : ["KRASNOYARSK", "MOSCOW", "SAINT_PETERSBURG"],
      },
    },
    include: {
      company: true,
    },
  });

  if (!vacanies.length) {
    return <div className="dark:text-white">Вакансий нет.</div>;
  }

  return (
    <>
      {vacanies.map((v) => (
        <VacancyItem
          userId={user.id}
          key={v.id}
          className="mb-4 last:mb-0"
          {...v}
        />
      ))}
    </>
  );
}
