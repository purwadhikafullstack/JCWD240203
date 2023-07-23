import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    transaction: []
};

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        setTransaction: (initialState, action) => {
            initialState.transaction = action.payload;
        }
    }
});

export const createTransaction = (data) => async(dispatch) => {
    try {
        const response = axios.post(`${process.env.REACT_APP_API_BASE_URL}/transactions`, {
            userId: data.userId,
            propertyId: data.propertyId,
            roomId: data.roomId,
            stock: data.stock,
            checkIn: data.checkIn,
            checkOut: data.checkOut
        }, {
            headers: {
                authorization: `Bearer ${data.token}`
            }
        })
        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
}

export const getHistory = (data) => async(dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/transactions/user/${data.id}`);

        dispatch(setTransaction(response.data.data));
        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
}

export const { setTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;