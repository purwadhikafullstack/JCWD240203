import { configureStore } from '@reduxjs/toolkit';
import user from '../features/user/userSlice';
import property from '../features/property/propertySlice';
import country from '../features/country/countrySlice';
import transaction from '../features/transaction/transactionSlice';
import review from '../features/review/reviewSlice';
import category from '../features/category/categorySlice';
import room from '../features/room/roomSlice';

export const store = configureStore({
    reducer: {
        user,
        property,
        country,
        transaction,
        review,
        category,
        room
    }
})
