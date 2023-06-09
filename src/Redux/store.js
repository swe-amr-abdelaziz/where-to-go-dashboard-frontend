import { configureStore } from '@reduxjs/toolkit'
import slidebarReducer from './SlidebarSlice/slidebarSlice'
import employeeReducer from './EmployeeSlice/employeeSlice'
import customerReducer from './CustomerSlice/customerSlice'

const store = configureStore({
  reducer: {
    slidebar: slidebarReducer,
    employee: employeeReducer,
    customer: customerReducer,
  },
})

export default store
