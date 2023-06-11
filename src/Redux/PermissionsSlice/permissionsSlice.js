import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../Axios'

const URL = '/api/v1/permissions'
const initialState = {
  permissions: [],
  permission: {},
  loading: false,
  error: null,
}

export const getPermissions = createAsyncThunk(
  'permissions/getPermissions',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(URL)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const createPermission = createAsyncThunk(
  'permissions/createPermission',
  async (permissionData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(URL, permissionData)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const updatePermission = createAsyncThunk(
  'permissions/updatePermission',
  async (permissionData, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`${URL}/${permissionData._id}`, permissionData)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

// export const deletePermission = createAsyncThunk(
//   'permissions/deletePermission',
//   async (id, thunkAPI) => {
//     try {
//       const response = await axiosInstance.delete(`${URL}/${id}`)
//       return response.data.oldData
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data)
//     }
//   },
// )
export const deletePermission = createAsyncThunk(
  'permissions/deletePermission',
  async (id, thunkAPI) => {
    try {
      await axiosInstance.delete(`${URL}/${id}`)
      return id // Return the deleted permission ID
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    setPermission: (state, action) => {
      state.permission = action.payload
    },
    clearPermission: (state) => {
      state.permission = {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPermissions.pending, (state) => {
        state.loading = true
      })
      .addCase(getPermissions.fulfilled, (state, action) => {
        state.permissions = action.payload
        state.loading = false
      })
      .addCase(getPermissions.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })
      .addCase(createPermission.pending, (state) => {
        state.loading = true
      })
      .addCase(createPermission.fulfilled, (state, action) => {
        state.permissions.push(action.payload)
        state.loading = false
      })
      .addCase(createPermission.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })
      .addCase(updatePermission.pending, (state) => {
        state.loading = true
      })
      .addCase(updatePermission.fulfilled, (state, action) => {
        state.permissions = state.permissions.map((permission) =>
          permission._id === action.payload._id ? action.payload : permission,
        )
        state.loading = false
      })
      .addCase(updatePermission.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })
      .addCase(deletePermission.pending, (state) => {
        state.loading = true
      })
      .addCase(deletePermission.fulfilled, (state, action) => {
        const deletedPermissionId = action.payload
        state.permissions = state.permissions.filter(
          (permission) => permission._id !== deletedPermissionId,
        )

        console.log('Deleted permission ID:', deletedPermissionId)
        state.loading = false
      })
      .addCase(deletePermission.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })
  },
})

export const { setPermission, clearPermission } = permissionsSlice.actions
export default permissionsSlice.reducer
