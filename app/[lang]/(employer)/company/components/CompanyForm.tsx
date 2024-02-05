"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import type { Company } from "@prisma/client";
import cn from "classnames";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { Button, Card } from "@/app/components";
import { Input } from "@/app/components/tags/Input";
import { apiTypedRoutes } from "@/utils";

export interface ICompanyForm
  extends Omit<Company, "id" | "hashedPassword" | "userId"> {
  password: string;
}

const CompanySchema = Yup.object().shape({
  password: Yup.string()
    .required("Поле обязательно!")
    .min(8, "Минимум 8 символов"),
  name: Yup.string()
    .required("Поле обязательно!")
    .min(3, "Минимум 3 символа")
    .max(35, "Максимум 35 символов"),
  text: Yup.string()
    .required("Поле обязательно!")
    .max(5000, "Максимум 5000 символов"),
  countryCenterFull: Yup.string().required("Поле обязательно!"),
  img: Yup.string().required("Поле обязательно!"), // !!!
});

export const CompanyForm = ({
  setIsOpened,
  ...props
}: {
  setIsOpened: (newValue: boolean) => void;
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
    try {
      const res = await apiTypedRoutes.company.post(data);
      setIsOpened(false);
    } catch (e: any) {
      console.log(e);
    }
    router.refresh();
  };

  return (
    <Card
      color="gray"
      className={cn("absolute left-[40%] top-1/4 p-8")}
      {...props}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <Input
          {...register("name", {
            required: { value: true, message: "Заполните название" },
          })}
          autoComplete={"off"}
          placeholder={"Название компании"}
          color="black"
          error={errors.name}
          className={"mb-2"}
        />
        <Input
          {...register("password", {
            required: { value: true, message: "Заполните пароль" },
          })}
          autoComplete={"off"}
          placeholder={"Пароль"}
          color="black"
          type="password"
          error={errors.password}
          className={"mb-2"}
        />
        <Input
          {...register("countryCenterFull", {
            required: { value: true, message: "Заполните поле" },
          })}
          autoComplete={"off"}
          placeholder={"Адрес центра"}
          color="black"
          error={errors.countryCenterFull}
          className={"mb-2"}
        />
        <Input
          {...register("img", {
            required: { value: true, message: "Заполните поле" },
          })}
          autoComplete={"off"}
          placeholder={"Ссылка на фото"}
          color="black"
          error={errors.img}
          className={"mb-2"}
        />
        <Input
          {...register("text", {
            required: { value: true, message: "Заполните поле" },
          })}
          autoComplete={"off"}
          placeholder={"Описание"}
          color="black"
          error={errors.text}
          className={"mb-2"}
        />
        <Button type="submit" color="green" onClick={() => clearErrors()}>
          Создать
        </Button>
      </form>
    </Card>
  );
};
