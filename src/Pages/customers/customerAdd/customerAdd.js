import React, { useRef, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { useDispatch } from 'react-redux'
import { createCustomer } from '../../../Redux/CustomerSlice/customerSlice'
import { useNavigate } from 'react-router-dom'

const CustomerAdd = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [validated, setValidated] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    street: '',
  })

  const regexPatterns = {
    firstName: '^[A-Za-z]+$',
    lastName: '^[A-Za-z]+$',
    password: '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
    city: '^[A-Za-z\\s ]+$',
    zip: '^\\d{5}$',
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    if (form.checkValidity() === true) {
      dispatch(createCustomer(formData)).then((res) => {
        navigate('/customers')
      })
    }
    setValidated(true)
  }

  return (
    <CCard className="m-3 mb-5 p-4 shadow">
      <CCardBody>
        <CRow>
          <CCol sm={5}>
            <h3 id="users-list" className="card-title mb-4 mt-2">
              Add Customer
            </h3>
          </CCol>
        </CRow>
        <CForm
          className="row g-3 needs-validation"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <CFormLabel htmlFor="firstName">Name</CFormLabel>
          <CCol md={6} className="mt-0">
            <CFormInput
              type="text"
              placeholder="First name"
              feedbackInvalid="Enter a valid first name"
              name="firstName"
              id="firstName"
              pattern={regexPatterns.firstName}
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </CCol>
          <CCol md={6} className="mt-0">
            <CFormInput
              type="text"
              placeholder="Last name"
              feedbackInvalid="Enter a valid last name"
              name="lastName"
              id="lastName"
              pattern={regexPatterns.lastName}
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </CCol>
          <CCol md={12}>
            <CFormLabel htmlFor="email">Email</CFormLabel>
            <CInputGroup>
              <CInputGroupText>
                <i className="pi pi-envelope"></i>
              </CInputGroupText>
              <CFormInput
                type="email"
                placeholder="example@xyz.com"
                feedbackInvalid="Enter a valid email address"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="input-group-custom"
              />
            </CInputGroup>
          </CCol>
          <CCol md={12}>
            <CFormLabel htmlFor="password">Password</CFormLabel>
            <CInputGroup>
              <CInputGroupText>
                <i className="pi pi-lock"></i>
              </CInputGroupText>
              <CFormInput
                type="password"
                feedbackInvalid="Enter a strong password with at least 8 characters"
                name="password"
                id="password"
                pattern={regexPatterns.password}
                value={formData.password}
                onChange={handleInputChange}
                required
                className="input-group-custom"
              />
            </CInputGroup>
          </CCol>
          <CFormLabel htmlFor="street">Address</CFormLabel>
          <CCol md={12} className="mt-0">
            <CFormInput
              type="text"
              placeholder="Street"
              feedbackInvalid="Enter a valid street"
              name="street"
              id="street"
              value={formData.street}
              onChange={handleInputChange}
            />
          </CCol>
          {/* <CCol md={6}>
            <CFormInput
              type="text"
              aria-describedby="validationCustom03Feedback"
              feedbackInvalid="Please provide a valid city."
              id="validationCustom03"
              label="City"
              required
            />
          </CCol>
          <CCol md={3}>
            <CFormSelect
              aria-describedby="validationCustom04Feedback"
              feedbackInvalid="Please select a valid state."
              id="validationCustom04"
              label="State"
              required
            >
              <option disabled>Choose...</option>
              <option>...</option>
            </CFormSelect>
          </CCol>
          <CCol md={3}>
            <CFormInput
              type="text"
              aria-describedby="validationCustom05Feedback"
              feedbackInvalid="Please provide a valid zip."
              id="validationCustom05"
              label="Zip"
              required
            />
          </CCol> */}
          <CCol xs={12} className="d-flex justify-content-end mt-5">
            <CButton
              className="bg-secondary me-3"
              type="submit"
              onClick={() => navigate('/customers')}
            >
              Back
            </CButton>
            <CButton className="bg-base" type="submit">
              Submit
            </CButton>
          </CCol>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default CustomerAdd
