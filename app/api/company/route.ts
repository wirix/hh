import prisma from '../../libs/prismadb';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/app/actions';
import bcrypt from 'bcrypt';
import { ICompanyForm } from '@/app/(employer)/company/components';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse('Unauthorized', {
        status: 401,
      });
    }

    const { password, ...data }: ICompanyForm = body;
    const { userId, role } = user;

    if (role === 'WORKER') {
      return new NextResponse('Not correct role', {
        status: 403,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 3);

    const createCompany = await prisma.company.create({
      data: {
        userId,
        hashedPassword,
        ...data,
      },
    });

    return NextResponse.json({ isSuccess: true });
  } catch (e) {
    return new NextResponse('Internal Error', {
      status: 500,
    });
  }
}

// export async function GET(req: Request) {
//   const user = await getCurrentUser();
//   if (!user) {
//     return new NextResponse('Unauthorized', {
//       status: 401,
//     });
//   }

//   const { userId, role } = user;

//   if (role === 'WORKER') {
//     return new NextResponse('Not correct role', {
//       status: 403,
//     });
//   }

//   const createCompany = await prisma.company.findMany();
//   return createCompany;
// }
