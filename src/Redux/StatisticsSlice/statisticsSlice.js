import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const URL = 'http://localhost:8001/api/v1'

const initialState = {
  customers: {},
  vendors: {},
  places: {},
  newCustomers: [],
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
    const response = await axios.get(`${URL}/reports/generateVendorPerformanceReport`, {
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
  },
})

export default statisticsSlice.reducer
