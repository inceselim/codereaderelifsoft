import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import authSlice from '../features/authSlice/authSlice'
import companySlice from '../features/companySlice/companySlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        companySlice: companySlice,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;