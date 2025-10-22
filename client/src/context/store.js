import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './contactSlice';
import authSlice from './authSlice';

const store = configureStore({
  reducer: {
    contacts: contactReducer,
    auth: authSlice
  }
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('contacts', JSON.stringify(state.contacts.contacts));
});

export default store;