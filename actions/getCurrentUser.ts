import { cookies } from "next/headers";

import prisma from "@/prisma/prismadb";
import { decrypt } from "@/prisma/session/session";
import { UserDto } from "@/prisma/session/user-dto";

export const getCurrentUser = async () => {
  try {
    const token = cookies().get("session")?.value || "";
    if (!token) {
      return null;
    }

    const decoded = (await decrypt(token)) as UserDto;
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
