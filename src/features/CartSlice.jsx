import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existing = state.cartItems.find(item => item.id === action.payload.id);
      if (!existing) {
        state.cartItems.push({ ...action.payload, quantity: 1 });
        state.totalItems += 1;
      }
    },
    removeItem: (state, action) => {
      const id = action.payload;
      const index = state.cartItems.findIndex(item => item.id === id);
      if (index !== -1) {
        state.cartItems.splice(index, 1);
        state.totalItems -= 1;
      }
    },
    updateQuantity: (state, action) => {
      const { id, amount } = action.payload;
      const item = state.cartItems.find(item => item.id === id);
      if (item) {
        item.quantity += amount;
      }
    }
  }
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
