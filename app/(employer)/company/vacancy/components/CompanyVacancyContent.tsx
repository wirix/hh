'use client';

import { Button, Card, HTag, VacancyItem } from '@/app/components';
import { Company, Vacancy } from '@prisma/client';
import { useState } from 'react';
import { VacancyForm } from './VacancyForm';

interface IVacancy extends Vacancy {
  company: Company;
}

export const CompanyVacancyContent = ({ vacancies }: { vacancies: IVacancy[] }) => {
  const [isCreateVacancy, setIsCreateVacancy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="flex flex-col">
      <HTag tag="h2" className="mb-2 flex justify-between items-center">
        <div>Открытые вакансии:</div>
        <div>
          {isCreateVacancy ? (
            <Button
              color="gray"
              disabled={isSubmitting}
              onClick={() => setIsCreateVacancy(false)}
              className="text-lg">
              Отменить
            </Button>
          ) : (
            <Button onClick={() => setIsCreateVacancy(!isCreateVacancy)} className="text-lg">
              Создать
            </Button>
          )}
        </div>
      </HTag>
      {isCreateVacancy && !isSubmitting && (
        <VacancyForm setIsCreateVacancy={setIsCreateVacancy} setIsSubmitting={setIsSubmitting} />
      )}
      {isSubmitting && <div>Отправка...</div>}
      {vacancies.length ? (
        <div>
          {vacancies.map((v) => (
            <VacancyItem className="mb-4 last:mb-0" key={v.id} {...v} />
          ))}
        </div>
      ) : (
        <Card color="gray" className="flex justify-between items-center mt-8 p-4">
          Пусто
        </Card>
      )}
    </div>
  );
};
