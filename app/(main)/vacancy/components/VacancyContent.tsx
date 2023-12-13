import { Button, Card, LinkTag, PTag } from '@/app/components';
import { MdOutlineWorkOutline } from 'react-icons/md';
export const VacancyContent = () => {
  const id = 1;
  return (
    <Card className="flex flex-col p-3" color="gray">
      <LinkTag
        text={'Middle Full stack разработчик (PHP / Vue.js), удаленно'}
        href={`/vacancy/${id}`}
      />
      <PTag className="font-bold mb-2" size="xl">
        140 000 – 150 000 ₽
      </PTag>
      <PTag size="sm">ООО Пенсил Софт </PTag>
      <PTag size="sm" className="mb-2">
        Красноярск
      </PTag>
      <div className="flex items-center mb-4">
        <MdOutlineWorkOutline />
        <PTag size="sm" className='ml-2'>Опыт от 3 до 6 лет</PTag>
      </div>
			<Button>Откликнуться</Button>
    </Card>
  );
};
