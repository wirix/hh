"use client";

import type { Company, Vacancy } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import Image from "next/image";
import type { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { CiCalendar, CiTimer } from "react-icons/ci";
import { FaCircle } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

import { CITY_OPTIONS, SCHEDULE_WORK_OPTIONS } from "@/components/constants";
import { LinkTag } from "@/components/custom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useWindowSize } from "@/hooks";
import { formatSalary } from "@/utils";
import { cn } from "@/utils";

import { useRespondVacancy } from "../useRespondVacancy";

interface IVacancyItem
  extends Vacancy,
    Omit<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
      "id"
    > {
  company: Company;
  userId: string;
}

export const VacancyItem: FC<IVacancyItem> = ({
  id,
  userId,
  createdAt,
  salary,
  currency,
  name,
  city,
  scheduleWork,
  experience,
  company,
  responderIds,
  text,
  className,
}) => {
  const {
    functions: { onSubmitRespond },
  } = useRespondVacancy({
    vacancyId: id,
  });
  const { width, height } = useWindowSize();

  const timeAgo = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: ru,
  });

  return (
    <Card
      className={cn(
        "grid grid-cols-[30px_1fr] grid-rows-[30px_30px] gap-1 p-4 lg:grid-cols-[60px_1fr] lg:grid-rows-[60px_20px_48px] lg:gap-2",
        className,
      )}
      color="whiteShadow"
    >
      <CardHeader className="col-start-1 col-end-3 row-start-1 row-end-2 p-0">
        <Image
          className="col-end-2"
          src={company.img}
          alt=""
          width={width < 1024 ? 30 : 60}
          height={width < 1024 ? 30 : 60}
        />
      </CardHeader>
      <CardContent className="col-start-2 row-start-1 row-end-2 p-0">
        <CardTitle className="text-sm font-medium">{company.name}</CardTitle>
        <CardTitle>
          <LinkTag
            color="gray"
            href={`/vacancies/${id}`}
            className="xl lg:2xl bold row-start-2"
          >
            {name}
          </LinkTag>
        </CardTitle>
      </CardContent>
      <CardContent className=" hidden lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-2 lg:flex lg:items-center lg:p-0">
        <CardDescription className="mr-1">{CITY_OPTIONS[city]}</CardDescription>
        <IoLocationOutline />
        <span className="mx-4">
          <FaCircle size={4} />
        </span>
        <CardDescription className="mr-1">
          {SCHEDULE_WORK_OPTIONS[scheduleWork]}
        </CardDescription>
        <CiTimer />
        <span className="mx-4">
          <FaCircle size={4} />
        </span>
        <CardDescription className="mr-1">
          {formatSalary(salary, currency)}
        </CardDescription>
        <span className="mx-4">
          <FaCircle size={4} />
        </span>
        <CardDescription className="mr-1">{timeAgo}</CardDescription>
        <CiCalendar />
      </CardContent>
      <CardFooter className="hidden lg:col-start-2 lg:col-end-3 lg:row-start-3 lg:row-end-3 lg:line-clamp-2 lg:p-0">
        {text}
      </CardFooter>
      {/* 
      {!responderIds.includes(userId) ? (
        <Button onClick={onSubmitRespond} color="green">
          Откликнуться
        </Button>
      ) : (
        <Button disabled color="gray">
          Ваша заявка принята
        </Button>
      )} */}
    </Card>
  );
};
