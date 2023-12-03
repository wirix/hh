import { ActionCreatorsMapObject, bindActionCreators, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { resumeReducer } from './resumeSlice/resumeSlice';

const store = configureStore({
  reducer: {
    resume: resumeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useActionCreators = (actions: ActionCreatorsMapObject) => {
  const dispatch = useAppDispatch();
  return useMemo(() => bindActionCreators(actions, dispatch), []);
};

export default store;
