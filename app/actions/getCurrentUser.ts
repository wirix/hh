import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import prisma from '../libs/prismadb';
import { NextResponse } from 'next/server';

interface ITokenData {
  email: string;
  id: string;
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

    const userId = decoded.id;
    
    const findCurrentUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!findCurrentUser) {
      return null;
    }

    return userId;
  } catch (e) {
    return null;
  }
};
