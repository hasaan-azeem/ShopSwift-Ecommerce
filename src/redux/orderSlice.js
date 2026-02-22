import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const createOrder = createAsyncThunk('orders/create', async (orderData) => {
  const res = await api.post('/orders', orderData);
  return res.data;
});

export const fetchOrders = createAsyncThunk('orders/fetchAll', async () => {
  const res = await api.get('/admin/orders');
  return res.data;
});

// FIX: was /orders/myorders → corrected to /orders/my
export const fetchUserOrders = createAsyncThunk('orders/fetchUser', async () => {
  const res = await api.get('/orders/my');
  return res.data;
});

export const updateOrderStatus = createAsyncThunk('orders/updateStatus', async ({ id, status }) => {
  const res = await api.put(`/admin/orders/${id}`, { status });
  return res.data;
});

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    userOrders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createOrder.fulfilled, (state, action) => { state.loading = false; state.orders.push(action.payload); })
      .addCase(createOrder.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      .addCase(fetchOrders.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchOrders.fulfilled, (state, action) => { state.loading = false; state.orders = action.payload; })
      .addCase(fetchOrders.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      .addCase(fetchUserOrders.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchUserOrders.fulfilled, (state, action) => { state.loading = false; state.userOrders = action.payload; })
      .addCase(fetchUserOrders.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      .addCase(updateOrderStatus.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(o => o._id === action.payload._id);
        if (index !== -1) state.orders[index] = action.payload;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });
  },
});

export default orderSlice.reducer;