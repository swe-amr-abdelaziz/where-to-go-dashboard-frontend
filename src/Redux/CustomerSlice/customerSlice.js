import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../Axios'
const URL = '/api/v1/customers'

const initialState = {
  customers: [],
  customer: {},
  loading: false,
  error: 'null',
}

export const getCustomers = createAsyncThunk('customers/getCustomers', async (thunkAPI) => {
  try {
    const response = await axiosInstance.get(URL)
    return response.data.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const getCustomer = createAsyncThunk('customers/getCustomer', async (id, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`${URL}/${id}`)
    console.log(response.data.data[0].firstName)
    return response.data.data[0]
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const createCustomer = createAsyncThunk(
  'Customers/createCustomer',
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post(URL, data)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const updateCustomer = createAsyncThunk(
  'customers/updateCustomer',
  async (customer, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`${URL}/${customer.get('_id')}`, customer)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const deleteCustomer = createAsyncThunk('customers/deleteCustomer', async (id, thunkAPI) => {
  try {
    const response = await axiosInstance.delete(`${URL}/${id}`)
    return response.data.oldData
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const banCustomer = createAsyncThunk('customers/banCustomer', async (id, thunkAPI) => {
  try {
    const response = await axiosInstance.put(`${URL}/ban/${id}`)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const unbanCustomer = createAsyncThunk('customers/unbanCustomer', async (id, thunkAPI) => {
  try {
    const response = await axiosInstance.put(`${URL}/unban/${id}`)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const deactivateCustomer = createAsyncThunk(
  'customers/deactivateCustomer',
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`${URL}/deactivate/${id}`)
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
      const response = await axiosInstance.put(`${URL}/activate/${id}`)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      state.customer = action.payload
    },
    clearCustomer: (state, action) => {
      state.customer = {}
    },
  },
  extraReducers: {
    [getCustomers.pending]: (state, action) => {
      state.loading = true
    },
    [getCustomers.fulfilled]: (state, action) => {
      state.customers = action.payload
      state.loading = false
    },
    [getCustomers.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
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
    [createCustomer.pending]: (state, action) => {
      state.loading = true
    },
    [createCustomer.fulfilled]: (state, action) => {
      state.customers.push(action.payload)
      state.loading = false
    },
    [createCustomer.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    [updateCustomer.pending]: (state, action) => {
      state.loading = true
    },
    [updateCustomer.fulfilled]: (state, action) => {
      state.customers = state.customers.map((customer) =>
        customer._id === action.payload._id ? action.payload : customer,
      )
      state.loading = false
    },
    [updateCustomer.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    [deleteCustomer.pending]: (state, action) => {
      state.loading = true
    },
    [deleteCustomer.fulfilled]: (state, action) => {
      state.customers = state.customers.filter((customer) => customer._id !== action.payload._id)
      state.loading = false
    },
    [deleteCustomer.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    [banCustomer.pending]: (state, action) => {
      state.loading = true
    },
    [banCustomer.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.customers = state.customers.map((customer) =>
        customer._id === action.payload.customer._id ? action.payload.customer : customer,
      )
      state.loading = false
    },
    [banCustomer.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    [unbanCustomer.pending]: (state, action) => {
      state.loading = true
    },
    [unbanCustomer.fulfilled]: (state, action) => {
      state.customers = state.customers.map((customer) =>
        customer._id === action.payload.customer._id ? action.payload.customer : customer,
      )
      state.loading = false
    },
    [unbanCustomer.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    [deactivateCustomer.pending]: (state, action) => {
      state.loading = true
    },
    [deactivateCustomer.fulfilled]: (state, action) => {
      state.customers = state.customers.map((customer) =>
        customer._id === action.payload.customer._id ? action.payload.customer : customer,
      )
      state.loading = false
    },
    [deactivateCustomer.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    [activateCustomer.pending]: (state, action) => {
      state.loading = true
    },
    [activateCustomer.fulfilled]: (state, action) => {
      state.customers = state.customers.map((customer) =>
        customer._id === action.payload.customer._id ? action.payload.customer : customer,
      )
      state.loading = false
    },
    [activateCustomer.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const { setCustomer, clearCustomer } = customerSlice.actions
export default customerSlice.reducer
