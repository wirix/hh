"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import type { Resume } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button, Card, Input } from "@/app/components";
import { $api } from "@/helpers";

import { ResumeSchema } from "../resume-validation";

export interface IResumeForm extends Omit<Resume, "id" | "userId"> {}

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
    const res = await $api.post("./resume", JSON.stringify(data));
    router.refresh();
  };

  return (
    <Card color="whiteShadow" className="mb-8 p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <Input
          {...register("namePosition", {
            required: {
              value: true,
              message: "Используйте только символы a-z а-я",
            },
          })}
          autoComplete={"off"}
          placeholder="Должность"
          color="black"
          error={errors.namePosition}
          className={"mb-2"}
        />
        <Input
          {...register("country", {
            required: { value: true, message: "Заполните поле" },
          })}
          autoComplete={"off"}
          placeholder="Страна"
          color="black"
          error={errors.country}
          className={"mb-2"}
        />
        <Input
          {...register("city", {
            required: { value: true, message: "Заполните поле" },
          })}
          autoComplete={"off"}
          placeholder="Город"
          color="black"
          error={errors.city}
          className={"mb-2"}
        />
        <Input
          {...register("age", {
            required: { value: true, message: "Заполните поле" },
          })}
          autoComplete={"off"}
          placeholder="Возраст"
          color="black"
          error={errors.age}
          className={"mb-2"}
        />
        <Input
          {...register("text", {
            required: { value: true, message: "Заполните поле" },
          })}
          autoComplete={"off"}
          placeholder="О себе"
          color="black"
          error={errors.text}
          className={"mb-2"}
        />
        <Button type="submit" className="text-lg" disabled={isSubmitting}>
          Создать
        </Button>
      </form>
    </Card>
  );
};
