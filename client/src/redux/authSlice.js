import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Existing async thunks
export const verifySession = createAsyncThunk(
  '/verifySession',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://tecvinson-web-server.vercel.app/api/verify-session',
        // 'http://localhost:5000/api/verify-session',
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  '/login',
  async ({ email, uniqueCode }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        '/api/initiate',
        { email, uniqueCode },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyLoginToken = createAsyncThunk(
  '/verifyLogin',
  async (token, { rejectWithValue }) => {
    try {
      console.log('Token being verified:', token);
      const response = await axios.get(`/api/verify/${token}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  '/logout',
  async () => {
    try {
      await axios.post('https://tecvinson-web-server.vercel.app/api/logout', {}, { 
      // await axios.post('http://localhost:5000/api/logout', {}, { 
        withCredentials: true 
      });
    } catch (_) {
      // Ignore server errors — always clear local auth
    }
    return null;
  }
);

// New OTP-related thunks
export const sendOTP = createAsyncThunk(
  '/sendOTP',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://tecvinson-web-server.vercel.app/api/send-otp',
        // 'http://localhost:5000/api/send-otp',
        { email },
        { withCredentials: true }
      );
      return { ...response.data, email };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to send OTP' });
    }
  }
);

export const verifyOTP = createAsyncThunk(
  '/verifyOTP',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://tecvinson-web-server.vercel.app/api/verify-otp',
        // 'http://localhost:5000/api/verify-otp',
        { email, otp },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Invalid OTP' });
    }
  }
);

export const loginWithPassword = createAsyncThunk(
  '/loginWithPassword',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://tecvinson-web-server.vercel.app/api/login-password',
        // 'http://localhost:5000/api/login-password',
        { email, password },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Invalid email or password' });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null,
    otpSent: false,
    otpEmail: null,
    lastActivity: Date.now(),
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateLastActivity: (state) => {
      state.lastActivity = Date.now();
    },
    resetOtpState: (state) => {
      state.otpSent = false;
      state.otpEmail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Existing reducers
      .addCase(verifySession.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user || null;
        state.loading = false;
        state.lastActivity = Date.now();
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user || null;
        state.token = action.payload.token || null;
        state.lastActivity = Date.now();
      })
      .addCase(verifyLoginToken.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user || null;
        state.loading = false;
        state.lastActivity = Date.now();
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.lastActivity = null;
        state.otpSent = false;
        state.otpEmail = null;
      })
      
      // New OTP-related reducers
      .addCase(sendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true;
        state.otpEmail = action.payload.email;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to send OTP';
        state.otpSent = false;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user || null;
        state.otpSent = false;
        state.otpEmail = null;
        state.lastActivity = Date.now();
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Invalid OTP';
      })

      // Password login reducers
      .addCase(loginWithPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user || null;
        state.lastActivity = Date.now();
      })
      .addCase(loginWithPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Invalid email or password';
      })
      
      // Generic error handler
      .addMatcher(
        (action) => action.type.endsWith('/rejected') && !action.type.includes('sendOTP') && !action.type.includes('verifyOTP'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || 'An error occurred';
          if (!action.type.includes('sendOTP')) {
            state.isAuthenticated = false;
            state.user = null;
          }
        }
      );
  },
});

export const { setToken, setUser, clearError, updateLastActivity, resetOtpState } = authSlice.actions;
export default authSlice.reducer;