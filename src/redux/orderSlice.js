import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// Create a new order
export const createOrder = createAsyncThunk('orders/create', async (orderData) => {
  const res = await api.post('/orders', orderData);
  return res.data;
});

// Fetch all orders for admin
export const fetchOrders = createAsyncThunk('orders/fetchAll', async () => {
  const res = await api.get('/admin/orders');
  return res.data;
});

// Fetch orders for current user
export const fetchUserOrders = createAsyncThunk('orders/fetchUser', async () => {
  const res = await api.get('/orders/myorders');
  return res.data;
});

// Update order status (admin)
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
      // Create Order
      .addCase(createOrder.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createOrder.fulfilled, (state, action) => { state.loading = false; state.orders.push(action.payload); })
      .addCase(createOrder.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      // Fetch all orders
      .addCase(fetchOrders.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchOrders.fulfilled, (state, action) => { state.loading = false; state.orders = action.payload; })
      .addCase(fetchOrders.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      // Fetch user orders
      .addCase(fetchUserOrders.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchUserOrders.fulfilled, (state, action) => { state.loading = false; state.userOrders = action.payload; })
      .addCase(fetchUserOrders.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      // Update order status
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
