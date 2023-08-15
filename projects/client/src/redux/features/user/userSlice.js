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

export const getUser = (data) => async() => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/${data.id}`)

        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
}

export const updateUser = (data) => async(dispatch) => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/users/${data.id}`, {
            newUsername: data.newUsername,
            newEmail: data.newEmail,
            newDesc: data.newDesc,
            gender: data.gender,
            birthDate: data.birthDate,
            newPhoneNumber: data.newPhoneNumber,
            newPFP: data.newPFP,
            newId: data.newId
        }, {
            headers: {
                authorization: `Bearer ${data.token}`,
                "Content-Type": "multipart/form-data"
            }
        })

        setTimeout(() => {
            dispatch(getUser({id: data.id, token: data.token})).then(
                (response) => {
                    const token = JSON.parse(localStorage.getItem('user')).token;
                    response.data.data.token = token;
                    localStorage.setItem('user', JSON.stringify(response.data.data));
                    dispatch(setUser(response.data.data));
                },
                (error) => {
                    return Promise.reject(error);
                }
            )
        }, 200);

        return Promise.resolve(response)
    }
    catch(error) {
        return Promise.reject(error)
    }
};

export const sendEmail = (data) => async() => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/users/verify/${data.id}`, {}, {
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

export const verifyAccount = (data) => async(dispatch) => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/users/accountVerify`, {
            token: data.code
        }, {
            headers: {
                authorization: `Bearer ${data.token}`
            }
        });

        setTimeout(() => {
            dispatch(getUser({id: data.id, token: data.token})).then(
                (response) => {
                    const token = JSON.parse(localStorage.getItem('user')).token;
                    response.data.data.token = token;
                    localStorage.setItem('user', JSON.stringify(response.data.data));
                    dispatch(setUser(response.data.data));
                },
                (error) => {
                    return Promise.reject(error);
                }
            )
        }, 200);

        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
};

export const sendPasswordResetEmail = (data) => async() => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/users/forgotpassword`, {
            username: data.username
        });

        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
}

export const resetPassword = (data) => async() => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/users/resetpassword`, {
            code: data.code,
            username: data.username,
            newPassword: data.newPassword
        });

        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
}

export const onLogout = () => (dispatch) => {
    localStorage.removeItem('user');
    dispatch(setUser({}));;
};

export const keepLogin = () => (dispatch) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'), null, 2);
        dispatch(setUser(user));

        return Promise.resolve();
    }
    catch(error) {
        return Promise.reject(error)
    }
}

export const { setUser } = userSlice.actions;
export default userSlice.reducer;