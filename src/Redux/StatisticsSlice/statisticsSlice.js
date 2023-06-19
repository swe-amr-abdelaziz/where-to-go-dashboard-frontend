import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const URL = 'http://localhost:8001/api/v1'

const initialState = {
  customers: {},
  vendors: {},
  places: {},
  newCustomers: [],
  vendorTotal: {
    reviews: 0,
    favorites: 0,
  },
  vendorMonthly: {
    reviews: [],
    favorites: [],
  },
  loading: false,
}

export const getCustomers = createAsyncThunk('statistics/getCustomers', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(`${URL}/reports/generateUserActivityReport`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    if (error.response.data.message === 'UnAuthorized..!') {
      localStorage.clear()
      window.location.href = '/login'
    }
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const getVendors = createAsyncThunk('statistics/getVendors', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(`${URL}/reports/vendorReport`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    if (error.response.data.message === 'UnAuthorized..!') {
      localStorage.clear()
      window.location.href = '/login'
    }
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const getPlaces = createAsyncThunk('statistics/getPlaces', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(`${URL}/auth/topRated`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data.data
  } catch (error) {
    if (error.response.data.message === 'UnAuthorized..!') {
      localStorage.clear()
      window.location.href = '/login'
    }
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const getNewCustomers = createAsyncThunk(
  'statistics/getNewCustomers',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${URL}/reports/yearlyReport`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log(response.data)
      return response.data
    } catch (error) {
      if (error.response.data.message === 'UnAuthorized..!') {
        localStorage.clear()
        window.location.href = '/login'
      }
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const getVendorTotalReviews = createAsyncThunk(
  'statistics/getVendorTotalReviews',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${URL}/reports/vendorTotalReview`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log(response.data)
      return response.data.numberOfReviews
    } catch (error) {
      if (error.response.data.message === 'UnAuthorized..!') {
        localStorage.clear()
        window.location.href = '/login'
      }
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const getVendorTotalFavorites = createAsyncThunk(
  'statistics/getVendorTotalFavorites',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${URL}/reports/vendorTotalFav`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log(response.data)
      return response.data.data.totalFavorites
    } catch (error) {
      if (error.response.data.message === 'UnAuthorized..!') {
        localStorage.clear()
        window.location.href = '/login'
      }
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const getVendorMonthlyReviews = createAsyncThunk(
  'statistics/getVendorMonthlyReviews',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${URL}/reports/vendorMonthlyReview`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log(response.data)
      return response.data.reviewsByMonth
    } catch (error) {
      if (error.response.data.message === 'UnAuthorized..!') {
        localStorage.clear()
        window.location.href = '/login'
      }
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const getVendorMonthlyFavorites = createAsyncThunk(
  'statistics/getVendorMonthlyFavorites',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${URL}/reports/vendorMonthlyFav`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log(response.data)
      return response.data.data.favoritesByMonth
    } catch (error) {
      if (error.response.data.message === 'UnAuthorized..!') {
        localStorage.clear()
        window.location.href = '/login'
      }
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {},
  extraReducers: {
    [getCustomers.pending]: (state, action) => {
      state.loading = true
    },
    [getCustomers.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.customers = action.payload
      state.loading = false
    },
    [getCustomers.rejected]: (state, action) => {
      state.error = action.payload
    },
    [getVendors.pending]: (state, action) => {
      state.loading = true
    },
    [getVendors.fulfilled]: (state, action) => {
      state.vendors = action.payload
      state.loading = false
    },
    [getVendors.rejected]: (state, action) => {
      state.error = action.payload
    },
    [getPlaces.pending]: (state, action) => {
      state.loading = true
    },
    [getPlaces.fulfilled]: (state, action) => {
      state.places = action.payload
      state.loading = false
    },
    [getPlaces.rejected]: (state, action) => {
      state.error = action.payload
    },
    [getNewCustomers.pending]: (state, action) => {
      state.loading = true
    },
    [getNewCustomers.fulfilled]: (state, action) => {
      state.newCustomers = action.payload
      state.loading = false
    },
    [getNewCustomers.rejected]: (state, action) => {
      state.error = action.payload
    },
    [getVendorTotalReviews.pending]: (state, action) => {
      state.loading = true
    },
    [getVendorTotalReviews.fulfilled]: (state, action) => {
      state.vendorTotal = {
        ...state.vendorTotal,
        reviews: action.payload,
      }
      state.loading = false
    },
    [getVendorTotalReviews.rejected]: (state, action) => {
      state.error = action.payload
    },
    [getVendorTotalFavorites.pending]: (state, action) => {
      state.loading = true
    },
    [getVendorTotalFavorites.fulfilled]: (state, action) => {
      state.vendorTotal = {
        ...state.vendorTotal,
        favorites: action.payload,
      }
      state.loading = false
    },
    [getVendorTotalFavorites.rejected]: (state, action) => {
      state.error = action.payload
    },
    [getVendorMonthlyReviews.pending]: (state, action) => {
      state.loading = true
    },
    [getVendorMonthlyReviews.fulfilled]: (state, action) => {
      state.vendorMonthly = {
        ...state.vendorMonthly,
        reviews: action.payload,
      }
      state.loading = false
    },
    [getVendorMonthlyReviews.rejected]: (state, action) => {
      state.error = action.payload
    },
    [getVendorMonthlyFavorites.pending]: (state, action) => {
      state.loading = true
    },
    [getVendorMonthlyFavorites.fulfilled]: (state, action) => {
      state.vendorMonthly = {
        ...state.vendorMonthly,
        favorites: action.payload,
      }
      state.loading = false
    },
    [getVendorMonthlyFavorites.rejected]: (state, action) => {
      state.error = action.payload
    },
  },
})

export default statisticsSlice.reducer
