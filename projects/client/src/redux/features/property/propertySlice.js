import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    property: [],
    totalProperty: 0,
    location: '',
    guest: '1',
    start: '',
    sort: 'Price',
    type: 'All',
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
        setSort: (initialState, action) => {
            initialState.sort = action.payload;
        },
        setType: (initialState, action) => {
            initialState.type = action.payload;
        },
        setEnd: (initialState, action) => {
            initialState.end = action.payload;
        }
    }
})

export const getProperty = (data) => async(dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/properties?location=${data.location?.split('/')[1] || ''}&&start=${data.start || ''}&&end=${data.end || ''}&&page=${data.page || null}&&limit=${data.limit || null}&&sort=${data.sort || 'Price'}&&type=${data.type || 'All'}`);

        dispatch(setProperty(response.data.data.rows));
        dispatch(setTotalProperty(response.data.data.count));
        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
};

export const getDetailed = (data) => async(dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/properties/${data.id}`);
        
        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
};

export const getPropertyDetail = (data) => async() => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/properties/${data.userId}/${data.propertyId}`, {
            headers: {
                authorization: `Bearer ${data.token}`
            }
        });
        
        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
};

export const createProperty = (data) => async(dispatch) => {
    try {
        let formData = new FormData();
        const keys = Object.keys(data);
        for(let i of keys) {
            if(i === 'propertyRooms' || i === 'facilities') {
                formData.append(i, JSON.stringify(data[i]));
            }
            else {
                formData.append(i, data[i]);
            }
        };

        data?.images?.forEach(img => {
            formData.append("images", img);
        })
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/properties`, 
            formData
        , {
            headers: {
                authorization: `Bearer ${data.token || null}`,
                "Content-Type": "multipart/form-data",
            }
        });
        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
};

export const deleteProperty = (data) => async() => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/properties/delete/${data.userId}/${data.propertyId}`, {idCard: data.idCard}, {
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

export const updateProperty = (data) => async() => {
    try {
        let formData = new FormData();
        const keys = Object.keys(data);
        for(let i of keys) {
            if(i === 'propertyRooms' || i === 'facilities') {
                formData.append(i, JSON.stringify(data[i]));
            }
            else {
                formData.append(i, data[i]);
            }
        };

        data?.images?.forEach(img => {
            formData.append("images", img);
        });

        const response = axios.patch(`${process.env.REACT_APP_API_BASE_URL}/properties/${data.id}`, 
            formData
        , {
            headers: {
                authorization: `Bearer ${data.token}`
            }
        })
        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
};

export const createPrice = (data) => async() => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/prices`, {
            userId: data.userId,
            idCard: data.idCard,
            type: data.type,
            percentage: data.percentage,
            roomId: data.roomId,
            start: data.start,
            end: data.end
        }, {
            headers: {
                authorization: `Bearer ${data.token}`
            }
        });

        return Promise.resolve(response);
    }
    catch(error) {
        return Promise.reject(error);
    }
};

export const { setProperty, setTotalProperty, setLocation, setGuest, setStart, setSort, setType, setEnd } = propertySlice.actions;
export default propertySlice.reducer;
