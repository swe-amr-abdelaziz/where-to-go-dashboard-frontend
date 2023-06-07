import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from './EmployeeSlice/employeeSlice'
import customerReducer from './CustomerSlice/customerSlice'

const store = configureStore({
  reducer: {
    employee: employeeReducer,
    customer: customerReducer,
  },
})

export default store
