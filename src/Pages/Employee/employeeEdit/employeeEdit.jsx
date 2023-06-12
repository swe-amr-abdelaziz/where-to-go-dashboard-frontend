import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React, { useState } from 'react'
import { updateEmployee } from '../../../Redux/EmployeeSlice/employeeSlice'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CRow,
} from '@coreui/react'

const EmployeeEdit = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [validated, setValidated] = useState(false)
  const employee = useSelector((state) => state.employee.employee)

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
    }
    setValidated(true)
    if (form.checkValidity() === true) {
      event.preventDefault()
      event.stopPropagation()
      const data = new FormData(event.target)
      dispatch(updateEmployee(data)).then((res) => {
        console.log(res)
        if (res.payload.mssg === 'Updated') {
          navigate('/employees')
        }
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
              Edit Employee
            </h3>
          </CCol>
        </CRow>
        {employee.address ? (
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
                defaultValue={employee.name}
                required
              />
            </CCol>
            <CCol className="d-none">
              <CFormInput
                type="text"
                feedbackValid="Looks good!"
                id="validationCustom01"
                name={'_id'}
                defaultValue={employee._id}
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
                defaultValue={employee.email}
                required
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="number"
                aria-describedby="validationCustom03Feedback"
                feedbackInvalid="Please provide a valid salary."
                id="validationCustom03"
                label="Salary"
                name={'salary'}
                defaultValue={employee.salary}
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
                <option selected={employee.gender === 'Male'} value={'Male'}>
                  Male
                </option>
                <option selected={employee.gender === 'Female'} value={'Female'}>
                  Female
                </option>
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
                <option selected={employee.role.name === 'Employee'} value={'Employee'}>
                  Employee
                </option>
                <option selected={employee.role.name === 'Admin'} value={'Admin'}>
                  Admin
                </option>
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
                defaultValue={employee.address.country}
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
                defaultValue={employee.address.city}
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
                defaultValue={employee.address.street}
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
                defaultValue={employee.phoneNumber}
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
                defaultValue={new Date(employee.dateOfBirth).toISOString().split('T')[0]}
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
                defaultValue={new Date(employee.hireDate).toISOString().split('T')[0]}
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
              />
            </CCol>
            <CCol xs={2}>
              <CButton color="primary" type="submit">
                Update
              </CButton>
            </CCol>
            <CCol xs={1}>
              <CButton onClick={handleCancel} color="danger">
                Cancel
              </CButton>
            </CCol>
          </CForm>
        ) : (
          <>
            <div>No Employee Were Chosen ...</div>
            <CCol xs={1}>
              <CButton onClick={handleCancel} color="danger">
                Cancel
              </CButton>
            </CCol>
          </>
        )}
      </CCardBody>
    </CCard>
  )
}

export default EmployeeEdit
