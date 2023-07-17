import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async function (id, {rejectWithValue}) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/workorders/${id}/products/`, {
                method: "GET",
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
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
)

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        status: null,
        error: null,
    },
    reducers: {
        productList(state, action) {
            state.products = action.payload.data;
        },
    },
    extraReducers: {
        [fetchProducts.pending]: (state) => {
            state.status = "loading";
            state.error = null;
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.status = "resolved";
            state.products = action.payload;
        },
        [fetchProducts.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },
    },
});

export const { productList } = productSlice.actions;
export default productSlice.reducer;