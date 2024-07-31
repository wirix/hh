import { Layout } from "@/components/custom";
import { FilterDesktop } from "@/components/custom/layout/components";
import prisma from "@/prisma/prismadb";

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
  const salaryOptions: {
    value: number;
    count: number;
  }[] = [
    {
      value: salaryValues.slice(0, quarterLength)[0] || 0,
      count: salaryValues.slice(0, quarterLength).length,
    },
    {
      value: salaryValues.slice(quarterLength, quarterLength * 2)[0] || 0,
      count: salaryValues.slice(quarterLength, quarterLength * 2).length,
    },
    {
      value: salaryValues.slice(quarterLength * 2, quarterLength * 3)[0] || 0,
      count: salaryValues.slice(quarterLength * 2, quarterLength * 3).length,
    },
    {
      value: salaryValues.slice(quarterLength * 3)[0] || 0,
      count: salaryValues.slice(quarterLength * 3).length,
    },
  ];

  return (
    <Layout leftSide={<FilterDesktop salaryOptions={salaryOptions} />}>
      {children}
    </Layout>
  );
}
