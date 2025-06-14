 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products: [],   
    isLoading: false,
}

export const getAllProducts = createAsyncThunk(
    "/products/get-all-products",
      async ({ filterParams, sortParams }) => {

    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const response = await axios.get(
      `http://localhost:5000/api/shopping/products/getAll?${query}`
    );

      return response.data;
    }
);

export const getProductDetails = createAsyncThunk(
    "/products/get-product-details",
      async (id) => {

    const response = await axios.get(
      `http://localhost:5000/api/shopping/products/get/${id}`
    );

      return response.data;
    }
);

const UserProductsSlice = createSlice({
  name: "userProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.data;
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.products = [];
      })
      .addCase(getProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(getProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = [];
      });
  },
});

export default UserProductsSlice.reducer;
