import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }) => {
  const res = await api.post('/auth/login', { email, password });
  localStorage.setItem('token', res.data.token);
  return res.data.user;
});

export const registerUser = createAsyncThunk('auth/registerUser', async ({ name, email, password }) => {
  const res = await api.post('/auth/register', { name, email, password });
  localStorage.setItem('token', res.data.token);
  return res.data.user;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: false, error: null },
  reducers: { logout: state => { state.user = null; localStorage.removeItem('token'); } },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      .addCase(registerUser.pending, state => { state.loading = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
