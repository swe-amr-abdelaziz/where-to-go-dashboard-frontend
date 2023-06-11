import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormCheck,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createEmployee } from '../../../Redux/EmployeeSlice/employeeSlice'
import { useNavigate } from 'react-router-dom'

const EmployeeAdd = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    if (form.checkValidity() === true) {
      event.preventDefault()
      event.stopPropagation()
      const data = new FormData(event.target)
      console.log(data.get('image'))
      dispatch(createEmployee(data)).then((res) => {
        navigate('/employees')
      })
    }
  }

  const handleCancel = () => {
    navigate('/employees')
  }

  return (
    <CCard className="mb-4">
      <CCardBody>
        <CRow>
          <CCol sm={5}>
            <h3 id="users-list" className="card-title mb-0">
              Add Employee
            </h3>
          </CCol>
        </CRow>
        <CForm
          className="row g-3 needs-validation"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <CCol md={4}>
            <CFormInput
              type="text"
              feedbackValid="Looks good!"
              id="validationCustom01"
              label="Name"
              name={'name'}
              required
            />
          </CCol>
          <CCol md={4}>
            <CFormInput
              type="email"
              feedbackValid="Looks good!"
              id="validationCustom02"
              label="Email"
              name={'email'}
              required
            />
          </CCol>
          <CCol md={4}>
            <CFormLabel htmlFor="validationCustomUsername">Password</CFormLabel>
            <CInputGroup className="has-validation">
              <CFormInput
                type="password"
                aria-describedby="inputGroupPrependFeedback"
                feedbackValid="Please choose a username."
                id="validationCustomUsername"
                name={'password'}
                required
              />
            </CInputGroup>
          </CCol>
          <CCol md={4}>
            <CFormInput
              type="number"
              aria-describedby="validationCustom03Feedback"
              feedbackInvalid="Please provide a valid salary."
              id="validationCustom03"
              label="Salary"
              name={'salary'}
              required
            />
          </CCol>
          <CCol md={4}>
            <CFormSelect
              aria-describedby="validationCustom04Feedback"
              feedbackInvalid="Please select a valid gender."
              id="validationCustom04"
              label="Gender"
              name={'gender'}
              required
            >
              <option selected value={'Male'}>
                Male
              </option>
              <option value={'Female'}>Female</option>
            </CFormSelect>
          </CCol>
          <CCol md={4}>
            <CFormSelect
              aria-describedby="validationCustom04Feedback"
              feedbackInvalid="Please select a valid role."
              id="validationCustom04"
              label="Role"
              name={'role'}
              required
            >
              <option selected value={'Employee'}>
                Employee
              </option>
              <option value={'Admin'}>Admin</option>
            </CFormSelect>
          </CCol>
          <CCol md={6}>
            <CFormInput
              type="text"
              aria-describedby="validationCustom03Feedback"
              feedbackInvalid="Please provide a valid Country."
              id="validationCustom03"
              label="Country"
              name={'country'}
              required
            />
          </CCol>
          <CCol md={3}>
            <CFormInput
              type="text"
              aria-describedby="validationCustom03Feedback"
              feedbackInvalid="Please provide a valid city."
              id="validationCustom03"
              label="City"
              name={'city'}
              required
            />
          </CCol>
          <CCol md={3}>
            <CFormInput
              type="text"
              aria-describedby="validationCustom05Feedback"
              feedbackInvalid="Please provide a valid street."
              id="validationCustom05"
              label="Street"
              name={'street'}
              required
            />
          </CCol>
          <CCol md={4}>
            <CFormInput
              type="number"
              aria-describedby="validationCustom05Feedback"
              feedbackInvalid="Please provide a valid phone."
              id="validationCustom05"
              label="Phone"
              name={'phoneNumber'}
              required
            />
          </CCol>
          <CCol md={4}>
            <CFormInput
              type="date"
              aria-describedby="validationCustom05Feedback"
              feedbackInvalid="Please provide a valid date of birth."
              id="validationCustom05"
              label="Date of Birth"
              name={'dateOfBirth'}
              required
            />
          </CCol>
          <CCol md={4}>
            <CFormInput
              type="date"
              aria-describedby="validationCustom05Feedback"
              feedbackInvalid="Please provide a valid date of birth."
              id="validationCustom05"
              label="Hire Date"
              name={'hireDate'}
              required
            />
          </CCol>
          <CCol md={11}>
            <CFormInput
              type="file"
              aria-describedby="validationCustom05Feedback"
              feedbackInvalid="Please provide a valid image."
              id="validationCustom05"
              label="image"
              name={'image'}
              required
            />
          </CCol>
          <CCol xs={2}>
            <CButton color="primary" type="submit">
              Submit form
            </CButton>
          </CCol>
          <CCol xs={1}>
            <CButton onClick={handleCancel} color="danger">
              Cancel
            </CButton>
          </CCol>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default EmployeeAdd
