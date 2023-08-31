import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    country: []
};

const countrySlice = createSlice({
    name: 'country',
    initialState,
    reducers: {
        setCountry: (initialState, action) => {
            initialState.country = action.payload
        }
    }
});

export const getCountry = () => async(dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/countries`);

        dispatch(setCountry(response.data.data));
        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
}

export const { setCountry } = countrySlice.actions;
export default countrySlice.reducer;