import { Role } from "@prisma/client";
import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email(`Неверно указан email`)
    .required("Поле обязательно!"),
  password: Yup.string()
    .required("Поле обязательно!")
    .min(8, "Минимум 8 символов"),
  username: Yup.string()
    .required("Поле обязательно!")
    .min(3, "Минимум 3 символа")
    .max(15, "Максимум 15 символов"),
  role: Yup.string().oneOf(
    [Role.WORKER, Role.EMPLOYER],
    "Неверное значение роли",
  ),
});
