import jwt, { Secret } from "jsonwebtoken";

import { UserDto } from "@/helpers";

class TokenMethods {
  generateToken(payload: UserDto) {
    try {
      const token = jwt.sign(
        payload,
        process.env.NEXT_PUBLIC_JWT_SECRET_TOKEN as Secret,
        {
          expiresIn: "30d",
        },
      );
      return token;
    } catch (e: any) {
      return null;
    }
  }

  validateToken(token: string) {
    try {
      const userData = jwt.verify(
        token,
        process.env.NEXT_PUBLIC_JWT_SECRET_TOKEN as Secret,
      );
      return userData;
    } catch (e: any) {
      return null;
    }
  }
}

export const tokenMethods = new TokenMethods();
