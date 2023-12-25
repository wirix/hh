import { Role } from '@prisma/client';
import { IResume } from './resume.interface';
import { IVacancy } from './vacancy.interface';

export interface IUser {
  id: string;
  createAt: Date;
  updateAt: Date;
  name: string;
  email: string;
  emailVerified: Date | null;
  image?: string;
  tel?: string;
  roles: Role;
  vacancies: IVacancy[];
  resume: IResume[];
}
