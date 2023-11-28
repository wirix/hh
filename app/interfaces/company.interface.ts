import { IVacancy } from './vacancy.interface';

export interface ICompany {
  id: string;
  name: string;
  vacancies: IVacancy[];
}
