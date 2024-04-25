import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addOrder, fetchAllOrders, fetchOrdersByUser, updateOrder } from './orderAPI';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrder: null,
  totalOrders: 0
};


export const addOrderAsync = createAsyncThunk(
  'counter/addOrder',
  async (order) => {
    const response = await addOrder(order);
    return response.data;
  }
);


export const fetchOrdersByUserAsync = createAsyncThunk('/fetch/ordersByUser', async() => {
    const response = await fetchOrdersByUser();
    return response.data;
})


export const fetchAllOrdersAsync = createAsyncThunk('counter/fetchAllOrders', async ({sort, pagination }) => {
  const response = await fetchAllOrders(sort,pagination);
  return response.data;
}
);


export const updateOrderAsync = createAsyncThunk(
  'counter/updateOrder',
  async (order) => {
    const response = await updateOrder(order);
    return response.data;
  }
);


export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.currentOrder = action.payload.order;
        state.orders.push(action.payload.order);
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.orders.findIndex((order) => order.id === action.payload.id)
        state.orders[index] = action.payload;
      })
      .addCase(fetchOrdersByUserAsync.pending, (state) => {
        state.status = 'fetching orders';
      })
      .addCase(fetchOrdersByUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload.orders;
      })
  },
});



export const selectOrders = (state) => state.orders.orders;
export const selectTotalOrders = (state) => state.orders.totalOrders;
export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
