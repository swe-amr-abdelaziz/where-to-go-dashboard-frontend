import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../Axios'
const URL = '/api/v1/auth/vendor'

const initialState = {
  place: {},
  loading: false,
  error: 'null',
}

export const getPlace = createAsyncThunk('place/getPlace', async (id, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`${URL}/${id}`)
    return response.data
  } catch (error) {
    if (error.response.data.message === 'UnAuthorized..!') {
      localStorage.clear()
      window.location.href = '/login'
    }
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

const placeSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: {
    [getPlace.pending]: (state) => {
      state.loading = true
    },
    [getPlace.fulfilled]: (state, action) => {
      state.place = action.payload.data
      state.loading = false
    },
    [getPlace.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export default placeSlice.reducer
