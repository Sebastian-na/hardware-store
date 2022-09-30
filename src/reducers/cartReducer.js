import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const addToCart = createAsyncThunk(
  'CART/addToCart',
  async ({ productId, qty }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/products/${productId}`)
      const item = response.data
      return {
        id: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
        countInStock: item.countInStock,
        qty,
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const cartReducer = createSlice({
  name: 'CART',
  initialState: {
    cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
    loading: false,
    error: false,
  },
  reducers: {
    removeFromCart: (state, action) => {
      const cart = state.cart.filter((item) => item.id !== action.payload)
      state.cart = cart
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
  },
  extraReducers: {
    [addToCart.pending]: (state) => {
      state.loading = true
    },
    [addToCart.fulfilled]: (state, action) => {
      state.loading = false
      const item = action.payload
      const existItem = state.cart.find((i) => i.id === item.id)
      if (existItem) {
        state.cart = state.cart.map((i) => (i.id === existItem.id ? item : i))
      } else {
        state.cart.push(item)
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    [addToCart.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message || 'Something went wrong'
    },
  },

})

export default cartReducer.reducer
export const { removeFromCart } = cartReducer.actions
