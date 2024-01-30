"use server";

import type { DetailedHTMLProps, HTMLAttributes } from "react";

import { HTag, PTag } from "@/app/components";

interface IVacancyRequirements
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  vacancyText: string | null;
  responsibilities: string;
  conditions: string | null;
  companyText: string | null;
}

interface IRequirements {
  title: string;
  content: string | null;
}

export default async function VacancyRequirements({
  vacancyText,
  responsibilities,
  conditions,
  companyText,
  className,
  ...props
}: IVacancyRequirements) {
  const requirements: IRequirements[] = [
    { title: "О компании:", content: companyText },
    { title: "Обязанности:", content: responsibilities },
    { title: "Условия:", content: conditions },
    { title: "Описание:", content: vacancyText },
  ];

  return (
    <div className={className} {...props}>
      {requirements.map(
        (item, i) =>
          item.content && (
            <div key={i} className="mb-6">
              <HTag tag="h3" className="mb-1 font-bold">
                {item.title}
              </HTag>
              <PTag color="gray" className="ml-4">
                {item.content}
              </PTag>
            </div>
          ),
      )}
    </div>
  );
}
