import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { updateSession } from "@/libs/session/session";

export const middleware = async (request: NextRequest) => {
  try {
    return await updateSession(request);
  } catch (e) {
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
};

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
