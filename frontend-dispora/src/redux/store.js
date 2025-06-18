import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import droughtDataReducer from './droughtDataSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    droughtData: droughtDataReducer,
  },
});

