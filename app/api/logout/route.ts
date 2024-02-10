import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { NextResponseError } from "@/utils";

export async function GET(req: Request) {
  try {
    cookies().delete("session");
    return NextResponse.json({});
  } catch (e: any) {
    return NextResponseError.InternalServer();
  }
}
