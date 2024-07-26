"use client";

import { Role } from "@prisma/client";

import { LinkTag, SubmitButton } from "@/components/custom";
import { Input } from "@/components/custom/tags/Input";

import { useActionForm } from "../useActionForm";
import { IFormData, registerAction } from "./_action";

export default function RegisterPage() {
  const { state, actionForm } = useActionForm<IFormData>(registerAction);

  return (
    <form action={actionForm} className="flex justify-center">
      <div className="flex flex-col">
        <Input
          className="mb-2"
          autoComplete="off"
          placeholder="Имя"
          color="black"
          id="username"
          name="username"
          error={
            state !== null && "error" in state
              ? { message: state.error.username?._errors[0] }
              : { message: "" }
          }
        />
        <Input
          className="mb-2"
          autoComplete="off"
          placeholder="Почта"
          color="black"
          type="email"
          id="email"
          name="email"
          error={
            state !== null && "error" in state
              ? { message: state.error.email?._errors[0] }
              : { message: "" }
          }
        />
        <Input
          className="mb-2"
          autoComplete="off"
          placeholder="Пароль"
          color="black"
          type="password"
          id="password"
          name="password"
          error={
            state !== null && "error" in state
              ? { message: state.error.password?._errors[0] }
              : { message: "" }
          }
        />
        <span className="mb-8">
          <select
            className="rounded dark:bg-green-600 dark:text-white"
            name="role"
            defaultValue={Role.WORKER}
          >
            <option value={Role.WORKER}>Соискатель</option>
            <option value={Role.EMPLOYER}>Работодатель</option>
          </select>
        </span>
        <div className="flex items-center justify-between">
          <SubmitButton>Регистрация</SubmitButton>
          <LinkTag color="gray" href="/signIn">
            Есть аккаунт
          </LinkTag>
        </div>
      </div>
    </form>
  );
}
