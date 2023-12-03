import { KeySkills } from '../types';
import { IUser } from './user.interface';

export interface IResume {
  id?: string;
  text: string;
  keySkills: KeySkills[];
  user?: IUser;
}
