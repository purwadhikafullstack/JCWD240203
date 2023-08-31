import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    facility: []
};

const facilitySlice = createSlice({
    name: 'facility',
    initialState,
    reducers: {
        setFacility: (initialState, action) => {
            initialState.facility = action.payload
        }
    }
})

export const getFacility = () => async(dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/facilities`);
        
        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
};

export const { setFacility } = facilitySlice.actions;
export default facilitySlice.reducer;