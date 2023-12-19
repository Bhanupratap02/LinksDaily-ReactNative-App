import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import linkSlice from './slices/linkSlice';
export const store = configureStore({
  reducer: {
    userAuth: authSlice,
    link: linkSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
