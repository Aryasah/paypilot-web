import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: true,
    userId: 'aryasah47',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.userId = action.payload.userId;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userId = null;
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
