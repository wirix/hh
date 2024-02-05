import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import { Token } from '@/constants';
import { UserDto } from "@/helpers";
import prisma from "@/libs/prismadb";

interface ITokenData extends UserDto {
  iat: number;
  exp: number;
}

export const getCurrentUser = async () => {
  try {
    const token = cookies().get(Token)?.value || "";
    if (!token) {
      return null;
    }

    const decoded = jwt.decode(token) as ITokenData;
    if (!decoded) {
      return null;
    }

    const findCurrentUser = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      include: {
        resume: true,
      },
    });
    if (!findCurrentUser) {
      return null;
    }

    return { ...findCurrentUser };
  } catch (e) {
    return null;
  }
};
