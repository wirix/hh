"use server";

import type { Company, Feedback, Vacancy } from "@prisma/client";
import { BiCategory } from "react-icons/bi";
import { BsFillWalletFill } from "react-icons/bs";
import { FaCity, FaEyeSlash } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa6";
import { MdOutlineWorkOutline } from "react-icons/md";

import { Card, PTag } from "@/app/components";

import { VacancyItem } from ".";

export default async function VacancyTable({
  vacancies,
}: {
  vacancies: (Vacancy & {
    feedback: Feedback[];
    company: Company;
  })[];
}) {
  if (!vacancies.length) {
    return (
      <Card color="gray" className="mt-8 flex items-center justify-between p-4">
        Пусто
      </Card>
    );
  }

  return (
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
              <VacancyItem className="mb-4 last:mb-0" {...v} />
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
