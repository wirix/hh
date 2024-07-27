"use server";

import {
  City,
  Company,
  ExperienceTime,
  Prisma,
  ScheduleWork,
  Vacancy,
} from "@prisma/client";

import { Pagination } from "@/components/custom";
import { getCurrentUser } from "@/lib";
import prisma from "@/prisma/prismadb";

import { VacancyItem } from "./components";

const PAGE_SIZE = 2;

export default async function VacanciesPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const user = await getCurrentUser();
  if (!user) {
    return <div className="dark:text-white">авторизуйтесь</div>;
  }

  const { isAscendDate, schedulesWork, experienceTime, cities, salary, page } =
    searchParams as Record<string, string>;

  // проверить все searchParams на валидность через zod мб
  const skipItems = (Number(page) - 1) * PAGE_SIZE ?? 0;

  const query: Prisma.VacancyFindManyArgs = {
    take: PAGE_SIZE,
    skip: skipItems,
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
  };

  const [vacanies, total] = (await prisma.$transaction([
    prisma.vacancy.findMany(query),
    prisma.vacancy.count({ where: query.where }),
  ])) as [Array<Vacancy & { company: Company }>, number];

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
      <Pagination
        activePage={Number(page)}
        totalItems={total}
        itemsPage={PAGE_SIZE}
      />
    </>
  );
}
