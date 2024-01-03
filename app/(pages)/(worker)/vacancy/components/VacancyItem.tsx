'use client';

import { Button, Card, LinkTag, Modal, PTag } from '@/app/components';
import { $api } from '@/app/helpers';
import { Company, Vacancy } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { DetailedHTMLProps, FC, HTMLAttributes, useState, useTransition } from 'react';
import { MdOutlineWorkOutline } from 'react-icons/md';

interface IVacancyItem
  extends Vacancy,
    Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'id'> {
  company: Company;
  userId: string;
}

export const VacancyItem: FC<IVacancyItem> = ({
  id,
  userId,
  salary,
  currency,
  name,
  city,
  experience,
  company,
  responderIds,
  className,
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [modalData, setModalData] = useState<{ message: string; status: number | null }>({
    message: '',
    status: null,
  });

  const onSubmitRespond = async () => {
    const res = await $api.get(`./vacancy/${id}`);
    if (res.data.isSuccess) {
      setModalData({
        message: res.data.message,
        status: res.status,
      });
      startTransition(() => {
        router.refresh();
      });
    }
  };

  const getExperience = () => {
    switch (experience) {
      case 'FROM_ONE_TO_THREE':
        return (
          <PTag size="sm" className="ml-2">
            Опыт от 1 до 3 лет
          </PTag>
        );
      case 'FROM_THREE_TO_SIX':
        return (
          <PTag size="sm" className="ml-2">
            Опыт от 3 до 6 лет
          </PTag>
        );
      case 'NOT':
        return (
          <PTag size="sm" className="ml-2">
            Без опыта
          </PTag>
        );
    }
  };

  return (
    <div className={className}>
      <Card className="flex flex-col p-3" color="gray">
        <LinkTag size="2xl" href={`/vacancy/${id}`} className="font-semibold">
          {name}
        </LinkTag>
        <PTag className="font-bold mb-2" size="lg">
          {salary} {currency}
        </PTag>
        <PTag size="sm">{company.name}</PTag>
        <PTag size="sm" className="mb-2">
          {city}
        </PTag>
        <div className="flex items-center mb-4">
          <MdOutlineWorkOutline />
          {getExperience()}
        </div>
        {!responderIds.includes(userId) ? (
          <Button onClick={onSubmitRespond}>Откликнуться</Button>
        ) : (
          <Button disabled color="gray">
            Вы заявка принята
          </Button>
        )}
      </Card>
      {modalData.message && modalData.status && (
        <Modal className={'fixed bottom-8 right-8'} {...modalData} />
      )}
    </div>
  );
};
