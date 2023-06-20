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
  const [validationFromBackEnd, setValidationFromBackEnd] = useState({
    name: {
      notValid: false,
      msg: 'Please Enter Owner Last Name',
    },
    email: {
      notValid: false,
      msg: 'Please Provide Email',
    },
    password: {
      notValid: false,
      msg: 'Please Provide password',
    },
    salary: {
      notValid: false,
      msg: 'Please Provide Salary',
    },
    gender: {
      notValid: false,
      msg: 'Please Provide Gender',
    },
    role: {
      notValid: false,
      msg: 'Please Provide role',
    },
    country: {
      notValid: false,
      msg: 'Please Enter Place Country',
    },
    city: {
      notValid: false,
      msg: 'Please Enter Place City',
    },
    street: {
      notValid: false,
      msg: 'Please Enter Place Street',
    },
    phoneNumer: {
      notValid: false,
      msg: 'Please Provide Thumbnail Image For The Place',
    },
    dateOfBirth: {
      notValid: false,
      msg: 'Please Choose Date Of Birth',
    },
    hireDate: {
      notValid: false,
      msg: 'Please Choose Hiring Date',
    },
    image: {
      notValid: false,
      msg: 'Please Provide Image',
    },
  })
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
        if (!res.payload.errors) {
          navigate('/employees')
        } else if (res.payload.errors) {
          const errors = res.payload.errors
          let tempError = {}
          errors.forEach((error) => {
            if (error.path === 'name') {
              tempError.name = {
                notValid: true,
                msg: error.msg,
              }
            }
            if (error.path === 'email') {
              tempError.email = {
                notValid: true,
                msg: error.msg,
              }
            }
            if (error.path === 'password') {
              tempError.password = {
                notValid: true,
                msg: error.msg,
              }
            }
            if (error.path === 'salary') {
              tempError.salary = {
                notValid: true,
                msg: error.msg,
              }
            }
            if (error.path === 'gender') {
              tempError.gender = {
                notValid: true,
                msg: error.msg,
              }
            }
            if (error.path === 'role') {
              tempError.role = {
                notValid: true,
                msg: error.msg,
              }
            }
            if (error.path === 'country') {
              tempError.country = {
                notValid: true,
                msg: error.msg,
              }
            }
            if (error.path === 'city') {
              tempError.city = {
                notValid: true,
                msg: error.msg,
              }
            }
            if (error.path === 'street') {
              tempError.street = {
                notValid: true,
                msg: error.msg,
              }
            }
            if (error.path === 'phoneNumber') {
              tempError.phoneNumber = {
                notValid: true,
                msg: error.msg,
              }
            }
            if (error.path === 'dateOfBirth') {
              tempError.dateOfBirth = {
                notValid: true,
                msg: error.msg,
              }
            }
            if (error.path === 'hireDate') {
              tempError.hireDate = {
                notValid: true,
                msg: error.msg,
              }
            }
            if (error.path === 'image') {
              tempError.image = {
                notValid: true,
                msg: error.msg,
              }
            }
          })
          setValidationFromBackEnd(tempError)
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
                invalid={validationFromBackEnd.name?.notValid}
                feedbackInvalid={validationFromBackEnd.name?.msg || 'Please Enter Your Name '}
                name={'name'}
                defaultValue={employee.name}
                required
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="email"
                feedbackValid="Looks good!"
                invalid={validationFromBackEnd.email?.notValid}
                feedbackInvalid={validationFromBackEnd.email?.msg || 'Please Provide Email '}
                id="validationCustom02"
                label="Email"
                name={'email'}
                defaultValue={employee.email}
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
                type="number"
                aria-describedby="validationCustom03Feedback"
                id="validationCustom03"
                invalid={validationFromBackEnd.salary?.notValid}
                feedbackInvalid={validationFromBackEnd.salary?.msg || 'Please Provide Salary '}
                label="Salary"
                name={'salary'}
                defaultValue={employee.salary}
                required
              />
            </CCol>
            <CCol md={4}>
              <CFormSelect
                aria-describedby="validationCustom04Feedback"
                id="validationCustom04"
                label="Gender"
                invalid={validationFromBackEnd.gender?.notValid}
                feedbackInvalid={validationFromBackEnd.gender?.msg || 'Please Choose Gender '}
                name={'gender'}
                defaultValue={employee.gender}
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
                id="validationCustom04"
                label="Role"
                name={'role'}
                invalid={validationFromBackEnd.role?.notValid}
                feedbackInvalid={validationFromBackEnd.role?.msg || 'Please Provide Role '}
                defaultValue={employee.role}
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
                id="validationCustom03"
                label="Country"
                name={'country'}
                invalid={validationFromBackEnd.country?.notValid}
                feedbackInvalid={validationFromBackEnd.country?.msg || 'Please Provide Country '}
                defaultValue={employee.address.country}
                required
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="text"
                aria-describedby="validationCustom03Feedback"
                id="validationCustom03"
                label="City"
                invalid={validationFromBackEnd.city?.notValid}
                feedbackInvalid={validationFromBackEnd.city?.msg || 'Please Provide City '}
                name={'city'}
                defaultValue={employee.address.city}
                required
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="text"
                aria-describedby="validationCustom05Feedback"
                invalid={validationFromBackEnd.street?.notValid}
                feedbackInvalid={validationFromBackEnd.street?.msg || 'Please Provide Street '}
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
                id="validationCustom05"
                label="Phone"
                invalid={validationFromBackEnd.phoneNumer?.notValid}
                feedbackInvalid={
                  validationFromBackEnd.phoneNumer?.msg || 'Please Provide Phone Number '
                }
                name={'phoneNumber'}
                defaultValue={employee.phoneNumber}
                required
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="date"
                aria-describedby="validationCustom05Feedback"
                id="validationCustom05"
                label="Date of Birth"
                invalid={validationFromBackEnd.dateOfBirth?.notValid}
                feedbackInvalid={
                  validationFromBackEnd.dateOfBirth?.msg || 'Please Provide Date Of Birth '
                }
                name={'dateOfBirth'}
                defaultValue={new Date(employee.dateOfBirth).toISOString().split('T')[0]}
                required
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="date"
                aria-describedby="validationCustom05Feedback"
                invalid={validationFromBackEnd.hireDate?.notValid}
                feedbackInvalid={validationFromBackEnd.hireDate?.msg || 'Please Provide Hire Date '}
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
                id="validationCustom05"
                label="image"
                invalid={validationFromBackEnd.image?.notValid}
                feedbackInvalid={validationFromBackEnd.image?.msg || 'Please Provide Image '}
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
