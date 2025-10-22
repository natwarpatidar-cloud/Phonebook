import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './contactSlice';

const store = configureStore({
  reducer: {
    contacts: contactReducer
  }
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('contacts', JSON.stringify(state.contacts.contacts));
});

export default store;