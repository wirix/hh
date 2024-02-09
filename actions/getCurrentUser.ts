import { cookies } from "next/headers";

import prisma from "@/libs/prismadb";
import { decrypt } from "@/libs/session/session";
import { UserDto } from "@/libs/session/user-dto";

interface ITokenData extends UserDto {
  iat: number;
  exp: number;
}

export const getCurrentUser = async () => {
  try {
    const token = cookies().get("session")?.value || "";
    if (!token) {
      return null;
    }

    const decoded = (await decrypt(token)) as ITokenData;
    // console.log("🚀 ~ getCurrentUser ~ decoded:", decoded);
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
