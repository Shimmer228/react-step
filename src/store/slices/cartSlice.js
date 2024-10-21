
import { createSlice } from '@reduxjs/toolkit';
import { setConfirmationMessage, setModalOpen, clearConfirmationMessage } from './modalSlice';

const initialState = {
  items: JSON.parse(localStorage.getItem('cart')) || {},
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log("adding")
      const productId = action.payload;
      console.log(productId)
      if (state[productId]) {
        state[productId] += 1;
      } else {
        state[productId] = 1;
      }
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      delete state[productId];
    },
    setCart: (state, action) => {
      return action.payload;
    },
    
  },

});

export const { addToCart, removeFromCart, setCart } = cartSlice.actions;

export const confirmAddToCart = (product) => (dispatch) => {
  console.log("+")
  dispatch(setConfirmationMessage(`Ви дійсно хочете додати "${product.name}" до кошика?`));
  dispatch(setModalOpen({
    isOpen: true,
    product,  
    actionType: 'add'
  }));
};

export const proceedAddToCart = (product) => (dispatch) => {
  dispatch(addToCart(product));
  dispatch(setModalOpen({ isOpen: false }));  // закриваємо модалку
};
export const confirmDeleteFromCart = (product) => (dispatch) => {
  console.log("-")
  dispatch(setConfirmationMessage(`Ви дійсно хочете видалити "${product.name}" з кошика?`));
  dispatch(setModalOpen({
    isOpen: true,
    product,
    actionType: 'delete',
  }));
};

export const proceedDeleteFromCart = (product) => (dispatch) => {
  console.log(product);
  dispatch(removeFromCart(product));
  dispatch(clearConfirmationMessage());
};


export default cartSlice.reducer;
