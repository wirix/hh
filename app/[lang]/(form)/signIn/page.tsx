"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Button, LinkTag } from "@/app/components";
import { Input } from "@/app/components/tags/Input";
import { $api } from "@/app/helpers";
import { EnumTokens } from "@/enum/token.enum";

import { signInSchema } from "./signIn.validation";

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

  const onSubmit = async (data: ISignIn) => {
    try {
      const res = await $api.post("./signIn", JSON.stringify(data));
      if (res.status >= 400) throw new Error();
      localStorage.setItem(EnumTokens.ACCESS_TOKEN, res.data.access_token);
      router.push(res.data.user.role === "WORKER" ? "/vacancies" : "/company");
      startTransition(() => {
        router.refresh();
      });
      toast.success("Вы успешно вошли в аккаунт!");
    } catch (e: any) {
      if (e.response.status === 404) {
        toast.warning("Аккаунта не существует!");
      } else {
        toast.error("Ошибка!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center">
      <div className="flex flex-col">
        <Input
          {...register("email", {
            required: { value: true, message: "Заполните почту" },
          })}
          autoComplete="off"
          placeholder="Email"
          color="black"
          type="email"
          error={errors.email}
          className="mb-2"
        />
        <Input
          {...register("password", {
            required: { value: true, message: "Заполните пароль" },
          })}
          autoComplete="off"
          placeholder="Пароль"
          color="black"
          type="password"
          error={errors.password}
          className="mb-4"
        />
        <div className="flex items-center justify-between">
          <Button type="submit" color="green" onClick={() => clearErrors()}>
            Войти
          </Button>
          <LinkTag color="gray" href="/register">
            Создать аккаунт
          </LinkTag>
        </div>
      </div>
    </form>
  );
}
