"use client";

import type { Role, Vacancy } from "@prisma/client";
import type { DetailedHTMLProps } from "react";

import { Button, Card, HTag, PTag } from "@/components/custom";
import { cn, formatSalary } from "@/utils";

import { useRespondVacancy } from "../../useRespondVacancy";

interface IVacancyCard
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  role: Role;
  vacancy: Vacancy;
  userId: string;
}

export const VacancyCard = ({
  vacancy,
  userId,
  role,
  className,
}: IVacancyCard) => {
  const {
    functions: { onSubmitRespond },
  } = useRespondVacancy({
    vacancyId: vacancy.id,
  });

  return (
    <Card
      color="whiteShadow"
      className={cn("p-4 text-black dark:shadow-none", className)}
    >
      <HTag tag="h1" className="mb-2 font-bold">
        {vacancy.name}
      </HTag>
      <HTag tag="h2" className="mb-4">
        от {formatSalary(vacancy.salary, vacancy.currency)} на руки
      </HTag>
      <PTag color="gray">Требуемый опыт работы: {vacancy.experience}</PTag>
      <PTag color="gray">Полная занятость, удаленная работа</PTag>
      <div className="mt-4">
        {role !== "WORKER" ? (
          <Button disabled color="green" className="text-white">
            Войдите в аккаунт соискатем
          </Button>
        ) : !vacancy.responderIds.includes(userId) && role === "WORKER" ? (
          <Button
            onClick={onSubmitRespond}
            color="green"
            className="text-white"
          >
            Откликнуться
          </Button>
        ) : (
          <Button color="gray" disabled className="text-white">
            Ваша заявка принята
          </Button>
        )}
      </div>
    </Card>
  );
};
