import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const URL = 'http://localhost:8001/api/v1/employees'

const initialState = {
  employees: [],
  employee: {},
  loading: false,
  error: 'null',
}

export const getEmployees = createAsyncThunk('employees/getEmployees', async (thunkAPI) => {
  try {
    const response = await axios.get(URL)
    return response.data.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const getEmployee = createAsyncThunk('employees/getEmployee', async (id, thunkAPI) => {
  try {
    const response = await axios.get(`${URL}/${id}`)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const createEmployee = createAsyncThunk(
  'employees/createEmployee',
  async (employee, thunkAPI) => {
    try {
      const response = await axios.post(URL, employee)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const updateEmployee = createAsyncThunk(
  'employees/updateEmployee',
  async (employee, thunkAPI) => {
    try {
      const response = await axios.put(`${URL}/${employee._id}`, employee)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id, thunkAPI) => {
  try {
    const response = await axios.delete(`/api/employees/${id}`)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const banEmployee = createAsyncThunk('employees/banEmployee', async (id, thunkAPI) => {
  try {
    const response = await axios.put(`${URL}/ban/${id}`)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const unbanEmployee = createAsyncThunk('employees/unbanEmployee', async (id, thunkAPI) => {
  try {
    const response = await axios.put(`${URL}/unban/${id}`)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const deactivateEmployee = createAsyncThunk(
  'employees/deactivateEmployee',
  async (id, thunkAPI) => {
    try {
      const response = await axios.put(`${URL}/deactivate/${id}`)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const activateEmployee = createAsyncThunk(
  'employees/activateEmployee',
  async (id, thunkAPI) => {
    try {
      const response = await axios.put(`${URL}/activate/${id}`)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: {
    [getEmployees.pending]: (state, action) => {
      state.loading = true
    },
    [getEmployees.fulfilled]: (state, action) => {
      state.employees = action.payload
      state.loading = false
    },
    [getEmployees.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    [getEmployee.pending]: (state, action) => {
      state.loading = true
    },
    [getEmployee.fulfilled]: (state, action) => {
      state.employee = action.payload
      state.loading = false
    },
    [getEmployee.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    [createEmployee.pending]: (state, action) => {
      state.loading = true
    },
    [createEmployee.fulfilled]: (state, action) => {
      state.employees.push(action.payload)
      state.loading = false
    },
    [createEmployee.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    [updateEmployee.pending]: (state, action) => {
      state.loading = true
    },
    [updateEmployee.fulfilled]: (state, action) => {
      state.employees = state.employees.map((employee) =>
        employee._id === action.payload._id ? action.payload : employee,
      )
      state.loading = false
    },
    [updateEmployee.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    [deleteEmployee.pending]: (state, action) => {
      state.loading = true
    },
    [deleteEmployee.fulfilled]: (state, action) => {
      state.employees = state.employees.filter((employee) => employee._id !== action.payload._id)
      state.loading = false
    },
    [deleteEmployee.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    [banEmployee.pending]: (state, action) => {
      state.loading = true
    },
    [banEmployee.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.employees = state.employees.map((employee) =>
        employee._id === action.payload.employee._id ? action.payload.employee : employee,
      )
      state.loading = false
    },
    [banEmployee.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    [unbanEmployee.pending]: (state, action) => {
      state.loading = true
    },
    [unbanEmployee.fulfilled]: (state, action) => {
      state.employees = state.employees.map((employee) =>
        employee._id === action.payload.employee._id ? action.payload.employee : employee,
      )
      state.loading = false
    },
    [unbanEmployee.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    [deactivateEmployee.pending]: (state, action) => {
      state.loading = true
    },
    [deactivateEmployee.fulfilled]: (state, action) => {
      state.employees = state.employees.map((employee) =>
        employee._id === action.payload.employee._id ? action.payload.employee : employee,
      )
      state.loading = false
    },
    [deactivateEmployee.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    [activateEmployee.pending]: (state, action) => {
      state.loading = true
    },
    [activateEmployee.fulfilled]: (state, action) => {
      state.employees = state.employees.map((employee) =>
        employee._id === action.payload.employee._id ? action.payload.employee : employee,
      )
      state.loading = false
    },
    [activateEmployee.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export default employeeSlice.reducer
