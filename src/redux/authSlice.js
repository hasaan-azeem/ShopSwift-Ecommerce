import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    return res.data.user;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Login failed");
  }
});

export const registerUser = createAsyncThunk('auth/registerUser', async ({ name, email, password }, { rejectWithValue }) => {
  try {
    const res = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('token', res.data.token);
    return res.data.user;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Registration failed");
  }
});

export const fetchProfile = createAsyncThunk('auth/fetchProfile', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/auth/profile');
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch profile");
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    profileLoading: false,  // FIX: separate flag for profile fetch
    error: null,
  },
  reducers: {
    logout: state => {
      state.user = null;
      state.error = null;
      localStorage.removeItem('token');
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      // Login
      .addCase(loginUser.pending,    state => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled,  (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(loginUser.rejected,   (state, action) => { state.loading = false; state.error = action.payload; })
      // Register
      .addCase(registerUser.pending,   state => { state.loading = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(registerUser.rejected,  (state, action) => { state.loading = false; state.error = action.payload; })
      // FetchProfile — use profileLoading, not loading, to avoid freezing Profile page
      .addCase(fetchProfile.pending,   state => { state.profileLoading = true; state.error = null; })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.user = action.payload;
      })
      // FIX BUG 4: on failure, clear token and user so app doesn't
      // stay in a broken authenticated state
      .addCase(fetchProfile.rejected,  (state, action) => {
        state.profileLoading = false;
        state.error = action.payload;
        // If profile fetch fails, token is probably expired — clear it
        state.user = null;
        localStorage.removeItem('token');
      });
  }
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;