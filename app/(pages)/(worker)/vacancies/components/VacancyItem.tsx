"use client";

import { Company, Vacancy } from "@prisma/client";
import { useRouter } from "next/navigation";
import { DetailedHTMLProps, FC, HTMLAttributes, useTransition } from "react";
import { MdOutlineWorkOutline } from "react-icons/md";
import { toast } from "react-toastify";

import { Button, Card, LinkTag, PTag } from "@/app/components";
import { $api } from "@/app/helpers";

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
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // double code
  const onSubmitRespond = async () => {
    try {
      const res = await $api.get(`./vacancy/${id}`);
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

  const getExperience = () => {
    switch (experience) {
      case "FROM_ONE_TO_THREE":
        return (
          <PTag color="gray" size="sm" className="ml-2">
            Опыт от 1 до 3 лет
          </PTag>
        );
      case "FROM_THREE_TO_SIX":
        return (
          <PTag color="gray" size="sm" className="ml-2">
            Опыт от 3 до 6 лет
          </PTag>
        );
      case "NOT":
        return (
          <PTag color="gray" size="sm" className="ml-2">
            Без опыта
          </PTag>
        );
    }
  };

  return (
    <div className={className}>
      <Card className="flex flex-col p-3" color="whiteShadow">
        <LinkTag
          color="blue"
          size="2xl"
          href={`/vacancies/${id}`}
          className="font-semibold"
        >
          {name}
        </LinkTag>
        <PTag color="gray" className="mb-2 font-bold" size="lg">
          {salary} {currency}
        </PTag>
        <PTag color="gray" size="sm">
          {company.name}
        </PTag>
        <PTag color="gray" size="sm" className="mb-2">
          {city}
        </PTag>
        <div className="mb-4 flex items-center">
          <MdOutlineWorkOutline />
          {getExperience()}
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
    </div>
  );
};
