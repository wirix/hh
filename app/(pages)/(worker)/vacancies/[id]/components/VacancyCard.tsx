"use client";

import { Vacancy } from "@prisma/client";
import cn from "classnames";
import { useRouter } from "next/navigation";
import { DetailedHTMLProps, useTransition } from "react";
import { toast } from "react-toastify";

import { Button, Card, HTag } from "@/app/components";
import { $api } from "@/app/helpers";

interface IVacancyCard
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  vacancy: Vacancy;
  userId: string;
}

export const VacancyCard = ({ vacancy, userId, className }: IVacancyCard) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // double code
  const onSubmitRespond = async () => {
    try {
      const res = await $api.get(`./vacancy/${userId}`);
      const feedback = await $api.post("./feedback", {
        userId,
        vacancyId: vacancy.id,
      });
      startTransition(() => {
        router.refresh();
      });
    } catch (e: any) {
      console.log(e);
      if (e.response.status === 400) {
        toast.error(
          'Вы не можете откликнуться без резюме. Вкладка "Мое резюме".',
        );
      }
    }
  };

  return (
    <Card color="whiteShadow" className={cn("p-4 text-black", className)}>
      <HTag tag="h1" className="mb-2 font-bold">
        {vacancy.name}
      </HTag>
      <HTag tag="h2" className="mb-4">
        от {vacancy.salary} {vacancy.currency} на руки
      </HTag>
      <div>Требуемый опыт работы: {vacancy.experience}</div>
      <div>Полная занятость, удаленная работа</div>
      <div className="mt-4">
        {!vacancy.responderIds.includes(userId) ? (
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
