import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import prisma from '../libs/prismadb';
import { Role } from '@prisma/client';

interface ITokenData {
  email: string;
  id: string;
  role: Role;
  iat: number;
  exp: number;
}

export const getCurrentUser = async () => {
  try {
    const token = cookies().get('refresh_token')?.value || '';
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
