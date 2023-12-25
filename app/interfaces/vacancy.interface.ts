import { ICompany } from './company.interface';
import { IUser } from './user.interface';

export interface IVacancy {
  id: string;
  createAt: Date;
  updateAt: Date;
  name: string;
  about?: string;
  watchingNow: number;
  closed: boolean;
  company: ICompany;
  responders: IUser[];
}
