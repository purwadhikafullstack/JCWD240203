import { configureStore } from '@reduxjs/toolkit';
import user from '../features/User/userSlice';
import property from '../features/property/propertySlice';

export const store = configureStore({
    reducer: {
        user,
        property
    }
})