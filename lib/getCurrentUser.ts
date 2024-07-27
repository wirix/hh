import { cookies } from "next/headers";

import { decrypt } from "@/lib/session/session";
import { UserDto } from "@/lib/session/user-dto";
import prisma from "@/prisma/prismadb";

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
