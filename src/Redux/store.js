import { configureStore } from '@reduxjs/toolkit'
import slidebarReducer from './SlidebarSlice/slidebarSlice'
import employeeReducer from './EmployeeSlice/employeeSlice'
import customerReducer from './CustomerSlice/customerSlice'
import rolesReducer from './RolesSlice/rolesSlice'
import permissionsReducer from './PermissionsSlice/permissionsSlice'
import locationReducer from './LocationSlice/locationSlice'

const store = configureStore({
  reducer: {
    slidebar: slidebarReducer,
    employee: employeeReducer,
    customer: customerReducer,
    roles: rolesReducer,
    permissions: permissionsReducer,
    location: locationReducer,
  },
})

export default store
