import { IUser } from './user.interface';

export interface IResume {
  id?: string;
  text: string;
  user?: IUser;
}
