import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const adminLogin = createAsyncThunk(
  'admin/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post('/admin/login', { email, password });
      localStorage.setItem('adminToken', res.data.token);
      // FIX: Save adminInfo so TopBar can display the admin's name/email after refresh
      localStorage.setItem('adminInfo', JSON.stringify({
        id:    res.data.id,
        name:  res.data.name,
        email: res.data.email,
      }));
      return {
        id:    res.data.id,
        name:  res.data.name,
        email: res.data.email,
      };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    // FIX: Rehydrate from localStorage on app start so protected routes work after refresh
    admin: localStorage.getItem('adminToken')
      ? JSON.parse(localStorage.getItem('adminInfo') || 'null')
      : null,
    loading: false,
    error: null,
  },
  reducers: {
    logoutAdmin: state => {
      state.admin = null;
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminInfo');
    }
  },
  extraReducers: builder => {
    builder
      .addCase(adminLogin.pending,   state => { state.loading = true; state.error = null; })
      .addCase(adminLogin.fulfilled, (state, action) => { state.loading = false; state.admin = action.payload; })
      .addCase(adminLogin.rejected,  (state, action) => { state.loading = false; state.error = action.payload; });
  }
});

export const { logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;