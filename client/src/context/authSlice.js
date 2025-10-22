import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: JSON.parse(localStorage.getItem('token')) || "",
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeAuth(state, action) {
      const token = localStorage.getItem('token');
      state.token = JSON.parse(token);
    },
    setToken(state, action) {
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      state.token = action.payload.token
    }
  }
});

export const { initializeAuth, setToken } = authSlice.actions;
export default authSlice.reducer;