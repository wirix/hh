'use client';

import { Button, Card, HTag } from '@/app/components';
import { Company, Vacancy } from '@prisma/client';
import { useState } from 'react';
import { VacancyForm } from './VacancyForm';
import { VacancyItem } from './VacancyItem';
import { MdOutlineWorkOutline } from 'react-icons/md';
import { FaCity } from 'react-icons/fa';
import { FaMoneyBillWave } from 'react-icons/fa6';
import { BiCategory } from 'react-icons/bi';
import { BsFillWalletFill } from 'react-icons/bs';
import { FaEyeSlash } from 'react-icons/fa';

interface IVacancy extends Vacancy {
  company: Company;
}

export const CompanyVacancyContent = ({ vacancies }: { vacancies: IVacancy[] }) => {
  const [isCreateVacancy, setIsCreateVacancy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="flex flex-col">
      <HTag tag="h2" className="mb-2 flex justify-between items-center px-3">
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
      {isSubmitting && <div className="ml-2">Отправка...</div>}
      {vacancies.length ? (
        <table className="text-left border-none">
          <thead>
            <tr className="grid grid-cols-[400px_200px_100px_100px_100px_150px_auto] items-center px-3">
              <th className="flex items-center">
                Название <BiCategory className="ml-2" />
              </th>
              <th className="flex items-center">
                Заработная плата <FaMoneyBillWave className="ml-2" />
              </th>
              <th className="flex items-center">
                Город <FaCity className="ml-2" />
              </th>
              <th className="flex items-center">
                Опыт <MdOutlineWorkOutline className="ml-2" />
              </th>
              <th className="flex items-center">
                Всего <BsFillWalletFill className="ml-2" />
              </th>
              <th className="flex items-center">
                Не смотрено <FaEyeSlash className="ml-2" />
              </th>
              <th className="flex items-center">Операции</th>
            </tr>
          </thead>
          <tbody>
            {vacancies.map((v) => (
              <tr key={v.id}>
                <th>
                  <VacancyItem className="mb-4 last:mb-0" {...v} />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Card color="gray" className="flex justify-between items-center mt-8 p-4">
          Пусто
        </Card>
      )}
    </div>
  );
};
