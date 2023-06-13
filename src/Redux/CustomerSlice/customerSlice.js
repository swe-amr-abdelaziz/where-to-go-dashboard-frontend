import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance, axiosInstanceFormData } from '../../Axios'
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
    return response.data.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const createCustomer = createAsyncThunk(
  'customers/createCustomer',
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstanceFormData.post(URL, data)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const editCustomer = createAsyncThunk(
  'customers/editCustomer',
  async (customer, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`${URL}/${customer.get('id')}`, customer)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

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
    [editCustomer.pending]: (state, action) => {
      state.loading = true
    },
    [editCustomer.fulfilled]: (state, action) => {
      state.customers = state.customers.map((customer) =>
        customer._id === action.payload.id ? action.payload : customer,
      )
      state.loading = false
    },
    [editCustomer.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    [deleteCustomer.pending]: (state, action) => {
      state.loading = true
    },
    [deleteCustomer.fulfilled]: (state, action) => {
      state.customers = state.customers.filter((customer) => customer.id !== action.payload.id)
      state.loading = false
    },
    [deleteCustomer.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    [softDeleteCustomer.pending]: (state, action) => {
      state.loading = true
    },
    [softDeleteCustomer.fulfilled]: (state, action) => {
      state.customers = state.customers.map((customer) => {
        if (customer.id === action.payload.id) {
          customer.deletedAt = action.payload.deletedAt
        }
        return customer
      })
      state.loading = false
    },
    [softDeleteCustomer.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    [restoreCustomer.pending]: (state, action) => {
      state.loading = true
    },
    [restoreCustomer.fulfilled]: (state, action) => {
      state.customers = state.customers.map((customer) => {
        if (customer.id === action.payload.id) {
          customer.deletedAt = null
        }
        return customer
      })
      state.loading = false
    },
    [restoreCustomer.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    [banCustomer.pending]: (state, action) => {
      state.loading = true
    },
    [banCustomer.fulfilled]: (state, action) => {
      state.customers = state.customers.map((customer) => {
        if (customer.id === action.payload.id) {
          customer.bannedAt = action.payload.bannedAt
        }
        return customer
      })
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
      state.customers = state.customers.map((customer) => {
        if (customer.id === action.payload.id) {
          customer.bannedAt = null
        }
        return customer
      })
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
      state.customers = state.customers.map((customer) => {
        if (customer.id === action.payload.id) {
          customer.deactivatedAt = action.payload.deactivatedAt
        }
        return customer
      })
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
      state.customers = state.customers.map((customer) => {
        if (customer.id === action.payload.id) {
          customer.deactivatedAt = null
        }
        return customer
      })
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
