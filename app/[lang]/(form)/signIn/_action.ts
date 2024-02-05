"use server";

import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { Token } from "@/constants";
import { UserDto } from "@/helpers";
import prisma from "@/libs/prismadb";
import { tokenMethods } from "@/utils";

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

    const userDto = new UserDto(user);
    const token = tokenMethods.generateToken({ ...userDto });
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

    cookies().set(Token, token, {
      httpOnly: true,
    });

    revalidatePath("/");
    return { data: result.data, message: "Вы успешно вошли в аккаунт!" };
  }
  return { error: result.error.format() };
};
