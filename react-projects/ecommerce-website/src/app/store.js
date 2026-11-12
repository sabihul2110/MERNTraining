import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";

/**
 * Central Redux Store Configuration
 * Registers the shopping cart slice reducer under the `cart` state key.
 */
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
