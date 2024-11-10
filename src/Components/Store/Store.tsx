import { configureStore } from "@reduxjs/toolkit";
import ProductDetaileSlice from "../StoreSlice/SliceProductViewDetails";

export const store = configureStore({
  reducer: {
    ProductViewDetail: ProductDetaileSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
