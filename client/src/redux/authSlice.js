// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Async thunks
export const verifySession = createAsyncThunk(
  'auth/verifySession',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/verify-session');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Session verification failed' });
    }
  }
);

export const initiateLogin = createAsyncThunk(
  'auth/initiateLogin',
  async ({ email, uniqueCode }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/initiate', { email, uniqueCode });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Login initiation failed' });
    }
  }
);

export const verifyLoginToken = createAsyncThunk(
  'auth/verifyLoginToken',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/verify/${token}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Token verification failed' });
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('/api/logout');
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Logout failed' });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
    loginMessage: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearLoginMessage: (state) => {
      state.loginMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Verify Session
      .addCase(verifySession.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifySession.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(verifySession.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Login Initiation
      .addCase(initiateLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(initiateLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.loginMessage = action.payload.message;
      })
      .addCase(initiateLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Verify Login Token
      .addCase(verifyLoginToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyLoginToken.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(verifyLoginToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
        state.isAuthenticated = false; 
        state.user = null; 
      })

      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  }
});

export const { clearError, clearLoginMessage } = authSlice.actions;
export default authSlice.reducer;