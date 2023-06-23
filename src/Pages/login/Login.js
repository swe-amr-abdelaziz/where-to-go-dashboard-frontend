import React, { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { changeRole } from '../../Redux/NotificationSlice/NotificationSlice'

const Login = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      handleLogin()
    }
  }

  const handleLogin = async () => {
    setLoading(true)

    try {
      const response = await axios.post('http://localhost:8001/api/v1/auth/employee/login', {
        email,
        password,
      })

      if (response.status === 200) {
        const Admin = '72dd04b7-4d1d-4434-af60-d6804d8ec991'
        const Employee = '405ac1d7-5956-479e-9967-48da40aebb79'

        localStorage.setItem('token', response.data.token)
        if (response.data.role === 'Admin') {
          localStorage.setItem('role', Admin)
          navigate('/')
          dispatch(changeRole('Employee'))

          toast.success('Login succeeded!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          })
        } else if (response.data.role === 'Employee') {
          localStorage.setItem('role', Employee)
          navigate('/')
          dispatch(changeRole('Employee'))

          toast.success('Login succeeded!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          })
        } else {
          navigate('/vendor/login')
          toast.error('Login failed!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          })
        }
      }
      setLoading(false)
    } catch (error) {
      toast.error('Login failed!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      })
      setLoading(false)
    }
  }

  const handleForgotPassword = () => {
    navigate('/employee/forgotPassword')
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        onChange={handleEmailChange}
                        onKeyDown={handleEnter}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={handlePasswordChange}
                        onKeyDown={handleEnter}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          style={{ 'background-color': '#00BBAA' }}
                          className="px-4"
                          onClick={handleLogin}
                          disabled={loading}
                        >
                          {loading ? 'Loading...' : 'Login'}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton onClick={handleForgotPassword} color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Employees Login</h2>
                    <p>Here Admin or Employees can login to the system dashboard.</p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default Login
