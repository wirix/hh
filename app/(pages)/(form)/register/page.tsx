'use client';

import { Button, LinkTag } from '@/app/components';
import { Input } from '@/app/components/tags/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { $api } from '@/app/helpers';
import { useRouter } from 'next/navigation';
import { Role } from '@prisma/client';
import { EnumTokens } from '@/app/enums/token.enum';
import { useTransition } from 'react';
import { toast } from 'react-toastify';

interface IRegister {
  username: string;
  email: string;
  password: string;
  role?: Role;
}

const RegistrationSchema = Yup.object().shape({
  email: Yup.string().email(`Неверно указан email`).required('Поле обязательно!'),
  password: Yup.string().required('Поле обязательно!').min(8, 'Минимум 8 символов'),
  username: Yup.string()
    .required('Поле обязательно!')
    .min(3, 'Минимум 3 символа')
    .max(15, 'Максимум 15 символов'),
  role: Yup.string().oneOf([Role.WORKER, Role.EMPLOYER], 'Неверное значение роли'),
});

export default function RegisterPage() {
  const [_, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<IRegister>({
    resolver: yupResolver(RegistrationSchema),
  });

  const onSubmit = async (data: IRegister) => {
    try {
      const res = await $api.post('./register', JSON.stringify(data));
      localStorage.setItem(EnumTokens.ACCESS_TOKEN, res.data.access_token);
      router.push(data.role === 'WORKER' ? '/vacancy' : '/company');
      startTransition(() => {
        router.refresh();
      });
      toast.success('Вы успешно создали аккаунт!', {
        position: 'bottom-right',
      });
    } catch (e: any) {
      if (e.response.status === 409) {
        toast.warning('Почта уже используется!', {
          position: 'bottom-right',
        });
      } else {
        toast.error('Ошибка!', {
          position: 'bottom-right',
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center">
      <div className="flex flex-col">
        <Input
          {...register('username', { required: { value: true, message: 'Заполните имя' } })}
          autoComplete={'off'}
          placeholder="Имя"
          color="black"
          error={errors.username}
          className={'mb-2'}
        />
        <Input
          {...register('email', { required: { value: true, message: 'Заполните почту' } })}
          autoComplete={'off'}
          placeholder="Почта"
          color="black"
          type="email"
          error={errors.email}
          className={'mb-2'}
        />
        <Input
          {...register('password', { required: { value: true, message: 'Заполните пароль' } })}
          autoComplete={'off'}
          placeholder="Пароль"
          color="black"
          type="password"
          error={errors.password}
          className={'mb-4'}
        />
        <span className="mb-8">
          <select {...register('role')}>
            <option value={Role.WORKER}>Ищу работу</option>
            <option value={Role.EMPLOYER}>Я Hr</option>
          </select>
        </span>
        <div className="flex justify-between items-center">
          <Button type="submit" color="green" onClick={() => clearErrors()}>
            Регистрация
          </Button>
          <LinkTag href="/signIn">Есть аккаунт</LinkTag>
        </div>
      </div>
    </form>
  );
}
