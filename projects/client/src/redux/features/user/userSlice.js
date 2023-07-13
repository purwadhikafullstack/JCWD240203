import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../../constants/URLAPI";

const initialState = {
    currentUser: {}
};

const userSlice = createSlice({
    initialState,
    name: 'userSlice',
    reducers: {
        setUser: (initialState, action) => {
            initialState.currentUser = action.payload;
        }
    }
});

export const onRegister = (userData) => async(dispatch) => {
    try {
        const response = await axios.post(`${API}/users`, {
            name: userData.name,
            email: userData.email,
            password: userData.password
        });

        return Promise.resolve(response.data);
    }
    catch(error) {
        return Promise.reject(error);
    }
}

export const { setUser } = userSlice.actions;
export default userSlice.reducer;