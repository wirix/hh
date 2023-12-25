import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  try {
    const requestHeader = new Headers(request.headers);
    const bearerToken = requestHeader.get('Authorization');
    const access_token = bearerToken?.split(' ')[1];
    if (!access_token) {
      return new NextResponse('Unauthorization', { status: 401 });
    }

    const decoded = jwt.decode(access_token, { complete: true });
    if (!decoded) {
      return new NextResponse('Unauthorization', { status: 401 });
    }
  } catch (e) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export const config = {
  matcher: ['/api/vacancy', '/api/resume'],
};
