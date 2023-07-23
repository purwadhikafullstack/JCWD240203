import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    property: [],
    totalProperty: 0,
    location: '',
    guest: '1',
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
        setGuest: (initialState, action) => {
            initialState.guest = action.payload;
        },
        setStart: (initialState, action) => {
            initialState.start = action.payload;
        },
        setEnd: (initialState, action) => {
            initialState.end = action.payload;
        }
    }
})

export const getProperty = (data) => async(dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/properties?location=${data.location?.split('/')[1] || ''}&&start=${data.start || ''}&&end=${data.end || ''}&&page=${data.page || null}&&limit=${data.limit || null}`);

        dispatch(setProperty(response.data.data.rows));
        dispatch(setTotalProperty(response.data.data.count));
        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
}

export const getDetailed = (data) => async(dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/properties/${data.id}`);
        
        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
}

export const { setProperty, setTotalProperty, setLocation, setGuest, setStart, setEnd } = propertySlice.actions;
export default propertySlice.reducer;
