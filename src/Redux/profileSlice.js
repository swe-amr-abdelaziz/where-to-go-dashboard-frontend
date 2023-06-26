import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const URL = 'http://localhost:8001/api/v1/customers'
//import axios from './../../Axios'
//const URL = '/api/v1/employees'

const initialState = {
  customer: {},
  image: localStorage.getItem('img'),
  favoriteVendors: [],
  loading: false,
  error: null,
}

export const getCustomer = createAsyncThunk('profile/getCustomer', async (id, thunkAPI) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(`${URL}/getMe`, {
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

export const getFavoriteVendors = createAsyncThunk(
  'profile/getFavoriteVendors',
  async (currentPage, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${URL}/myFavorites?page=${currentPage}`, {
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
  },
)

export const getAllFavoriteVendors = createAsyncThunk(
  'profile/getAllFavoriteVendors',
  async (thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${URL}/myFavorites`, {
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
  },
)

export const addFavoriteVendor = createAsyncThunk(
  'profile/addFavoriteVendor',
  async (data, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.patch(`${URL}/favorites`, data, {
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
  },
)

export const deleteFavoriteVendor = createAsyncThunk(
  'profile/deleteFavoriteVendor',
  async (data, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.delete(`${URL}/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
        data: data,
      })
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

export const updateCustomer = createAsyncThunk(
  'profile/updateCustomer',
  async (customer, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.put(`${URL}/updateMe`, customer, {
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
  },
)

export const changePassword = createAsyncThunk(
  'profile/changePassword',
  async (passwords, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.put(`${URL}/changeMyPassword`, passwords, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setVendorId: (state, action) => {
      state.vendorId = action.payload
    },
    setImage: (state, action) => {
      state.image = action.payload
    },
  },
  extraReducers: {
    [getCustomer.pending]: (state, action) => {
      state.loading = true
    },
    [getCustomer.fulfilled]: (state, action) => {
      state.customer = action.payload
      state.loading = false
    },
    [getCustomer.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    [updateCustomer.pending]: (state, action) => {
      state.loading = true
    },
    [updateCustomer.fulfilled]: (state, action) => {
      state.customer = action.payload
      localStorage.setItem('img', action.payload.image)
      state.image = action.payload.image
      state.loading = false
    },
    [updateCustomer.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    [changePassword.pending]: (state, action) => {
      state.loading = true
    },
    [changePassword.fulfilled]: (state, action) => {
      state.loading = false
      state.error = null
    },
    [changePassword.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    // Get Favorite Vendors pagination
    [getFavoriteVendors.pending]: (state, action) => {
      state.loading = true
    },
    [getFavoriteVendors.fulfilled]: (state, action) => {
      state.favoriteVendors = action.payload
      state.loading = false
    },
    [getFavoriteVendors.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    // Get All Favorite Vendors
    [getAllFavoriteVendors.pending]: (state, action) => {
      state.loading = true
    },
    [getAllFavoriteVendors.fulfilled]: (state, action) => {
      state.favoriteVendors = action.payload
      state.loading = false
    },
    [getAllFavoriteVendors.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    [addFavoriteVendor.pending]: (state, action) => {
      state.loading = true
    },
    [addFavoriteVendor.fulfilled]: (state, action) => {
      // state.favoriteVendors.push(state.vendorId)
      state.loading = false
    },
    [addFavoriteVendor.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    [deleteFavoriteVendor.pending]: (state, action) => {
      state.loading = true
    },
    [deleteFavoriteVendor.fulfilled]: (state, action) => {
      // state.favoriteVendors.splice(state.favoriteVendors.indexOf(state.vendorId), 1);
      state.loading = false
    },
    [deleteFavoriteVendor.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const { setEmployee, clearEmployee, setVendorId, setImage } = profileSlice.actions
export default profileSlice.reducer
