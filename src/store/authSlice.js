import { createSlice } from "@reduxjs/toolkit";

const loadStateFromLocalStorage = () => {
  const savedState = localStorage.getItem('authState');
  return savedState ? JSON.parse(savedState) : { isLoggedIn: false, userId: null };
};

const initialState = loadStateFromLocalStorage();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
      localStorage.setItem('authState', JSON.stringify(state)); // Persist to localStorage
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
      localStorage.removeItem('authState'); // Clear from localStorage
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
