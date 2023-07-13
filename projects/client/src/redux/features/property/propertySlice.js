import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../../constants/URLAPI";

const initialState = {
    property: [],
    location: '',
    start: '',
    end: ''
}

const propertySlice = createSlice({
    name: 'property',
    initialState,
    reducers: {
        setProperty: (initialState, action) => {
            initialState.property = action.payload;
        },
        setLocation: (initialState, action) => {
            initialState.location = action.payload;
        },
        setStart: (initialState, action) => {
            initialState.start = action.payload;
        },
        setEnd: (initialState, action) => {
            initialState.end = action.payload;
        },
    }
})

export const getProperty = () => async(dispatch) => {
    try {
        const response = await axios.get(`${API}/properties?location=${initialState.location}&&start=${initialState.start}&&end=${initialState.end}`);

        dispatch(setProperty(response.data.data));
        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
}

export const { setProperty, setLocation, setStart, setEnd } = propertySlice.actions;
export default propertySlice.reducer;