"use server";

import Image from "next/image";
import { IoMdPhotos } from "react-icons/io";

import { getCurrentUser } from "@/app/actions";
import { Card, HTag } from "@/app/components";
import prisma from "@/app/libs/prismadb";

import { Overlay } from "./components";

export default async function CompanyPage() {
  const user = await getCurrentUser();
  if (!user) {
    return <div>Вы не авторизованы. Авторизоваться.</div>;
  }

  const { id: userId, role } = user;
  if (role !== "EMPLOYER") {
    return <div>Вы не работодатель, чтобы посетить эту страницу.</div>;
  }

  const company = await prisma.company.findUnique({
    where: { userId },
  });

  const getCompanyText = () => {
    if (company) {
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
            <div>Организация</div>
            <HTag tag="h1" className="mb-8 font-semibold">
              {company.name}
            </HTag>
            <div className="mb-8">Описание: {company.text}</div>
            <div>Список работников:</div>
          </div>
        </div>
      );
    } else {
      return <div>Вы не подключены к компании. Подключитесь или создайте.</div>;
    }
  };

  return (
    <div className="flex justify-between">
      {getCompanyText()}
      <Overlay isExistCompany={Boolean(company)} />
    </div>
  );
}
