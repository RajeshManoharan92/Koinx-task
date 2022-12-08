import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&amp;order=market_cap_desc&amp;per_page=100&amp;page=1&amp;sparkline=false&amp;price_change_percentage=24h%2C7d";

// Read

export const fetchTodos = createAsyncThunk("todos/fetchAllTodos", async () => {
    try {
        const response = await axios.get(URL);
        if (response.data.length > 0) {
            return response.data;
        } else {
            return [];
        }
    } catch (error) {
        return error.message;
    }
})

// User Slice and Reducers

export const userSlice = createSlice({
    name: "user",

    initialState: {
        product: [],
        status:""
    },

    reducers: {
        product: (state, action) => {
            state.product = action.payload
        },
    },
    extraReducers(builders) {

        // Read

        builders.addCase(fetchTodos.pending, (state, action) => {
            state.status = "loading";
        });
        builders.addCase(fetchTodos.fulfilled, (state, action) => {
            state.status = "success";
            state.product = state.product.concat(action.payload);

        });
        builders.addCase(fetchTodos.rejected, (state, action) => {
            state.status = "failed";
            console.log(action.error);
        });

    }

})

export const { product } = userSlice.actions;
export const selectedProduct = (state) => state.user.product;
export default userSlice.reducer;