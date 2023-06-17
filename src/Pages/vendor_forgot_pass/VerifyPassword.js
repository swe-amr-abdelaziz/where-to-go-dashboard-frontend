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
  const [secret, setSecret] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSecretChange = (e) => {
    setSecret(e.target.value)
  }

  const handleVerifyPassword = async () => {
    setLoading(true)

    try {
      const response = await axios.post(
        'http://localhost:8001/api/v1/auth/vendor/verifyResetCode',
        { resetCode: secret },
      )

      if (response.status === 200) {
        toast.success('Great, You can reset your password!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        })

        navigate('/vendor/resetPassword')
      }
      setLoading(false)
    } catch (error) {
      toast.error('Invalid Secret!', {
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
                    <h1>Check your mail</h1>
                    <p className="text-medium-emphasis">
                      We send you a secret key, Please check your mail.
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Enter the secret key"
                        autoComplete="off"
                        onChange={handleSecretChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={handleVerifyPassword}
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
