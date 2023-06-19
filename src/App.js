import React, { Component, Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate, Redirect } from 'react-router-dom'
import 'primeicons/primeicons.css'
import './scss/style.scss'
import PropTypes from 'prop-types'
import { io } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { changeRole, getNotifications } from './Redux/NotificationSlice/NotificationSlice'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const EmployeeLayout = React.lazy(() => import('./layout/EmployeeLayout'))
const VendorLayout = React.lazy(() => import('./layout/VendorLayout'))

// Pages
const Login = React.lazy(() => import('./Pages/login/Login'))
const ForgotPassword = React.lazy(() => import('./Pages/forgot_pass/ForgotPassword'))
const VerifyPassword = React.lazy(() => import('./Pages/forgot_pass/VerifyPassword'))
const ResetPassword = React.lazy(() => import('./Pages/forgot_pass/ResetPassword'))
const Register = React.lazy(() => import('./Pages/register/Register'))
const Page404 = React.lazy(() => import('./Pages/page404/Page404'))
const Page403 = React.lazy(() => import('./Pages/page403/Page403'))
const Page500 = React.lazy(() => import('./Pages/page500/Page500'))

const VendorLogin = React.lazy(() => import('./Pages/login/VendorLogin'))
const VendorForgotPassword = React.lazy(() => import('./Pages/vendor_forgot_pass/ForgotPassword'))
const VendorVerifyPassword = React.lazy(() => import('./Pages/vendor_forgot_pass/VerifyPassword'))
const VendorResetPassword = React.lazy(() => import('./Pages/vendor_forgot_pass/ResetPassword'))

// Component for private routes...
const PrivateRoute = ({ element: Component, roles, ...rest }) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  // const Admin = '72dd04b7-4d1d-4434-af60-d6804d8ec991'
  // const Employee = '405ac1d7-5956-479e-9967-48da40aebb79'

  const isExcludedPage =
    rest.path === '/employee/forgotPassword' ||
    rest.path === '/employee/verifyPassword' ||
    rest.path === '/employee/resetPassword' ||
    rest.path === '/vendor/forgotPassword' ||
    rest.path === '/vendor/verifyPassword' ||
    rest.path === '/vendor/resetPassword'

  const isPublic =
    rest.path === '/employee/login' || rest.path === '/vendor/login' || isExcludedPage

  if (!token && !isPublic) {
    return <Navigate to="/employee/login" />
  }

  if (!isExcludedPage && (roles.includes('Admin') || roles.includes('Employee'))) {
    if (role === '72dd04b7-4d1d-4434-af60-d6804d8ec991') {
      return <DefaultLayout {...rest} />
    } else if (role === '405ac1d7-5956-479e-9967-48da40aebb79') {
      return <EmployeeLayout {...rest} />
    } else if (role === 'af7656fd-f147-47cd-a33d-03b323d7ea9b') {
      return <VendorLayout {...rest} />
    } else {
      return <Navigate to="/employee/login" />
    }
  }

  return <Navigate to="/403" />
}

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const App = () => {
  const dispatch = useDispatch()
  const logedIn = useSelector((state) => state.notification.role)

  useEffect(() => {
    if (logedIn === '' && localStorage.getItem('token') !== null) {
      if (localStorage.getItem('v_id') !== null) {
        dispatch(changeRole('Vendor'))
      } else {
        dispatch(changeRole('Employee'))
      }
    }

    const socket = io('http://localhost:8001')

    socket.on('connect', () => {
      console.log('connected', socket.id)
    })
    socket.on('changeInVendorTable', (data) => {
      dispatch(getNotifications())
    })

    socket.on('disconnect', () => {
      console.log('disconnected')
    })
  }, [logedIn])

  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/employee/login" name="Login Page" element={<Login />} />
          <Route
            exact
            path="/employee/forgotPassword"
            name="ForgotPassword"
            element={<ForgotPassword />}
          />
          <Route
            exact
            path="/employee/verifyPassword"
            name="VerifyPassword Page"
            element={<VerifyPassword />}
          />
          <Route
            exact
            path="/employee/resetPassword"
            name="ResetPassword Page"
            element={<ResetPassword />}
          />
          <Route exact path="/vendor/login" name="Vendor Login Page" element={<VendorLogin />} />
          <Route
            exact
            path="/vendor/forgotPassword"
            name="ForgotPassword"
            element={<VendorForgotPassword />}
          />
          <Route
            exact
            path="/vendor/verifyPassword"
            name="VerifyPassword Page"
            element={<VendorVerifyPassword />}
          />
          <Route
            exact
            path="/vendor/resetPassword"
            name="ResetPassword Page"
            element={<VendorResetPassword />}
          />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/403" name="Page 403" element={<Page403 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route
            path="*"
            name="Home"
            element={<PrivateRoute roles={['Admin', 'Employee']} element={DefaultLayout} />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
