"use client";

import type { Company, Vacancy } from "@prisma/client";
import type { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { MdOutlineWorkOutline } from "react-icons/md";

import { Button, Card, Experience, LinkTag, PTag } from "@/app/components";
import { formatSalary } from "@/helpers";
import { cn } from "@/lib/utils";

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
  salary,
  currency,
  name,
  city,
  experience,
  company,
  responderIds,
  className,
}) => {
  const {
    functions: { onSubmitRespond },
  } = useRespondVacancy({
    vacancyId: id,
  });

  return (
    <Card className={cn("flex flex-col p-3", className)} color="whiteShadow">
      <LinkTag
        color="blue"
        size="2xl"
        href={`/vacancies/${id}`}
        className="font-semibold"
      >
        {name}
      </LinkTag>
      <PTag color="gray" className="mb-2 font-bold" size="lg">
        {formatSalary(salary, currency)}
      </PTag>
      <PTag color="gray" size="sm">
        {company.name}
      </PTag>
      <PTag color="gray" size="sm" className="mb-2">
        {city}
      </PTag>
      <div className="mb-4 flex items-center">
        <MdOutlineWorkOutline />
        <Experience
          className="ml-1"
          experience={experience}
          apperience={"gray"}
        />
      </div>
      {!responderIds.includes(userId) ? (
        <Button onClick={onSubmitRespond} color="green">
          Откликнуться
        </Button>
      ) : (
        <Button disabled color="gray">
          Ваша заявка принята
        </Button>
      )}
    </Card>
  );
};
