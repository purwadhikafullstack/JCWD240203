import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../../constants/URLAPI";

const initialState = {
    property: [],
    totalProperty: 0,
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
        setTotalProperty: (initialState, action) => {
            initialState.totalProperty = action.payload;
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

export const getProperty = (data) => async(dispatch) => {
    try {
        const response = await axios.get(`${API}/properties?location=${initialState.location}&&start=${initialState.start}&&end=${initialState.end}&&page=${data.page || null}&&limit=${data.limit || null}`);

        dispatch(setProperty(response.data.data.rows));
        dispatch(setTotalProperty(response.data.data.count));
        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
}

export const { setProperty, setTotalProperty, setLocation, setStart, setEnd } = propertySlice.actions;
export default propertySlice.reducer;