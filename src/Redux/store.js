import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from './EmployeeSlice/employeeSlice'

const store = configureStore({
  reducer: {
    employee: employeeReducer,
  },
})

export default store
