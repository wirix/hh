'use client';

import { Button, LinkTag } from '@/app/components';
import { Input } from '@/app/components/tags/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { $api } from '@/app/helpers';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signInSchema } from './signIn.validation';
import { EnumTokens } from '@/app/enums/token.enum';
import { useTransition } from 'react';

interface ISignIn {
  email: string;
  password: string;
}

export default function SignInPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<ISignIn>({
    resolver: yupResolver(signInSchema),
  });
  const [errorText, setErrorText] = useState<string>('');

  const onSubmit = async (data: ISignIn) => {
    try {
      const res = await $api.post('./signIn', JSON.stringify(data));
      localStorage.setItem(EnumTokens.ACCESS_TOKEN, res.data.access_token);
      router.push(res.data.user.role === 'WORKER' ? '/vacancy' : '/company');
      startTransition(() => {
        router.refresh();
      });
    } catch (e: any) {
      setErrorText(String(e.status));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center">
      <div className="flex flex-col">
        <Input
          {...register('email', { required: { value: true, message: 'Заполните почту' } })}
          autoComplete="off"
          placeholder="Email"
          color="black"
          type="email"
          error={errors.email}
          className="mb-2"
        />
        <Input
          {...register('password', { required: { value: true, message: 'Заполните пароль' } })}
          autoComplete="off"
          placeholder="Пароль"
          color="black"
          type="password"
          error={errors.password}
          className="mb-4"
        />
        {errorText}
        <div className="flex justify-between items-center">
          <Button type="submit" color="green" onClick={() => clearErrors()}>
            Войти
          </Button>
          <LinkTag href="/register">Создать аккаунт</LinkTag>
        </div>
      </div>
    </form>
  );
}
