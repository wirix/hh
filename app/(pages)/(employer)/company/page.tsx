"use server";

import { getCurrentUser } from "@/actions";
import prisma from "@/prisma/prismadb";

import { Overlay } from "./components";
import CompanyInfo from "./components/CompanyInfo";

export default async function CompanyPage() {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <div className="dark:text-white">Вы не авторизованы. Авторизоваться.</div>
    );
  }

  const { id: userId } = user;

  const company = await prisma.company.findUnique({
    where: { userId },
  });

  return (
    <div className="flex justify-between">
      <CompanyInfo company={company} />
      <Overlay isExistCompany={!!company} />
    </div>
  );
}
