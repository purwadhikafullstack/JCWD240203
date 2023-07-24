import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    transaction: [],
    totalTransaction: 0
};

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        setTransaction: (initialState, action) => {
            initialState.transaction = action.payload;
        },
        setTotalTransaction: (initialState, action) => {
            initialState.totalTransaction = action.payload;
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
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/transactions/user/${data.id}?page=${data.page}&&limit=${data.limit}`);

        dispatch(setTransaction(response.data.data.rows));
        dispatch(setTotalTransaction(response.data.data.count));
        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
}

export const updatePaymentProof = (data) => async(dispatch) => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/transactions`, {
            id: data.id,
            userId: data.userId,
            paymentProof: data.paymentProof
        }, {
            headers: {
                authorization: `Bearer ${data.token}`,
                "Content-Type": "multipart/form-data"
            }
        });

        setTimeout(() => {
            dispatch(getHistory({
                id: data.userId,
                page: data.page,
                limit: data.limit
            })).then(
                () => {},
                (error) => {return Promise.reject(error)}
            )
        }, 400);

        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
}

export const { setTransaction, setTotalTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;