import { ExperienceTime } from "@prisma/client";

import { PTag } from ".";

interface IExperience {
  experience: ExperienceTime;
}

export const Experience = ({ experience }: IExperience) => {
  switch (experience) {
    case "FROM_ONE_TO_THREE":
      return <PTag size="sm">от 1 до 3 лет</PTag>;
    case "FROM_THREE_TO_SIX":
      return <PTag size="sm">от 3 до 6 лет</PTag>;
    case "NOT":
      return <PTag size="sm">Без опыта</PTag>;
  }
};
