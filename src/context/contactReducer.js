import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  contacts: JSON.parse(localStorage.getItem('contacts')) || []
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, action) {
      const newContact = { id: uuidv4(), ...action.payload };
      state.contacts.push(newContact);
    },
    removeContact(state, action) {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
    },
    editContact(state, action) {
      const { id, updatedData } = action.payload;
      const index = state.contacts.findIndex(contact => contact.id === id);
      if (index !== -1) {
        state.contacts[index] = { ...state.contacts[index], ...updatedData };
      }
    }
  }
});

export const { addContact, removeContact, editContact } = contactSlice.actions;
export default contactSlice.reducer;