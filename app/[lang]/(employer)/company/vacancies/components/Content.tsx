"use client";

import type { Company, Feedback, Vacancy } from "@prisma/client";
import { useState } from "react";
import { BiCategory } from "react-icons/bi";
import { BsFillWalletFill } from "react-icons/bs";
import { FaCity, FaEyeSlash } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa6";
import { MdOutlineWorkOutline } from "react-icons/md";

import { Button, Card, HTag, PTag } from "@/app/components";

import { VacancyForm } from "./VacancyForm";
import { VacancyItem } from "./VacancyItem";

interface IVacancy extends Vacancy {
  company: Company;
  feedback: Feedback[];
}

export const Content = ({ vacancies }: { vacancies: IVacancy[] }) => {
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
      {isSubmitting && <div className="ml-3">Отправка...</div>}
      {!!vacancies.length ? (
        <table className="border-none text-left">
          <thead>
            <tr className="grid grid-cols-[400px_200px_150px_130px_100px_150px_auto] items-center px-3">
              <th>
                <PTag color="black" className="flex items-center">
                  Название <BiCategory className="ml-2" />
                </PTag>
              </th>
              <th>
                <PTag color="black" className="flex items-center">
                  Заработная плата
                  <FaMoneyBillWave className="ml-2" />
                </PTag>
              </th>
              <th>
                <PTag color="black" className="flex items-center">
                  Город <FaCity className="ml-2" />
                </PTag>
              </th>
              <th>
                <PTag color="black" className="flex items-center">
                  Опыт
                  <MdOutlineWorkOutline className="ml-2" />
                </PTag>
              </th>
              <th>
                <PTag color="black" className="flex items-center">
                  Всего
                  <BsFillWalletFill className="ml-2" />
                </PTag>
              </th>
              <th>
                <PTag color="black" className="flex items-center">
                  Не оценено
                  <FaEyeSlash className="ml-2" />
                </PTag>
              </th>
              <th>
                <PTag color="black">Операции</PTag>
              </th>
            </tr>
          </thead>
          <tbody>
            {vacancies.map((v) => (
              <tr key={v.id}>
                <th>
                  <VacancyItem
                    className="mb-4 last:mb-0"
                    {...v}
                  />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Card
          color="gray"
          className="mt-8 flex items-center justify-between p-4"
        >
          Пусто
        </Card>
      )}
    </div>
  );
};
