import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignIn, LogIn } from '../../constants/requestOptions';
import authService from './authServices';
import {
  AsyncThunkConfig,
  GetThunkAPI,
} from '@reduxjs/toolkit/dist/createAsyncThunk';

// Bringing the user session ID from the local storage.
const sessionID = localStorage.getItem('userToken');
const userToken: string | null = sessionID ? JSON.parse(sessionID) : null;

const handleError = function (error: any) {
  const err =
    (error?.response && error?.response.data && error?.response.data.message) ||
    error.message ||
    error.toString();
  return err;
};

// Initial state setup.
const initialState = {
  user: userToken,
  message: '',
  isError: false,
  isSuccess: false,
  isLoading: false,
};

// Register user async function.
export const register: any = createAsyncThunk(
  '/auth/register',
  async function (user: SignIn, thunkAPI: GetThunkAPI<AsyncThunkConfig>) {
    try {
      return await authService.register(user);
    } catch (error: any) {
      const message = handleError(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get the user data.
export const me: any = createAsyncThunk(
  'auth/me',
  async function (
    token: string | null,
    thunkAPI: GetThunkAPI<AsyncThunkConfig>
  ) {
    try {
      return await authService.me(token);
    } catch (error: any) {
      const message = handleError(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logs in the user.
export const login: any = createAsyncThunk(
  'auth/login',
  async function (user: LogIn, thunkAPI: GetThunkAPI<AsyncThunkConfig>) {
    try {
      return await authService.login(user);
    } catch(error) {
      const message = handleError(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logs out the user.
export const logout: any = createAsyncThunk('auth/logout', async function (token: string | null, thunkAPI) {
  try {
    console.log(token);
    const res = await authService.logout(token);
    console.log(res);
    return res
  } catch (error) {
    const message = handleError(error);
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: function (state) {
      state.message = '';
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
    },
  },

  extraReducers: function (builder) {
    // addCase methods are very useful, because it let us control things in certain stages of asynchronous operation or server response.
    builder
      .addCase(register.pending, function (state) {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, function (state, action) {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, function (state, action: PayloadAction<string>) {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, function (state) {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, function (state, action) {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, function (state, action: PayloadAction<string>) {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(me.pending, function (state) {
        state.isLoading = true;
      })
      .addCase(me.fulfilled, function (state, action) {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(me.rejected, function (state, action: PayloadAction<string>) {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.pending, function (state) {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, function (state) {
        state.isLoading = false;
        state.isSuccess = true;
        // Set the user state back to null just like it was initially was.
        state.user = null;
      })
      .addCase(logout.rejected, function (state, action: PayloadAction<string>) {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
