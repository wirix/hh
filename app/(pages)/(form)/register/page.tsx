"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Role } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Button, LinkTag } from "@/app/components";
import { Input } from "@/app/components/tags/Input";
import { EnumTokens } from "@/app/enums/token.enum";
import { $api } from "@/app/helpers";

import { RegisterSchema } from "./register.validation";

interface IRegister {
  username: string;
  email: string;
  password: string;
  role?: Role;
}

export default function RegisterPage() {
  const [_, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<IRegister>({
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = async (data: IRegister) => {
    try {
      const res = await $api.post("./register", JSON.stringify(data));
      localStorage.setItem(EnumTokens.ACCESS_TOKEN, res.data.access_token);
      router.push(data.role === "WORKER" ? "/vacancies" : "/company");
      startTransition(() => {
        router.refresh();
      });
      toast.success("Вы успешно создали аккаунт!");
    } catch (e: any) {
      if (e.response.status === 409) {
        toast.warning("Почта уже используется!");
      } else {
        toast.error("Ошибка!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center">
      <div className="flex flex-col">
        <Input
          {...register("username", {
            required: { value: true, message: "Заполните имя" },
          })}
          autoComplete={"off"}
          placeholder="Имя"
          color="black"
          error={errors.username}
          className={"mb-2"}
        />
        <Input
          {...register("email", {
            required: { value: true, message: "Заполните почту" },
          })}
          autoComplete={"off"}
          placeholder="Почта"
          color="black"
          type="email"
          error={errors.email}
          className={"mb-2"}
        />
        <Input
          {...register("password", {
            required: { value: true, message: "Заполните пароль" },
          })}
          autoComplete={"off"}
          placeholder="Пароль"
          color="black"
          type="password"
          error={errors.password}
          className={"mb-4"}
        />
        <span className="mb-8">
          <select {...register("role")}>
            <option value={Role.WORKER}>Соискатель</option>
            <option value={Role.EMPLOYER}>Работодатель</option>
          </select>
        </span>
        <div className="flex items-center justify-between">
          <Button type="submit" color="green" onClick={() => clearErrors()}>
            Регистрация
          </Button>
          <LinkTag color="gray" href="/signIn">
            Есть аккаунт
          </LinkTag>
        </div>
      </div>
    </form>
  );
}
