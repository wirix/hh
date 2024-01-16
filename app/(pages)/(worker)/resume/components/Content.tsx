import { HTag, Hr, PTag } from '@/app/components';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface IContent extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  username: string;
  age: number;
  email: string;
  namePosition: string;
  text: string;
  country: string;
  city: string;
}

export const Content = ({ username, age, email, namePosition, text, country, city }: IContent) => {
  return (
    <div>
      <HTag tag="h2" className="mb-2">
        {username}
      </HTag>
      <div className="mb-2">
        <HTag tag="h6" color="cyan" className="text-xs">
          Возраст
        </HTag>
        <PTag color="gray">{age} лет</PTag>
      </div>
      <div>
        <HTag tag="h6" color="cyan" className="text-xs">
          Контакты
        </HTag>
        <PTag color="gray">{email} — предпочитаемый способ связи</PTag>
      </div>
      <Hr className="py-4" />
      <div className="mb-4">
        <HTag tag="h2" className="mb-2">
          {namePosition}
        </HTag>
        <HTag tag="h4" color="cyan">
          Обо мне
        </HTag>
        <div>{text}</div>
      </div>
      <div>
        <HTag tag="h6" color="cyan" >
          Гражданство
        </HTag>
        <PTag color="gray">
          Местоположение: {country}, {city}
        </PTag>
      </div>
    </div>
  );
};
