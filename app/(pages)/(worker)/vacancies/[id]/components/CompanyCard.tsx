import { Card, HTag, PTag } from '@/app/components';
import { Company } from '@prisma/client';
import cn from 'classnames';
import Image from 'next/image';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface ICompanyCard extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  company: Company;
}

export const CompanyCard = ({ company, className }: ICompanyCard) => {
  return (
    <Card color='whiteShadow' className={cn('text-black p-4', className)}>
      <div className='mb-2'>
        {company.img ? (
          <Image width={'40'} height={'20'} src={company.img} alt="" />
        ) : (
          'Logo Company'
        )}
      </div>
      <HTag tag="h3" className="mb-4 font-medium">
        {company.name}
      </HTag>
      <PTag color="black">
        {company.countryCenterFull}
      </PTag>
    </Card>
  );
};
