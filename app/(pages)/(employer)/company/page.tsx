'use server';

import { getCurrentUser } from '@/app/actions';
import prisma from '@/app/libs/prismadb';
import { Overlay } from './components';
import { Card, HTag } from '@/app/components';
import { IoMdPhotos } from 'react-icons/io';
import Image from 'next/image';

export default async function CompanyPage() {
  const user = await getCurrentUser();
  if (!user) {
    return <div>Вы не авторизованы. Авторизоваться.</div>;
  }

  const { userId, role } = user;
  if (role === 'WORKER') {
    return <div>Вы не работодатель, чтобы посетить эту страницу.</div>;
  }

  const company = await prisma.company.findUnique({
    where: { userId },
  });

  const getCompanyText = () => {
    if (company) {
      return (
        <div className="grid grid-cols-[200px_auto] gap-4">
          <Card color="gray" className="p-4 flex justify-center items-center">
            {company.img ? <Image src={company.img} alt="" /> : <IoMdPhotos size="100px" />}
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
