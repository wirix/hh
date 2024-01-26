import { ExperienceTime } from "@prisma/client";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

import { PTag } from ".";

interface IExperience
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  experience: ExperienceTime;
  apperience: "white" | "gray";
}

export const Experience = ({
  experience,
  apperience,
  className,
}: IExperience) => {
  switch (experience) {
    case "FROM_ONE_TO_THREE":
      return (
        <PTag color={apperience} className={className} size="sm">
          от 1 до 3 лет
        </PTag>
      );
    case "FROM_THREE_TO_SIX":
      return (
        <PTag color={apperience} className={className} size="sm">
          от 3 до 6 лет
        </PTag>
      );
    case "NOT":
      return (
        <PTag color={apperience} className={className} size="sm">
          Без опыта
        </PTag>
      );
  }
};
