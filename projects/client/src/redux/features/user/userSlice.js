import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    currentUser: {}
};

const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        setUser: (initialState, action) => {
            initialState.currentUser = action.payload;
        }
    }
});

export const onRegister = (userData) => async(dispatch) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users`, {
            username: userData.username,
            email: userData.email,
            password: userData.password
        });

        return Promise.resolve(response.data);
    }
    catch(error) {
        return Promise.reject(error);
    }
};

export const onLogin = (loginCredentials) => async(dispatch) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
            username: loginCredentials.username,
            password: loginCredentials.password
        });
        
        dispatch(setUser(response.data.data));
        localStorage.setItem('user' ,JSON.stringify(response.data.data));
        return Promise.resolve(response.data);
    }
    catch(error) {
        return Promise.reject(error);
    }
};

export const onLogout = () => (dispatch) => {
    localStorage.removeItem('user');
    dispatch(setUser({}));;
};

export const keepLogin = () => (dispatch) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'), null, 2)
        dispatch(setUser(user));

        return Promise.resolve();
    }
    catch(error) {
        return Promise.reject(error)
    }
};

export const { setUser } = userSlice.actions;
export default userSlice.reducer;