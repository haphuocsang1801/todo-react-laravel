import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { headerAuth } from "../api/todoEnponit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: undefined,
  },
  reducers: {
    getUserInfo: (state, action) => {
      if (localStorage.getItem("user"))
        state.data = JSON.parse(localStorage.getItem("user"));
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
        state.data = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.data = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.data = undefined;
        localStorage.setItem("user", "");
      });
  },
});

export const login = createAsyncThunk("auth/login", async (values) => {
  const res = await fetch("http://127.0.0.1:8000/api/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "appl7ication/json",
    },
    body: JSON.stringify(values),
  });
  if (res.status === 401) throw new Error("Email or password incorrect");
  const result = await res.json();
  return result;
});
export const register = createAsyncThunk("auth/register", async (values) => {
  const res = await fetch("http://127.0.0.1:8000/api/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  const result = await res.json();
  if (result.token) return result;
  return isRejectedWithValue(result);
});
export const logout = createAsyncThunk("auth/logout", async () => {
  const res = await fetch("http://127.0.0.1:8000/api/logout", {
    method: "POST",
    headers: headerAuth(),
  });
  if (res.ok) {
    return isFulfilled("");
  }
  return isRejectedWithValue("");
});
