'use client';

import { $api } from '@/app/helpers';
import { yupResolver } from '@hookform/resolvers/yup';
import { Resume } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { ResumeSchema } from '../resume.validation';
import { Button, Card, Input } from '@/app/components';
import { useRouter } from 'next/navigation';

export interface IResumeForm extends Omit<Resume, 'id' | 'userId'> {}

export const ResumeForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IResumeForm>({
    resolver: yupResolver(ResumeSchema),
  });

  const onSubmit = async (data: IResumeForm) => {
    const res = await $api.post('./resume', JSON.stringify(data));
    router.refresh();
  };

  return (
    <Card color="whiteShadow" className="p-4 mb-8">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <Input
          {...register('namePosition', {
            required: { value: true, message: 'Используйте только символы a-z а-я' },
          })}
          autoComplete={'off'}
          placeholder="Должность"
          color="black"
          error={errors.namePosition}
          className={'mb-2'}
        />
        <Input
          {...register('country', { required: { value: true, message: 'Заполните поле' } })}
          autoComplete={'off'}
          placeholder="Страна"
          color="black"
          error={errors.country}
          className={'mb-2'}
        />
        <Input
          {...register('city', { required: { value: true, message: 'Заполните поле' } })}
          autoComplete={'off'}
          placeholder="Город"
          color="black"
          error={errors.city}
          className={'mb-2'}
        />
        <Input
          {...register('age', { required: { value: true, message: 'Заполните поле' } })}
          autoComplete={'off'}
          placeholder="Возраст"
          color="black"
          error={errors.age}
          className={'mb-2'}
        />
        <Input
          {...register('text', { required: { value: true, message: 'Заполните поле' } })}
          autoComplete={'off'}
          placeholder="О себе"
          color="black"
          error={errors.text}
          className={'mb-2'}
        />
        <Button type="submit" className="text-lg" disabled={isSubmitting}>
          Создать
        </Button>
      </form>
    </Card>
  );
};
