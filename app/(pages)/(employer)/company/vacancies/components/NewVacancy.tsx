"use client";

import { useState } from "react";

import { Button, HTag } from "@/components/custom";

import { VacancyForm } from "./VacancyForm";

export const NewVacancy = () => {
  const [isCreateVacancy, setIsCreateVacancy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="mb-2 flex items-center justify-between px-3">
        <HTag tag="h2">Открытые вакансии:</HTag>
        {isCreateVacancy ? (
          <Button
            color="gray"
            disabled={isSubmitting}
            onClick={() => setIsCreateVacancy(false)}
            className="text-lg"
          >
            Отменить
          </Button>
        ) : (
          <Button
            onClick={() => setIsCreateVacancy(!isCreateVacancy)}
            className="text-lg"
            color="gray"
          >
            Создать
          </Button>
        )}
      </div>
      {isCreateVacancy && !isSubmitting && (
        <VacancyForm
          setIsCreateVacancy={setIsCreateVacancy}
          setIsSubmitting={setIsSubmitting}
        />
      )}
      {isSubmitting && <div className="ml-3 dark:text-white">Отправка...</div>}
    </div>
  );
};
