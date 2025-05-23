import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import searchReducer from './features/searchSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
  },
});

export default store; 