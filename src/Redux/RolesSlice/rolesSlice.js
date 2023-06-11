import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../Axios'

const URL = '/api/v1/roles'
const initialState = {
  roles: [],
  role: {},
  loading: false,
  error: null,
}

export const getRoles = createAsyncThunk('roles/getRoles', async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get(URL)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const createRole = createAsyncThunk('roles/createRole', async (roleData, thunkAPI) => {
  try {
    const response = await axiosInstance.post(URL, roleData)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const updateRole = createAsyncThunk('roles/updateRole', async (roleData, thunkAPI) => {
  try {
    const response = await axiosInstance.put(`${URL}/${roleData._id}`, roleData)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const deleteRole = createAsyncThunk('roles/deleteRole', async (id, thunkAPI) => {
  try {
    const response = await axiosInstance.delete(`${URL}/${id}`)
    return response.data.oldData
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload
    },
    clearRole: (state) => {
      state.role = {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoles.pending, (state) => {
        state.loading = true
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.roles = action.payload
        state.loading = false
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })
      .addCase(createRole.pending, (state) => {
        state.loading = true
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.roles.push(action.payload)
        state.loading = false
      })
      .addCase(createRole.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })
      .addCase(updateRole.pending, (state) => {
        state.loading = true
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.roles = state.roles.map((role) =>
          role._id === action.payload._id ? action.payload : role,
        )
        state.loading = false
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })
      .addCase(deleteRole.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        const deletedRoleId = action.payload
        state.roles = state.roles.filter((role) => role._id !== deletedRoleId)

        console.log('Deleted Role ID:', deletedRoleId)
        state.loading = false
      })

      .addCase(deleteRole.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })
  },
})

export const { setRole, clearRole } = rolesSlice.actions
export default rolesSlice.reducer
