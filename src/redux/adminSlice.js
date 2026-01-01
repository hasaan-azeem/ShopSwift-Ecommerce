import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const adminLogin = createAsyncThunk('admin/login', async ({ email, password }) => {
  const res = await api.post('/admin/login', { email, password });
  localStorage.setItem('adminToken', res.data.token);
  return {
    id: res.data.id,
    name: res.data.name,
    email: res.data.email
  };
});

const adminSlice = createSlice({
  name: 'admin',
  initialState: { admin: null, loading: false, error: null },
  reducers: { logoutAdmin: state => { state.admin = null; localStorage.removeItem('adminToken'); } },
  extraReducers: builder => {
    builder
      .addCase(adminLogin.pending, state => { state.loading = true; state.error = null; })
      .addCase(adminLogin.fulfilled, (state, action) => { state.loading = false; state.admin = action.payload; })
      .addCase(adminLogin.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });
  }
});

export const { logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
