import { z } from "zod";

export const FormDataSchema = z.object({
  email: z.string().email("Неверно указан email").min(1, "Поле обязательно"),
  password: z
    .string()
    .min(8, "Минимум 8 символов")
    .max(50, "Максимум 50 символов"),
});
