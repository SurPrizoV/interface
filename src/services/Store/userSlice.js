import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const Authorization = createAsyncThunk(
  "user/authorization",
  async function (data, { rejectWithValue }) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/api-token-auth/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.non_field_errors);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    status: null,
    error: null,
  },
  reducers: {
    handleLogin(state, action) {
      state.data.username = action.payload.login;
    },
    handlePassword(state, action) {
      state.data.password = action.payload.password;
    },
  },
  extraReducers: {
    [Authorization.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [Authorization.fulfilled]: (state, action) => {
      state.status = "resolved";
      localStorage.setItem("token", action.payload.token);
    },
    [Authorization.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const { handleLogin, handlePassword } = userSlice.actions;
export default userSlice.reducer;
