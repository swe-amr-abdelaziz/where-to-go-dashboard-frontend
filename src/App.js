import React, { Component, Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate, Redirect } from 'react-router-dom'
import 'primeicons/primeicons.css'
import './scss/style.scss'
import PropTypes from 'prop-types'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const EmployeeLayout = React.lazy(() => import('./layout/EmployeeLayout'))

// Pages
const Login = React.lazy(() => import('./Pages/login/Login'))
const Register = React.lazy(() => import('./Pages/register/Register'))
const Page404 = React.lazy(() => import('./Pages/page404/Page404'))
const Page403 = React.lazy(() => import('./Pages/page403/Page403'))
const Page500 = React.lazy(() => import('./Pages/page500/Page500'))

// Component for private routes...
const PrivateRoute = ({ element: Component, roles, ...rest }) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  if (!token) {
    return <Navigate to="/employee/login" />
  }

  if (roles.includes(role)) {
    if (role === 'Admin') {
      return <DefaultLayout {...rest} />
    } else if (role === 'Employee') {
      return <EmployeeLayout {...rest} />
    }
  }

  return <Navigate to="/403" />
}

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/employee/login" name="Login Page" element={<Login />} />
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
