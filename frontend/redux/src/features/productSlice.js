import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const response = await axios.get("http://localhost:3000/api/products", {
    withCredentials: true,
  });
  return response.data;
});

export const createProduct = createAsyncThunk(
  "products/create",
  async (productData) => {
    const response = await axios.post(
      "http://localhost:3000/api/products",
      productData,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, productData }) => {
    const response = await axios.put(
      `http://localhost:3000/api/products/${id}`,
      productData,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  await axios.delete(`http://localhost:3000/api/products/${id}`, {
    withCredentials: true,
  });
  return id;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (product) => product.id !== action.payload
        );
      });
  },
});

export default productSlice.reducer;
