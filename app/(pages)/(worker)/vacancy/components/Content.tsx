'use client';

import { VacancyItem } from '../components';
import { Company, User, Vacancy } from '@prisma/client';

export function Content({
  vacanies,
  user,
}: {
  vacanies: (Vacancy & { company: Company })[];
  user: User;
}) {
  return (
    <>
      {vacanies.map((v) => (
        <VacancyItem userId={user.id} key={v.id} className="mb-4 last:mb-0" {...v} />
      ))}
    </>
  );
}
