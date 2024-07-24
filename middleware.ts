import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { decrypt, updateSession } from "@/prisma/session/session";

import { useRoutes } from "./hooks";

const formRoutes = ["/signIn", "/register"];

export const middleware = async (request: NextRequest) => {
  try {
    const session = await updateSession(request);
    const sessionToken = session.cookies.get("session")?.value;
    const pathname = request.nextUrl.pathname;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const routes = useRoutes();

    if (!sessionToken) return session;
    const { role } = await decrypt(sessionToken);

    // if user have account and try link to form
    if (role && formRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL(`/`, request.url));
    }

    // if user is logged in and has correct role
    for (let i = 0; i < routes.length; i++) {
      if (pathname.includes(routes[i].href) && routes[i].role.includes(role)) {
        return session;
      }
    }

    if (pathname.includes("/error") || pathname === "/") {
      return session;
    }

    return NextResponse.redirect(new URL(`/error/404`, request.url));
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
