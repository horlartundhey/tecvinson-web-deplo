import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Async thunks for authentication actions
export const verifySession = createAsyncThunk(
  '/verifySession',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/verify-session', {
        withCredentials: true,
      });
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


// Update the logout thunk to use the correct API URL
export const logoutUser = createAsyncThunk(
  '/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Make sure this URL matches your backend URL
      await axios.post('http://localhost:5000/api/logout', {}, { 
        withCredentials: true 
      });
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
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
    lastActivity : Date.now(), // Track last activity timestamp instead of timer
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
  },
  extraReducers: (builder) => {
    builder
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
      })
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || 'An error occurred';
          state.isAuthenticated = false;
          state.user = null;
        }
      );
  },
});

export const { setToken, setUser, clearError, updateLastActivity } = authSlice.actions;
export default authSlice.reducer;