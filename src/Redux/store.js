import { configureStore } from '@reduxjs/toolkit'
import slidebarReducer from './SlidebarSlice/slidebarSlice'
import employeeReducer from './EmployeeSlice/employeeSlice'
import customerReducer from './CustomerSlice/customerSlice'
import rolesReducer from './RolesSlice/rolesSlice'
import permissionsReducer from './PermissionsSlice/permissionsSlice'
import locationReducer from './LocationSlice/locationSlice'
import notificationSlice from './NotificationSlice/NotificationSlice'

const store = configureStore({
  reducer: {
    slidebar: slidebarReducer,
    employee: employeeReducer,
    customer: customerReducer,
    roles: rolesReducer,
    permissions: permissionsReducer,
    location: locationReducer,
    notification: notificationSlice,
  },
})

export default store
