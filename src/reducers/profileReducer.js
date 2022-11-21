import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const updateUserProfile = createAsyncThunk(
  'PROFILE/updateUserProfile',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put('/api/users/profile/update/', data, {
        headers: { Authorization: `Bearer ${data.access_token}` },
      })
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)

const profileReducer = createSlice({
  name: 'PROFILE',
  initialState: {
    profile: null,
    isLoading: false,
    error: null,
    success: false,
  },

  reducers: {
    removeSuccess: (state) => {
      state.success = false
    },
  },
  extraReducers: {
    [updateUserProfile.pending]: (state) => {
      state.isLoading = true
    },
    [updateUserProfile.fulfilled]: (state, action) => {
      state.isLoading = false
      state.profile = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
      state.success = true
    },
    [updateUserProfile.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload.response.data.detail || 'Something went wrong'
    },
  },
})

export default profileReducer.reducer
export const { removeSuccess } = profileReducer.actions
