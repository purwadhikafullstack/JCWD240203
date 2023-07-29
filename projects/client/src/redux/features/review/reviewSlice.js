import { createSlice } from "@reduxjs/toolkit";
import { getDetailed } from "../property/propertySlice";
import axios from "axios";

const initialState = {
    review: []
};

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        setReview: (initialState, action) => {
            initialState.review = action.payload;
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

export const { setReview } = reviewSlice.actions;
export default reviewSlice.reducer;