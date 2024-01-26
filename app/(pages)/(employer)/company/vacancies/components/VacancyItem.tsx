import type { Feedback, Vacancy } from "@prisma/client";
import type { DetailedHTMLProps, FC, HTMLAttributes } from "react";

import { Button, Card, Experience, LinkTag, PTag } from "@/app/components";

interface IVacancyItem
  extends Vacancy,
    Omit<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
      "id"
    > {
  feedback: Feedback[];
}

export const VacancyItem: FC<IVacancyItem> = ({
  id,
  salary,
  currency,
  name,
  city,
  experience,
  responderIds,
  feedback,
}) => {
  const getExperience = () => {
    switch (experience) {
      case "FROM_ONE_TO_THREE":
        return <PTag size="sm">от 1 до 3 лет</PTag>;
      case "FROM_THREE_TO_SIX":
        return <PTag size="sm">от 3 до 6 лет</PTag>;
      case "NOT":
        return <PTag size="sm">Без опыта</PTag>;
    }
  };

  return (
    <Card className="flex w-full items-center justify-between p-3" color="gray">
      <div className="grid grid-cols-[400px_200px_150px_130px_100px_150px_auto] items-center">
        <LinkTag
          color="white"
          href={`/vacancy/${id}`}
          className="font-semibold"
        >
          {name.slice(0, 42)}
        </LinkTag>
        <PTag className="font-bold" size="lg" color="white">
          {salary} {currency}
        </PTag>
        <PTag size="sm" color="white">
          {city}
        </PTag>
        <div className="flex items-center">
          <Experience apperience={"white"} experience={experience} />
        </div>
        <PTag color="white">{responderIds.length}</PTag>
        <PTag color="white">
          {responderIds.length -
            feedback.filter((f) => f.isInvite !== null).length}
        </PTag>
        <div className="flex">
          <LinkTag color="white" href={`vacancies/${id}`} className="mr-8">
            <Button color="black">Заявки</Button>
          </LinkTag>
        </div>
      </div>
    </Card>
  );
};
