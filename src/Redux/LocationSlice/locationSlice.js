import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const axiosInstance = axios.create({
  baseURL: 'https://countriesnow.space/api/v0.1/countries',
})

const initialState = {
  countries: [],
  states: [],
  cities: [],
  loading: false,
  error: 'null',
}

export const getCountries = createAsyncThunk('location/getCountries', async (thunkAPI) => {
  try {
    const response = await axiosInstance.get('/iso')
    return response.data.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const getStates = createAsyncThunk('location/getStates', async (data, thunkAPI) => {
  try {
    const response = await axiosInstance.post('/states', data)
    return response.data.data.states
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const getCities = createAsyncThunk('location/getCities', async (data, thunkAPI) => {
  try {
    const response = await axiosInstance.post('/state/cities', data)
    return response.data.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const deleteCustomer = createAsyncThunk('customers/deleteCustomer', async (id, thunkAPI) => {
  try {
    const response = await axiosInstance.delete(`${URL}/${id}`)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const softDeleteCustomer = createAsyncThunk(
  'customers/softDeleteCustomer',
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`${URL}/softDelete/${id}`)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const restoreCustomer = createAsyncThunk(
  'customers/restoreCustomer',
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`${URL}/restore/${id}`)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const banCustomer = createAsyncThunk('customers/banCustomer', async (id, thunkAPI) => {
  try {
    const response = await axiosInstance.patch(`${URL}/ban/${id}`)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const unbanCustomer = createAsyncThunk('customers/unbanCustomer', async (id, thunkAPI) => {
  try {
    const response = await axiosInstance.patch(`${URL}/unban/${id}`)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const deactivateCustomer = createAsyncThunk(
  'customers/deactivateCustomer',
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`${URL}/deactivate/${id}`)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const activateCustomer = createAsyncThunk(
  'customers/activateCustomer',
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`${URL}/activate/${id}`)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

const locationSlice = createSlice({
  name: 'customers',
  initialState,
  extraReducers: {
    [getCountries.pending]: (state, action) => {
      state.loading = true
    },
    [getCountries.fulfilled]: (state, action) => {
      state.countries = action.payload
      state.loading = false
    },
    [getCountries.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    [getStates.pending]: (state, action) => {
      state.loading = true
    },
    [getStates.fulfilled]: (state, action) => {
      state.states = action.payload
      state.loading = false
    },
    [getStates.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    [getCities.pending]: (state, action) => {
      state.loading = true
    },
    [getCities.fulfilled]: (state, action) => {
      state.cities = action.payload
      state.loading = false
    },
    [getCities.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export default locationSlice.reducer
