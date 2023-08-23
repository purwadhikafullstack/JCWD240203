import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    transaction: [],
    totalTransaction: 0,
    order: [],
    totalOrder: 0
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
        },
        setOrder: (initialState, action) => {
            initialState.order = action.payload;
        },
        setTotalOrder: (initialState, action) => {
            initialState.totalOrder = action.payload;
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
};

export const getHistory = (data) => async(dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/transactions/user/${data.id}?page=${data.page}&&limit=${data.limit}&&status=${data.status}&&month=${data.month}&&year=${data.year}`);

        dispatch(setTransaction(response.data.data.rows));
        dispatch(setTotalTransaction(response.data.data.count));
        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
};

export const getOrder = (data) => async(dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/transactions/order/${data.id}?page=${data.page}&&limit=${data.limit}&&status=${data.status}&&month=${data.month}&&year=${data.year}`);

        dispatch(setOrder(response.data.data.rows));
        dispatch(setTotalOrder(response.data.data.count));
        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
}

export const getCompleted = (data) => async(dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/transactions/sales/${data.id}?type=${data.type}&&year=${data.year}&&month=${data.month}`, {
            headers: {
                authorization: `Bearer ${data.token}`
            }
        });

        dispatch(setOrder(response.data.data.rows));
        dispatch(setTotalOrder(response.data.data.count));
        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
}

export const updatePaymentProof = (data) => async(dispatch) => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/transactions/${data.id}`, {
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
                limit: data.limit,
                month: data.month,
                year: data.year
            })).then(
                () => {},
                (error) => {return Promise.reject(error)}
            )
        }, 200);

        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
};

export const updateStatus = (data) => async(dispatch) => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/transactions/status/${data.id}`, {
            userId: data.userId,
            response: data.response
        }, {
            headers: {
                authorization: `Bearer ${data.token}`
            }
        });

        if(data.type === 'Order') {
            setTimeout(() => {
                dispatch(getOrder({
                    id: data.userId,
                    page: data.page,
                    limit: data.limit,
                    month: data.month,
                    year: data.year
                })).then(
                    () => {},
                    (error) => {return Promise.reject(error)}
                )
            }, 200);
        }
        else if (data.type === 'History') {
            setTimeout(() => {
                dispatch(getHistory({
                    id: data.userId,
                    page: data.page,
                    limit: data.limit,
                    month: data.month,
                    year: data.year
                })).then(
                    () => {},
                    (error) => {return Promise.reject(error)}
                )
            }, 200);
        }

        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
};

export const getCurrent = (data) => async(dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/transactions/current/${data.userId}`)
        
        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
};

export const getCheckingOut = (data) => async(dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/transactions/leaving/${data.userId}`)
        
        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
};

export const getUpcoming = (data) => async(dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/transactions/upcoming/${data.userId}`)
        
        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
};

export const { setTransaction, setTotalTransaction, setOrder, setTotalOrder } = transactionSlice.actions;
export default transactionSlice.reducer;