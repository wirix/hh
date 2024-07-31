"use server";

import {
  City,
  Company,
  ExperienceTime,
  Prisma,
  ScheduleWork,
  Vacancy,
} from "@prisma/client";

import { CITY_OPTIONS, SCHEDULE_WORK_OPTIONS } from "@/components/constants";
import { Pagination } from "@/components/custom";
import { getCurrentUser } from "@/lib";
import prisma from "@/prisma/prismadb";

import { VacancyItem, VacancyItemSkeleton } from "./components";

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

  // проверить все searchParams на валидность через zod мб
  const { isAscendDate, schedulesWork, experienceTime, cities, salary, page } =
    searchParams as Record<string, string>;

  if (!page) {
    return [...Array(PAGE_SIZE)].map((_, index) => (
      <VacancyItemSkeleton key={index} className="mb-4" />
    ));
  }

  const skipItems = (Number(page ? page : 1) - 1) * PAGE_SIZE ?? 0;

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
            : (Object.keys(SCHEDULE_WORK_OPTIONS) as ScheduleWork[]),
      },
      salary: { gte: salary ? Number(salary) : 0 },
      city: {
        in:
          cities && !!cities.split(",").length
            ? (cities.split(",") as City[])
            : (Object.keys(CITY_OPTIONS) as City[]),
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
        pageSize={PAGE_SIZE}
      />
    </>
  );
}
