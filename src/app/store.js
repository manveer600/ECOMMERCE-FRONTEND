import { configureStore } from '@reduxjs/toolkit';
import { productSlice } from '../features/product/productSlice.js';
import {authSlice} from '../features/auth/authSlice.js';
import { cartSlice } from '../features/cart/CartSlice.js';
import {orderSlice} from '../features/order/orderSlice.js';
import { userSlice } from '../features/user/userSlice.js';

export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    auth:authSlice.reducer,
    cart:cartSlice.reducer,
    orders:orderSlice.reducer,
    // user:userSlice.reducer
  },
});
