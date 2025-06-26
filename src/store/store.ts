import { configureStore } from '@reduxjs/toolkit';
import chartReducer from './slices/dashboardSlice';

export const store = configureStore({
  reducer: {
    chart: chartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;