import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import api from '../axios';
 
// Replace the plain action creator with createAction
export const loginInitiated = createAction('auth/loginInitiated');
 
export const silentRefresh = createAsyncThunk(
  'auth/silentRefresh',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/auth/check-session', {
        withCredentials: true,
        _silentRefresh: true
      });
      return response.data;
    } catch (err) {
      console.log('Silent refresh failed:', err.message);
      return rejectWithValue(err.response?.data || "Session expired");
    }
  }
);
 
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials, {
        withCredentials: true
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Login failed");
    }
  }
);
 
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({email, otp}, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/verify-otp', { email, otp }, {
        withCredentials: true
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "OTP verification failed");
    }
  }
);
 
// Helper function to check for session cookie
const hasSessionCookie = () => {
  return document.cookie.includes("refreshToken");
};
 
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Only attempt to call logout API if we have a session cookie
      if (hasSessionCookie()) {
        await api.post('/auth/logout', {}, {
          withCredentials: true,
          // Add a try-catch flag to prevent infinite loops in interceptors
          _skipAuth: true
        });
      } else {
        console.log('No session cookie found, skipping API logout call');
      }
     
      // Always return success to clear the local state
      return true;
    } catch (err) {
      // Even if server logout fails, we'll still clear local state
      console.log('Logout API error:', err.message);
      return true;
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
    pendingVerification: false, // Add this to track OTP verification status
    verificationEmail: null     // Store email during verification process
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Now using the action created with createAction
      .addCase(loginInitiated, (state, action) => {
        state.pendingVerification = true;
        state.verificationEmail = action.payload.email;
      })
      .addCase(silentRefresh.pending, (state) => {
        state.loading = true;
      })
      .addCase(silentRefresh.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
        state.pendingVerification = false;
      })
      .addCase(silentRefresh.rejected, (state) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.user = null;
        state.pendingVerification = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.loading = false;
        state.error = null;
        state.pendingVerification = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
        state.error = action.payload;
        state.pendingVerification = false;
      })
      // Add case for OTP verification
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.loading = false;
        state.error = null;
        state.pendingVerification = false;
        state.verificationEmail = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Don't reset pendingVerification here to allow retries
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
        state.pendingVerification = false;
        state.verificationEmail = null;
      });
  }
});
 
export default authSlice.reducer;
 