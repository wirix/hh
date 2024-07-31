"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Currency } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { Button, Card } from "@/components/custom";
import { Input } from "@/components/custom/tags/Input";
import { apiTypedRoutes } from "@/utils";

export interface IVacancyForm {
  name: string;
  country: string;
  city: string;
  currency: Currency;
  salary: number;
  text?: string;
  responsibilities: string;
  conditions?: string;
}

const VacancySchema = Yup.object().shape({
  name: Yup.string().required("Поле обязательно!").min(6, "Минимум 6 символа"),
  country: Yup.string().required("Поле обязательно!"),
  city: Yup.string().required("Поле обязательно!"),
  currency: Yup.string().required("Поле обязательно!").oneOf([Currency.RUB]),
  salary: Yup.number().required("Обнаружен неразрешимый символ"),
  text: Yup.string(),
  responsibilities: Yup.string().required("Поле обязательно!"),
  conditions: Yup.string(),
});

export const VacancyForm = ({
  setIsCreateVacancy: setIsOpened,
  setIsSubmitting,
}: {
  setIsCreateVacancy: (isOpened: boolean) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IVacancyForm>({
    resolver: yupResolver(VacancySchema),
  });

  const onSubmit = async (data: IVacancyForm) => {
    try {
      setIsSubmitting(true);
      const res = await apiTypedRoutes.companyVacancy.post(data);
      toast.success("Успешно создана!");
      setIsOpened(false);
    } catch (e) {
      toast.error("Ошибка!");
      console.log(e);
    } finally {
      router.refresh();
      setIsSubmitting(false);
    }
  };

  return (
    <Card color="gray" className="mb-8 p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <Input
            {...register("name", {
              required: { value: true, message: "Заполните поле" },
            })}
            autoComplete={"off"}
            placeholder={"Название вакансии"}
            color="black"
            error={errors.name}
            className={"mb-2"}
          />
          <Input
            {...register("country", {
              required: { value: true, message: "Заполните поле" },
            })}
            autoComplete={"off"}
            placeholder={"Страна"}
            color="black"
            error={errors.country}
            className={"mb-2"}
          />
          <Input
            {...register("city", {
              required: { value: true, message: "Заполните поле" },
            })}
            autoComplete={"off"}
            placeholder={"Город"}
            color="black"
            error={errors.city}
            className={"mb-2"}
          />
          <Input
            {...register("salary", {
              required: { value: true, message: "Заполните поле" },
            })}
            autoComplete={"off"}
            placeholder={"Заработная плата"}
            color="black"
            error={errors.salary}
            className={"mb-2"}
          />
          <Input
            {...register("currency", {
              required: { value: true, message: "Заполните поле" },
            })}
            autoComplete={"off"}
            placeholder={"Валюта"}
            color="black"
            error={errors.currency}
            className={"mb-2"}
          />
          <Input
            {...register("responsibilities", {
              required: { value: true, message: "Заполните поле" },
            })}
            autoComplete={"off"}
            placeholder={"Обязанности"}
            color="black"
            error={errors.responsibilities}
            className={"mb-2"}
          />
          <Input
            {...register("conditions")}
            autoComplete={"off"}
            placeholder={"Условия"}
            color="black"
            error={errors.conditions}
            className={"mb-2"}
          />
          <Input
            {...register("text", {
              required: { value: true, message: "Заполните поле" },
            })}
            autoComplete={"off"}
            placeholder={"Описание вакансии"}
            color="black"
            error={errors.text}
            className={"mb-2"}
          />
          <Button type="submit" className="text-lg" disabled={isSubmitting}>
            {"Создать"}
          </Button>
        </div>
      </form>
    </Card>
  );
};
