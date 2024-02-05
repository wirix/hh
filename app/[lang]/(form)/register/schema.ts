import { Role } from "@prisma/client";
import { z } from "zod";

export const FormDataSchema = z.object({
  email: z.string().email("Неверно указан email").min(1, "Поле обязательно"),
  password: z.string().min(8, "Минимум 8 символов").max(50),
  username: z
    .string()
    .min(3, "Минимум 3 символа")
    .max(15, "Максимум 15 символов"),
  role: z.enum([Role.WORKER, Role.EMPLOYER]),
});
