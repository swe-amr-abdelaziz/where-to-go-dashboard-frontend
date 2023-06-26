import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../Axios'
const URL = '/api/v1/reviews'

const initialState = {
  reviews: [],
  reviewsVisible: false,
}

export const addReview = createAsyncThunk('reviews/addReview', async (data, thunkAPI) => {
  try {
    const response = await axiosInstance.post(URL, data)
    return response.data
  } catch (error) {
    if (error.response.data.message === 'UnAuthorized..!') {
      localStorage.clear()
      window.location.href = '/login'
    }
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const getReviews = createAsyncThunk('reviews/getReviews', async (id, thunkAPI) => {
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

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setReviewsVisible: (state, action) => {
      state.reviewsVisible = action.payload
    },
  },
  extraReducers: {
    [addReview.fulfilled]: (state, action) => {},
    [getReviews.fulfilled]: (state, action) => {
      state.reviews = action.payload.reviews
    },
  },
})

export const { setReviewsVisible } = reviewSlice.actions
export default reviewSlice.reducer
