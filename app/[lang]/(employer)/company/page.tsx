"use server";

import { getCurrentUser } from "@/app/actions";
import prisma from "@/libs/prismadb";

import { CompanyInfo, Overlay } from "./components";

export default async function CompanyPage() {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <div className="dark:text-white">Вы не авторизованы. Авторизоваться.</div>
    );
  }

  const { id: userId, role } = user;
  if (role !== "EMPLOYER") {
    return (
      <div className="dark:text-white">
        Вы не работодатель, чтобы посетить эту страницу.
      </div>
    );
  }

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
