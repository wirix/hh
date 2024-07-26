"use server";

import type { Company } from "@prisma/client";
import Image from "next/image";
import { IoMdPhotos } from "react-icons/io";

import { Card, HTag, PTag } from "@/components/custom";

export default async function CompanyInfo({
  company,
}: {
  company: Company | null;
}) {
  if (!company) {
    return (
      <div className="dark:text-white">
        Вы не подключены к компании. Подключитесь или создайте.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[200px_auto] gap-4">
      <Card color="gray" className="flex items-center justify-center p-4">
        {company.img ? (
          <Image src={company.img} width={100} height={40} alt="" />
        ) : (
          <IoMdPhotos size="100px" />
        )}
      </Card>

      <div className="col-span-1">
        <PTag color="gray">Организация</PTag>
        <HTag tag="h1" className="mb-8 font-semibold">
          {company.name}
        </HTag>
        <PTag color="gray" className="mb-8">
          Описание: {company.text}
        </PTag>
        <PTag color="gray">Список работников:</PTag>
      </div>
    </div>
  );
}
