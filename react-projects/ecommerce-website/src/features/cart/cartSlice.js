import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

/**
 * Shopping Cart Redux Slice
 * Manages item additions, quantity adjustments, and item removals.
 */
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Adds a new product to the cart or increments quantity if already present
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }
    },

    // Removes an item completely from the cart by product ID
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
    },

    // Decrements item quantity by 1, or removes the item if quantity reaches 0
    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item.id === productId);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== productId);
      }
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
