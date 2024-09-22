import { createSlice, configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// Initial state for sidebar and theme
const initialSidebarState = {
  sidebarShow: true,
  theme: 'light',
};

// Create a slice for sidebar and theme
const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: initialSidebarState,
  reducers: {
    setSidebar: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

// Export sidebar actions
export const { setSidebar } = sidebarSlice.actions;

// Combine the reducers
const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;