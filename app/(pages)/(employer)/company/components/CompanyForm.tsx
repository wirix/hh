'use client';

import { Button, Card } from '@/app/components';
import { Input } from '@/app/components/tags/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { $api } from '@/app/helpers';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { Company } from '@prisma/client';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';

export interface ICompanyForm
  extends Omit<Company, 'id' | 'hashedPassword' | 'userId' | 'text' | 'img'>,
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  password: string;
  text?: string;
  img?: string;
}

const CompanySchema = Yup.object().shape({
  password: Yup.string().required('Поле обязательно!').min(8, 'Минимум 8 символов'),
  name: Yup.string()
    .required('Поле обязательно!')
    .min(3, 'Минимум 3 символа')
    .max(35, 'Максимум 35 символов'),
  text: Yup.string().max(5000, 'Максимум 5000 символов'),
  countryCenter: Yup.string().required('Поле обязательно!'),
  img: Yup.string(),
});

export const CompanyForm = ({
  setIsOpened,
  className,
  ...props
}: ICompanyForm & {
  setIsOpened: (isOpened: boolean) => void;
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<ICompanyForm>({
    resolver: yupResolver(CompanySchema),
  });

  const onSubmit = async (data: ICompanyForm) => {
    const res = await $api.post('./company', JSON.stringify(data));
    if (res.status === 200 && res.data.isSuccess) {
      setIsOpened(false);
    } else {
      console.log('Неверные введены данные');
    }
  };

  return (
    <Card color="gray" className={cn('absolute left-[40%] top-1/4 p-8', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <Input
            {...register('name', { required: { value: true, message: 'Заполните название' } })}
            autoComplete={'off'}
            placeholder="Название компании"
            color="black"
            error={errors.name}
            className={'mb-4'}
          />
          <Input
            {...register('password', { required: { value: true, message: 'Заполните пароль' } })}
            autoComplete={'off'}
            placeholder="Пароль компании"
            color="black"
            type="password"
            error={errors.password}
            className={'mb-4'}
          />
          <Input
            {...register('countryCenter', {
              required: { value: true, message: 'Заполните поле' },
            })}
            autoComplete={'off'}
            placeholder="Адрес центра"
            color="black"
            error={errors.countryCenter}
            className={'mb-4'}
          />
          <Input
            {...register('img', { required: false })}
            autoComplete={'off'}
            placeholder="Ссылка на фото"
            color="black"
            className={'mb-4'}
          />
          <Input
            {...register('text', { required: false })}
            autoComplete={'off'}
            placeholder="Описание"
            color="black"
            error={errors.text}
            className={'mb-4'}
          />
          <Button type="submit" color="green" onClick={() => clearErrors()}>
            Создать
          </Button>
        </div>
      </form>
    </Card>
  );
};
