"use server";

import Image from "next/image";
import { IoMdPhotos } from "react-icons/io";

import { getCurrentUser } from "@/app/actions";
import { Card, HTag, PTag } from "@/app/components";
import prisma from "@/app/libs/prismadb";

import { Overlay } from "./components";

export default async function CompanyPage() {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <div className="dark:text-white">Вы не авторизованы. Авторизоваться.</div>
    );
  }

  const { id: userId, role } = user;
  if (role !== "EMPLOYER") {
    return (
      <div className="dark:text-white">
        Вы не работодатель, чтобы посетить эту страницу.
      </div>
    );
  }

  const company = await prisma.company.findUnique({
    where: { userId },
  });

  const CompanyInfo = () => {
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
  };

  return (
    <div className="flex justify-between">
      <CompanyInfo />
      <Overlay isExistCompany={!!company} />
    </div>
  );
}
