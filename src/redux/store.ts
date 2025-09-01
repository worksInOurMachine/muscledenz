import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart-slice";
import activeLinkSlice from "./slices/active-link-slice";
export const store = configureStore({
  reducer: {
    cart: cartSlice,
    activeLink: activeLinkSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
