
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import modalReducer from './slices/modalSlice';
import cartReducer from './slices/cartSlice';
import favoritesReducer from './slices/favoriteSlice';

const loadState = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error(`Error loading state from localStorage key "${key}":`, err);
    return undefined;
  }
};

const preloadedState = {
  cart: loadState('cart') || {},
  favorites: loadState('favorites') || [],
};

const store = configureStore({
  reducer: {
    products: productsReducer,
    modal: modalReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
  },
  preloadedState,
});

// Save state to localStorage
store.subscribe(() => {
  const state = store.getState();
  try {
    localStorage.setItem('cart', JSON.stringify(state.cart));
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
});

export default store;
