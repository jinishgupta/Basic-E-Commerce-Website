import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "../../hooks/use-toast";

const initialState = {
    products: [],   
    isLoading: false,
}

export const AddProduct = createAsyncThunk(
    "/products/add-new-product",
    async (formData) => {
        const response = await axios.post(
            "http://localhost:5000/api/admin/products/add",
            formData,
            {
                withCredentials: true,
                headers: { 
                    "Content-Type": "application/json",
                }
            }
        );
        if (response.data?.success) {
            toast({ title: "Product added successfully", variant: "success" });
        } else {
            toast({ title: "Failed to add product", variant: "destructive" });
        }
        return response.data;
    }
);

export const GetAllProducts = createAsyncThunk(
    "/products/get-all-products",
    async () => {
        const response = await axios.get(
            "http://localhost:5000/api/admin/products/getAll",
        );
        return response.data;
    }
);

export const DeleteProduct = createAsyncThunk(
    "/products/delete-product",
    async (id) => {
        const response = await axios.delete(
            `http://localhost:5000/api/admin/products/delete/${id}`,
        );
        if (response.data?.success) {
            toast({ title: "Product deleted successfully", variant: "success" });
        } else {
            toast({ title: "Failed to delete product", variant: "destructive" });
        }
        return response.data;
    }
);

export const EditProduct = createAsyncThunk(
    "/products/edit-product",
    async ({ id, formData }) => {
        const response = await axios.put(
            `http://localhost:5000/api/admin/products/edit/${id}`,
            formData,
            {
                headers: { 
                    "Content-Type": "application/json",
                }
            }
        );
        if (response.data?.success) {
            toast({ title: "Product updated successfully", variant: "success" });
        } else {
            toast({ title: "Failed to update product", variant: "destructive" });
        }
        return response.data;
    }       
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.data;
      })
      .addCase(GetAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.products = [];
      });
  },
});

export default AdminProductsSlice.reducer;