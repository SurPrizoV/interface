import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNomenclature = createAsyncThunk(
    "nomenclature/fetchNomenclature", 
    async function (_, {rejectWithValue}) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/nomenclatures/`, {
                method: "GET",
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
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

const nomenclatureSlice = createSlice({
    name: "nomenclature",
    initialState: {
        nomenclature: [],
        status: null,
        error: null,
    },
    reducers: {
        nomenclatureList(state, action) {
            state.nomenclature = action.payload.data;
        },
    },
    extraReducers: {
        [fetchNomenclature.pending]: (state) => {
            state.status = "loading";
            state.error = null;
        },
        [fetchNomenclature.fulfilled]: (state, action) => {
            state.status = "resolved";
            state.nomenclature = action.payload.results;
        },
        [fetchNomenclature.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },
    }
});

export const { nomenclatureList } = nomenclatureSlice.actions;
export default nomenclatureSlice.reducer;