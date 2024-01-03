import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import prisma from '@/app/libs/prismadb';
import { EnumTokens } from '@/app/enums/token.enum';
import { UserDto } from '@/app/dtos';

interface ITokenData extends UserDto {
  iat: number;
  exp: number;
}

export const getCurrentUser = async () => {
  try {
    const token = cookies().get(EnumTokens.REFRESH_TOKEN)?.value || '';
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
    });
    if (!findCurrentUser) {
      return null;
    }

    return { role: decoded.role, userId: decoded.id, email: decoded.email };
  } catch (e) {
    return null;
  }
};
