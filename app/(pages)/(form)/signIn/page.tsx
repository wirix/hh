"use client";

import { LinkTag, SubmitButton } from "@/app/components";
import { Input } from "@/app/components/tags/Input";

import { useActionForm } from "../useActionForm";
import { IFormData, sighInAction } from "./_action";

export default function SignInPage() {
  const { state, actionForm } = useActionForm<IFormData>(sighInAction);

  return (
    <form action={actionForm} className="flex justify-center">
      <div className="flex flex-col">
        <Input
          className="mb-2"
          autoComplete="off"
          placeholder="Email"
          color="black"
          type="email"
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
          name="password"
          error={
            state !== null && "error" in state
              ? { message: state.error.password?._errors[0] }
              : { message: "" }
          }
        />
        <div className="flex items-center justify-between">
          <SubmitButton>Войти</SubmitButton>
          <LinkTag color="gray" href="/register">
            Создать аккаунт
          </LinkTag>
        </div>
      </div>
    </form>
  );
}
