import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../api/auth.service";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await authService.login(credentials);
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await authService.register(payload);
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message || "Registration failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      return null;
    } catch (error) {
      return rejectWithValue(error.message || "Logout failed");
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const data = await authService.getMe();
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message || "Not authenticated");
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  initializing: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const setPending = (state) => {
      state.loading = true;
      state.error = null;
    };

    const setRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };

    builder
      .addCase(loginUser.pending, setPending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.initializing = false;
      })
      .addCase(loginUser.rejected, setRejected)

      .addCase(registerUser.pending, setPending)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.initializing = false;
      })
      .addCase(registerUser.rejected, setRejected)

      .addCase(logoutUser.pending, setPending)
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, setRejected)

      .addCase(fetchCurrentUser.pending, (state) => {
        state.initializing = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.initializing = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.initializing = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
