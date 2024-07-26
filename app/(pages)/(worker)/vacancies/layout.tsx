import { Layout } from "@/components/custom";
import { FilterDesktop } from "@/components/custom/layout/components";
import prisma from "@/prisma/prismadb";

// Уровень зарплаты
export enum SalaryEnum {
  RANGE_1 = "RANGE_1",
  RANGE_2 = "RANGE_2",
  RANGE_3 = "RANGE_3",
  RANGE_4 = "RANGE_4",
}

export default async function VacanciesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const salaries = await prisma.vacancy.findMany({
    select: {
      salary: true,
    },
    orderBy: {
      salary: "asc",
    },
  });

  const salaryValues = salaries.map((vacancy) => vacancy.salary);

  const quarterLength = Math.ceil(salaryValues.length / 4);
  const salaryOptions = [
    {
      data: salaryValues.slice(0, quarterLength)[0] || 0,
      id: SalaryEnum.RANGE_1,
      countVacancies: salaryValues.slice(0, quarterLength).length,
    },
    {
      data: salaryValues.slice(quarterLength, quarterLength * 2)[0] || 0,
      id: SalaryEnum.RANGE_2,
      countVacancies: salaryValues.slice(quarterLength, quarterLength * 2)
        .length,
    },
    {
      data: salaryValues.slice(quarterLength * 2, quarterLength * 3)[0] || 0,
      id: SalaryEnum.RANGE_3,
      countVacancies: salaryValues.slice(quarterLength * 2, quarterLength * 3)
        .length,
    },
    {
      data: salaryValues.slice(quarterLength * 3)[0] || 0,
      id: SalaryEnum.RANGE_4,
      countVacancies: salaryValues.slice(quarterLength * 3).length,
    },
  ] as const;

  return (
    <Layout leftSide={<FilterDesktop salaryOptions={salaryOptions} />}>
      {children}
    </Layout>
  );
}
