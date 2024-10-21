
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const productId = action.payload;
      if (state.includes(productId)) {
        return state.filter(id => id !== productId);
      } else {
        return [...state, productId];
      }
    },
    setFavorites: (state, action) => {
      return action.payload;
    },
  },
});

export const { toggleFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
