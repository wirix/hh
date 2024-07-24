"use server";

import { Role } from "@prisma/client";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

import prisma from "@/prisma/prismadb";
import { encrypt } from "@/prisma/session/session";

import { IResponseAction } from "../response-types";
import { FormDataSchema } from "./schema";

export interface IFormData {
  username: string;
  email: string;
  password: string;
  role?: Role;
}

export const registerAction = async (
  prevState: any,
  formData: FormData,
): Promise<IResponseAction<IFormData>> => {
  const result = FormDataSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    username: formData.get("username"),
    role: formData.get("role"),
  });

  if (result.success) {
    const { email, password, username, role } = result.data;

    const candidate = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (candidate) {
      return {
        serverErrorMessage: "Почта уже используется!",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();
    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
        name: username,
        role,
        activationLink,
      },
    });

    const token = await encrypt(user);
    if (!token) {
      return {
        serverErrorMessage: "Произошла ошибка!",
      };
    }

    cookies().set("session", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });

    revalidatePath("/");
    return { data: result.data, message: "Вы успешно создали аккаунт!" };
  }
  return { error: result.error.format() };
};
