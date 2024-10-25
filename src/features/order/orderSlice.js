import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addOrder, fetchAllOrders, fetchOrdersByUser, updateOrder } from './orderAPI';
import { updateProduct } from '../product/productApi';

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


export const fetchOrdersByUserAsync = createAsyncThunk('/fetch/ordersByUser', async () => {
  const response = await fetchOrdersByUser();
  return response.data;
})


export const fetchAllOrdersAsync = createAsyncThunk('counter/fetchAllOrders', async ({ sort, pagination }) => {
  const response = await fetchAllOrders(sort, pagination);
  return response.data;
}
);


export const updateOrderAsync = createAsyncThunk('counter/updateOrder',async (order) => {
    const response = await updateOrder(order);
    console.log(response)
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
      .addCase(addOrderAsync.fulfilled, (state, action) => (
        {
          ...state,
          status: 'idle',
          currentOrder: action.payload.order,
          orders: [...state.orders, action.payload.order],
          totalOrders: state.orders.length + 1,
        }))
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload.data;
        state.totalOrders = action.payload.docs;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log("action's payload is", action.payload);
        console.log('action.payload.id', action.payload.data.id);
        const index = state.orders.findIndex((order) => order.id.toString() === action?.payload?.data?.id.toString())
        console.log('index is this', index);
        if (index !== -1) {
          state.orders[index] = action.payload.data;
        }
      })
      .addCase(fetchOrdersByUserAsync.pending, (state) => {
        state.status = 'fetching orders';
      })
      .addCase(fetchOrdersByUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload.data;
        state.totalOrders = action.payload.docs;
      })
  },
});



export const selectOrders = (state) => state.orders.orders;
export const selectTotalOrders = (state) => state.orders.totalOrders;
export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
