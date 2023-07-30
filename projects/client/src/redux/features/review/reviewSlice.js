import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    review: [],
    totalReview: 0
};

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        setReview: (initialState, action) => {
            initialState.review = action.payload;
        },
        setTotalReview: (initialState, action) => {
            initialState.totalReview = action.payload;
        }
    }
});

export const postReview = (data) => async(dispatch) => {
    try {
        const response = axios.post(`${process.env.REACT_APP_API_BASE_URL}/properties/review`, {
            userId: data.userId,
            propertyId: data.propertyId,
            rating: data.rating,
            description: data.description
        }, {
            headers: {
                authorization: `Bearer ${data.token}`
            }
        });

        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
}

export const getPropertyReview = (data) => async(dispatch) => {
    try {
        console.log(data);
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/properties/review/${data.id}?limit=${data.limit}&&page=${data.page}`)
        
        dispatch(setReview(response.data.data.rows));
        dispatch(setTotalReview(response.data.data.count));
        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
}

export const { setReview, setTotalReview } = reviewSlice.actions;
export default reviewSlice.reducer;