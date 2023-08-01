import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    category: []
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategories: (initialState, action) => {
            initialState.category = action.payload;
        }
    }
});

export const getCategories = () => async(dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/categories`);

        dispatch(setCategories(response.data.data));
        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
}

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;