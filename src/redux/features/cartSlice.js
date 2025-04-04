import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }
      
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
    },
    
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
    },
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        item.quantity = quantity;
        item.totalPrice = item.price * quantity;
        state.totalAmount = state.items.reduce(
          (total, item) => total + item.totalPrice,
          0
        );
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

// Action creators
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;
export const selectCartItemCount = (state) => state.cart.items.length;

export default cartSlice.reducer; 