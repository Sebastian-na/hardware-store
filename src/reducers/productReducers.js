import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProducts = createAsyncThunk(
  'PRODUCT_LIST/fetchProducts',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/products')
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const productListReducer = createSlice({
  name: 'PRODUCT_LIST',
  initialState: {
    products: [],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.loading = true
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.loading = false
      state.products = action.payload
    },
    [fetchProducts.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload || 'Something went wrong'
    },
  },
})

export default productListReducer.reducer
