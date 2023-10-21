import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn: false,
    user: null,
    token: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.loggedIn = true;
        },
        logOut: (state, action) => {
            state.user = null;
            state.token = null;
            state.loggedIn = false;
        }
    }
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurUser = (state) => state.auth.user;