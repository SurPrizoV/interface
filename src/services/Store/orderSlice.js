import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/workorders/`, {
        method: "GET",
        headers: {
          "Authorization": `Token ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const handleOrderChange = createAsyncThunk(
  "order/handleOrderChange",
  async function (id, { rejectWithValue }) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/workorders/${id}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const handleOrderSave = createAsyncThunk(
  "order/handleOrderSave",
  async function ({ id, number, date, finished, material, product }, { rejectWithValue }) {
    const data = {
      number: number,
      start_date: date,
      is_finished: finished,
      material: material,
      product: product,
    };
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/workorders/${id}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    orderById: [],
    status: null,
    error: null,
  },
  reducers: {
    ordersList(state, action) {
      state.orders = action.payload.data;
    },
  },
  extraReducers: {
    [fetchOrders.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchOrders.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.orders = action.payload;
    },
    [fetchOrders.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [handleOrderChange.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [handleOrderChange.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.orderById = action.payload;
    },
    [handleOrderChange.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [handleOrderSave.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [handleOrderSave.fulfilled]: (state) => {
      state.status = "resolved";
    },
    [handleOrderSave.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const { orderList } = orderSlice.actions;
export default orderSlice.reducer;
