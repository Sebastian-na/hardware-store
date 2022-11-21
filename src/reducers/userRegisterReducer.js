import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const register = createAsyncThunk(
  'USER/register',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/users/register/', data)
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)

const userReducer = createSlice({
  name: 'USER',
  initialState: {
    isLoading: false,
    error: null,
  },
  reducers: {
    removeError: (state) => {
      state.error = null
    },
  },
  extraReducers: {
    [register.pending]: (state) => {
      state.isLoading = true
    },
    [register.fulfilled]: (state) => {
      state.isLoading = false
    },
    [register.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload.response.data.detail || 'Something went wrong'
    },
  },
})

export default userReducer.reducer
export const { removeError } = userReducer.actions
