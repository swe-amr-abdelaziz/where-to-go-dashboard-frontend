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

const Login = () => {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value)
  }

  const handleLogin = async () => {
    setLoading(true)

    try {
      const response = await axios.put('http://localhost:8001/api/v1/auth/vendor/resetPassword', {
        password: password,
        passwordConfirm: passwordConfirm,
      })

      if (response.status === 200) {
        toast.success('Password Updated Successfully!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        })

        navigate('/vendor/login')
      }
      setLoading(false)
    } catch (error) {
      toast.error('Invalid Process!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      })
      setLoading(false)
    }
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
                    <h1>Reset Password</h1>
                    <p className="text-medium-emphasis">Type new password.</p>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="New Password"
                        autoComplete="current-password"
                        onChange={handlePasswordChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Confirm Password"
                        autoComplete="current-password"
                        onChange={handlePasswordConfirmChange}
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
                          {loading ? 'Loading...' : 'Reset'}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Reset Password</h2>
                    <p>Here you can reset your new password for your account.</p>
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
