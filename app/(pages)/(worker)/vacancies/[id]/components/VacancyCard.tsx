import { Button, Card, HTag } from '@/app/components';
import { Vacancy } from '@prisma/client';
import cn from 'classnames';
import { DetailedHTMLProps } from 'react';

interface IVacancyCard
  extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  vacancy: Vacancy;
  userId: string;
}

export const VacancyCard = ({ vacancy, userId, className }: IVacancyCard) => {
  return (
    <Card color="whiteShadow" className={cn('p-4 text-black', className)}>
      <HTag tag="h1" className="font-bold mb-2">
        {vacancy.name}
      </HTag>
      <HTag tag="h2" className="mb-4">
        от {vacancy.salary} {vacancy.currency} на руки
      </HTag>
      <div>Требуемый опыт работы: {vacancy.experience}</div>
      <div>Полная занятость, удаленная работа</div>
      <div className="mt-4">
        {!vacancy.responderIds.includes(userId) ? (
          <Button color="green" className="text-white">
            Откликнуться
          </Button>
        ) : (
          <Button color="gray" disabled className="text-white">
            Ваша заявка принята
          </Button>
        )}
      </div>
    </Card>
  );
};
