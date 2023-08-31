import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    rooms: []
}

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setRooms: (initialState, action) => {
            initialState.rooms = action.payload;
        }
    }
})

export const getPropertyRoom = (data) => async(dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/rooms?propertyId=${data.propertyId}&&start=${data.start}&&end=${data.end}`);
        
        dispatch(setRooms(response.data.data));
        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
};

export const { setRooms } = roomSlice.actions;
export default roomSlice.reducer;