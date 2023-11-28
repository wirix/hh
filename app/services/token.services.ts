import jwt, { Secret } from 'jsonwebtoken';
import { UserDto } from '../dtos';
import { NextResponse } from 'next/server';

class TokenService {
  generateTokens(payload: UserDto) {
    const access_token = jwt.sign({ ...payload }, process.env.JWT_ACCESS_TOKEN as Secret, {
      expiresIn: '30m',
    });
    const refresh_token = jwt.sign({ ...payload }, process.env.JWT_REFRESH_TOKEN as Secret, {
      expiresIn: '30d',
    });
    return {
      access_token,
      refresh_token,
    };
  }

  validateAccessToken(access_token: string) {
    try {
      const userData = jwt.verify(access_token, process.env.JWT_ACCESS_TOKEN as Secret);
      return userData;
    } catch (e: any) {
      return null;
    }
  }

  validateRefreshToken(refresh_token: string) {
    try {
      const userData = jwt.verify(refresh_token, process.env.JWT_REFRESH_TOKEN as Secret);
      return userData;
    } catch (e: any) {
      return null;
    }
  }
}

export const tokenService = new TokenService();
