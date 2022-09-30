import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProductDetail = createAsyncThunk(
  'PRODUCT_DETAIL/fetchProductDetail',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/products/${id}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const productDetailReducer = createSlice({
  name: 'PRODUCT_DETAIL',
  initialState: {
    product: {},
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [fetchProductDetail.pending]: (state) => {
      state.loading = true
    },
    [fetchProductDetail.fulfilled]: (state, action) => {
      state.loading = false
      state.product = action.payload
    },
    [fetchProductDetail.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message || 'Something went wrong'
    },
  },
})

export default productDetailReducer.reducer
