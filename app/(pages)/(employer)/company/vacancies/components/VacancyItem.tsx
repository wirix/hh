import { Feedback, Vacancy } from "@prisma/client";
import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

import { Button, Card, LinkTag, PTag } from "@/app/components";

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
    <Card className="flex items-center justify-between p-3" color="gray">
      <div className="grid grid-cols-[300px_200px_100px_100px_100px_150px_auto] items-center">
        <LinkTag
          color="white"
          size="2xl"
          href={`/vacancy/${id}`}
          className="font-semibold"
        >
          {name.slice(0, 24)}
        </LinkTag>
        <PTag className="font-bold" size="lg">
          {salary} {currency}
        </PTag>
        <PTag size="sm">{city}</PTag>
        <div className="flex items-center">{getExperience()}</div>
        <PTag color="white">{responderIds.length}</PTag>
        <PTag color="white">{responderIds.length - feedback.length}</PTag>
        <div className="flex">
          <LinkTag color="gray" href={`vacancies/${id}`} className="mr-8">
            <Button color="white">Заявки</Button>
          </LinkTag>
          <Button color="white">Изменить</Button>
        </div>
      </div>
    </Card>
  );
};
