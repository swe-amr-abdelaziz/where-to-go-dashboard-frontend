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
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      handleForgotPassword()
    }
  }

  const handleForgotPassword = async () => {
    setLoading(true)

    try {
      const response = await axios.post(
        'http://localhost:8001/api/v1/auth/vendor/forgotPassword',
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000/',
          },
        },
      )

      if (response.status === 200) {
        toast.success('Check your mail!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        })

        navigate('/vendor/verifyPassword')
      }
      setLoading(false)
    } catch (error) {
      toast.error('Invalid Email!', {
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
                    <h1>Forgot Password</h1>
                    <p className="text-medium-emphasis">Search for your account</p>
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
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          style={{ 'background-color': '#00BBAA' }}
                          className="px-4"
                          onClick={handleForgotPassword}
                          disabled={loading}
                        >
                          {loading ? 'Loading...' : 'Search'}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
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
