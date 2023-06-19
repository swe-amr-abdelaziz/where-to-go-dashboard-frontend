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

  const handleLogin = async () => {
    setLoading(true)

    try {
      const response = await axios.post('http://localhost:8001/api/v1/auth/vendor/login', {
        email,
        password,
      })

      if (response.status === 200) {
        const Vendor = 'af7656fd-f147-47cd-a33d-03b323d7ea9b'
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('v_id', response.data.id)
        if (response.data.role === 'vendor') {
          localStorage.setItem('role', Vendor)
          navigate('/')
          dispatch(changeRole('Vendor'))

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
    navigate('/vendor/forgotPassword')
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
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color="primary"
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
                    <h2>Vendors Login</h2>
                    <p>Here Vendor can login to the vendor dashboard.</p>
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
