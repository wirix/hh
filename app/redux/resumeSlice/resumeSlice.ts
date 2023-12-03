import { IResume } from '@/app/interfaces/resume.interface';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IResumeState extends IResume {}

const initialState: IResumeState = {
  text: '',
  keySkills: [],
};

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    updateResume: (state, action: PayloadAction<IResumeState>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { reducer: resumeReducer, actions: resumeActions } = resumeSlice;
