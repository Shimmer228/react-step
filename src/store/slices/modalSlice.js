// src/store/slices/modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCartModalOpen: false,
  confirmationMessage: '',
  product: null,
  actionType: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      state.isCartModalOpen = action.payload.isOpen;
      state.product = action.payload.product || null;
      state.actionType = action.payload.actionType || null;
    },
    setConfirmationMessage: (state, action) => {
      state.confirmationMessage = action.payload;
    },
    clearConfirmationMessage: (state) => {
      state.confirmationMessage = '';
      state.product = null;
      state.actionType = null;
      state.isCartModalOpen = false;
    },
  },
});

export const {
  setModalOpen,
  setConfirmationMessage,
  clearConfirmationMessage,
} = modalSlice.actions;


export default modalSlice.reducer;
