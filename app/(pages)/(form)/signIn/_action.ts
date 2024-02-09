"use server";

import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import prisma from "@/libs/prismadb";
import { encrypt } from "@/libs/session/session";

import { IResponseAction } from "../response-types";
import { FormDataSchema } from "./schema";

export interface IFormData {
  email: string;
  password: string;
}

export const sighInAction = async (
  prevState: any,
  formData: FormData,
): Promise<IResponseAction<IFormData>> => {
  const result = FormDataSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (result.success) {
    const { email, password } = result.data;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return { serverErrorMessage: "Неверно введены данные!" };
    }

    const isMatchesPassword = await bcrypt.compare(
      password,
      user.hashedPassword,
    );

    if (!isMatchesPassword) {
      return { serverErrorMessage: "Неверно введены данные!" };
    }

    const token = await encrypt(user);
    if (!token) {
      return { serverErrorMessage: "Произошла ошибка!" };
    }
    const upsertToken = await prisma.token.upsert({
      where: {
        userId: user.id,
      },
      update: {
        token,
      },
      create: {
        token,
        userId: user.id,
      },
    });

    cookies().set("session", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });

    revalidatePath("/");
    return { data: result.data, message: "Вы успешно вошли в аккаунт!" };
  }
  return { error: result.error.format() };
};
