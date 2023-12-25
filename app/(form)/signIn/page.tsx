'use client';

import { Button, LinkTag } from '@/app/components';
import { Input } from '@/app/components/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { $api } from '@/app/helpers';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ISignIn {
  email: string;
  password: string;
}

const RegistrationSchema = Yup.object().shape({
  email: Yup.string().email(`Неверно указан email`).required('Поле обязательно!'),
  password: Yup.string().required('Поле обязательно!').min(8, 'Минимум 8 символов'),
});

export default function SignIn() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<ISignIn>({
    resolver: yupResolver(RegistrationSchema),
  });
  const [errorText, setErrorText] = useState<string>('');

  const onSubmit = async (data: ISignIn) => {
    try {
      const res = await $api.post('./signIn', JSON.stringify(data));
      localStorage.setItem('access_token', res.data.access_token);
      router.push(res.data.role === 'WORKER' ? '/vacancy' : '/company');
    } catch (e: any) {
      // !!!!
      if (e.status === 404) {
        setErrorText(e.status + '');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center">
      <div className="flex flex-col">
        <Input
          {...register('email', { required: { value: true, message: 'Заполните почту' } })}
          autoComplete={'off'}
          placeholder="Email"
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
        {errorText}
        <div className="flex justify-between items-center">
          <Button type="submit" color="green" onClick={() => clearErrors()}>
            Войти
          </Button>
          <LinkTag text="Создать аккаунт" href="/register" />
        </div>
      </div>
    </form>
  );
}
