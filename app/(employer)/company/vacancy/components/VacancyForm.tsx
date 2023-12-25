'use client';

import { Button, Card, PTag } from '@/app/components';
import { Input } from '@/app/components/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { $api } from '@/app/helpers';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { Currency, Vacancy } from '@prisma/client';

export interface IVacancyForm {
  name: string;
  country: string;
  city: string;
  currency: Currency;
  isHome: boolean;
  salary: number;
  body: string;
}

const VacancySchema = Yup.object().shape({
  name: Yup.string().required(),
  country: Yup.string().required(),
  city: Yup.string().required(),
  currency: Yup.string().required().oneOf([Currency.RUB, Currency.USD]),
  isHome: Yup.boolean().required(),
  salary: Yup.number().required(), //
  body: Yup.string().required(),
});

export const VacancyForm = ({
  setIsCreateVacancy: setIsOpened,
  setIsSubmitting,
}: {
  setIsCreateVacancy: (isOpened: boolean) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<IVacancyForm>({
    resolver: yupResolver(VacancySchema),
  });
  const onSubmit = async (data: IVacancyForm) => {
    try {
      setIsSubmitting(true);
      const res = await $api.post('./vacancy', JSON.stringify(data));
      if (res.status === 200 && res.data.isSuccess) {
        setIsOpened(false);
      } else {
        console.log('Неверные введены данные');
      }
    } catch (e) {
      console.log('e', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card color="gray" className="p-4 mb-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <Input
            {...register('name', { required: { value: true, message: 'Заполните поле' } })}
            autoComplete={'off'}
            placeholder="Название вакансии"
            color="black"
            error={errors.name}
            className={'mb-2'}
          />
          <Input
            {...register('country', { required: { value: true, message: 'Заполните поле' } })}
            autoComplete={'off'}
            placeholder="Страна"
            color="black"
            error={errors.name}
            className={'mb-2'}
          />
          <Input
            {...register('city', { required: { value: true, message: 'Заполните поле' } })}
            autoComplete={'off'}
            placeholder="Город"
            color="black"
            error={errors.name}
            className={'mb-2'}
          />
          <Input
            {...register('salary', { required: { value: true, message: 'Заполните поле' } })}
            autoComplete={'off'}
            placeholder="Заработная плата"
            color="black"
            error={errors.name}
            className={'mb-2'}
          />
          <Input
            {...register('currency', { required: { value: true, message: 'Заполните поле' } })}
            autoComplete={'off'}
            placeholder="Валюта"
            color="black"
            error={errors.name}
            className={'mb-2'}
          />
          <Input
            {...register('body', { required: { value: true, message: 'Заполните поле' } })}
            autoComplete={'off'}
            placeholder="Описание вакансии"
            color="black"
            error={errors.name}
            className={'mb-2'}
          />
          <div className="flex justify-start items-center">
            <Input size={0} className="w-4" {...register('isHome')} type="checkbox" />
            <PTag className="ml-4">Можно работать из дома</PTag>
          </div>
          <Button type="submit" className="text-lg" disabled={isSubmitting}>
            Создать
          </Button>
        </div>
      </form>
    </Card>
  );
};
