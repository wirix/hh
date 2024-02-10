import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { UserDto } from "./user-dto";

const secret_key = new TextEncoder().encode(
  process.env.NEXT_PUBLIC_JWT_SECRET_TOKEN,
);

export async function encrypt(data: any) {
  const payload = new UserDto(data);
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7days")
    .sign(secret_key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, secret_key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (e: any) {
    console.log(e);
  }
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const res = NextResponse.next();
  if (!session) return res;

  const parsed = await decrypt(session);
  const token = await encrypt(parsed);
  res.cookies.set({
    name: "session",
    value: token,
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });
  return res;
}
