import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = { notifications: [], role: '' }

export const getNotifications = createAsyncThunk(
  'notification/getNotifications',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios('http://localhost:8001/api/v1/notifications', {
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

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      state.notifications.push(...action.payload)
    },
    removeNotification(state, action) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload,
      )
    },
    changeRole(state, action) {
      state.role = action.payload
    },
  },
  extraReducers: {
    [getNotifications.pending]: (state, action) => {
      state.loading = true
    },
    [getNotifications.fulfilled]: (state, action) => {
      state.notifications = action.payload
      state.loading = false
    },
    [getNotifications.rejected]: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { addNotification, removeNotification, changeRole } = notificationSlice.actions

export default notificationSlice.reducer
