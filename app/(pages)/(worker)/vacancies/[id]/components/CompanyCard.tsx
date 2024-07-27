"use server";

import type { Company } from "@prisma/client";
import Image from "next/image";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

import { Card, HTag, PTag } from "@/components/custom";
import { cn } from "@/utils";

interface ICompanyCard
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  company: Company;
}

export async function CompanyCard({ company, className }: ICompanyCard) {
  return (
    <Card
      color="whiteShadow"
      className={cn("p-4 text-black dark:shadow-none", className)}
    >
      <div className="mb-2">
        {company.img ? (
          <Image width={"40"} height={"20"} src={company.img} alt="" />
        ) : (
          "Logo Company"
        )}
      </div>
      <HTag tag="h3" className="mb-4 font-medium">
        {company.name}
      </HTag>
      <PTag color="black">{company.countryCenterFull}</PTag>
    </Card>
  );
}
