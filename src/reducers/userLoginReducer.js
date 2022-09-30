import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const login = createAsyncThunk(
  'USER/login',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/users/login/', data)
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)

const userReducer = createSlice({
  name: 'USER',
  initialState: {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    isLoggedIn: !!localStorage.getItem('user'),
    isLoading: false,
    error: null,
  },
  reducers:
    {
      removeError: (state) => {
        state.error = null
      },
      logout: (state) => {
        state.user = null
        state.isLoggedIn = false
        localStorage.removeItem('user')
      },
    },
  extraReducers: {
    [login.pending]: (state) => {
      state.isLoading = true
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false
      state.isLoggedIn = true
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload.response.data.detail || 'Something went wrong'
    },
  },
})

export default userReducer.reducer
export const { removeError, logout } = userReducer.actions
