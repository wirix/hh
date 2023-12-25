import { Button, Card, HTag, LinkTag, PTag } from '@/app/components';
import { Company, Vacancy } from '@prisma/client';
import cn from 'classnames';
import { MdOutlineWorkOutline } from 'react-icons/md';

interface IVacancyItem extends Vacancy {
  className?: string;
  company: Company;
}

export const VacancyItem = ({
  className,
  id,
  salary,
  currency,
  name,
  city,
  experience,
  company,
}: IVacancyItem) => {
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
    <Card className={cn('flex flex-col p-3', className)} color="gray">
      <LinkTag text={name} size="2xl" href={`/vacancy/${id}`} className='font-semibold' />
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
      <Button>Откликнуться</Button>
    </Card>
  );
};
