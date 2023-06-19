import React, { useEffect, useState } from 'react'
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
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { createCustomer } from '../../../Redux/CustomerSlice/customerSlice'
import { getCountries, getStates, getCities } from '../../../Redux/LocationSlice/locationSlice'
import phoneCodes from '../../../assets/js/phoneCodes'

const RandExp = require('randexp')

const CustomerAdd = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [validationFromBackEnd, setValidationFromBackEnd] = useState({
    firstName: {
      notValid: false,
      msg: 'Please Enter Your First Name',
    },
    lastName: {
      notValid: false,
      msg: 'Please Enter Your First Name',
    },
    email: {
      notValid: false,
      msg: 'Please Provide Email',
    },
    password: {
      notValid: false,
      msg: 'Please Provide Password',
    },
    street: {
      notValid: false,
      msg: 'Please Enter Place Street',
    },
    country: {
      notValid: false,
      msg: 'Please Enter Place Country',
    },
    state: {
      notValid: false,
      msg: 'Please Enter Place State',
    },
    city: {
      notValid: false,
      msg: 'Please Enter Place City',
    },
    zip: {
      notValid: false,
      msg: 'Please Enter Place Postal Code',
    },
    phonNumber: {
      notValid: false,
      msg: 'Please Contact Number',
    },
    dateOfBirth: {
      notValid: false,
      msg: 'Please Provide Date Of Birth',
    },
    gender: {
      notValid: false,
      msg: 'Please Enter Your Gender',
    },
    image: {
      notValid: false,
      msg: 'Please Provide Image',
    },
  })

  const [validated, setValidated] = useState(false)
  const [phoneExample, setPhoneExample] = useState('')

  const countries = useSelector((state) => state.location.countries)
  const states = useSelector((state) => state.location.states)
  const cities = useSelector((state) => state.location.cities)

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      handleSubmit(event)
    }
  }

  const [location, setLocation] = useState({
    country: '',
    state: '',
    city: '',
  })

  const [phone, setPhone] = useState({
    code: '',
    regex: '',
  })

  useEffect(() => {
    dispatch(getCountries())
  }, [])

  useEffect(() => {
    const form = document.getElementById('customerAddForm')
    form.addEventListener('keydown', handleKeyDown)
    return () => {
      form.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    if (location.country) {
      dispatch(getStates({ country: location.country }))
    }
  }, [location.country])

  useEffect(() => {
    if (location.country && location.state) {
      dispatch(getCities({ country: location.country, state: location.state }))
    }
  }, [location.state])

  useEffect(() => {
    const randexp = new RandExp(new RegExp(phone.regex))
    setPhoneExample(randexp.gen())
  }, [phone.regex])

  const regexPatterns = {
    firstName: '^[A-Za-z]+$',
    lastName: '^[A-Za-z]+$',
    password: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#^])[A-Za-z\\d@$!%*?&#^]{8,}$',
    zip: '^(?:\\d{5}(?:-\\d{4})?|)$',
  }

  const handleLocationChange = (event) => {
    const { name, value } = event.target
    setLocation((prevLocation) => ({
      ...prevLocation,
      [name]: value,
    }))
  }

  const handlePhoneInputChange = (event) => {
    const { code, regex } = phoneCodes[event.target.value]
    setPhone({ code, regex })
  }

  const validateAge = (dateOfBirth) => {
    // Get the current date
    const today = new Date()

    // Subtract 13 years from the current date
    const dateToCompare = new Date()
    dateToCompare.setFullYear(today.getFullYear() - 13)
    dateToCompare.setMonth(today.getMonth(), today.getDate())
    dateToCompare.setDate(today.getDate())

    return new Date(dateOfBirth) > dateToCompare
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()
    const form = document.getElementById('customerAddForm')
    const formData = new FormData(form)
    setValidated(true)

    if (validateAge(formData.get('dateOfBirth'))) {
      return toast.error('Invalid Date of Birth, customer must be at least 13 years old', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      })
    } else if (form.checkValidity() === true) {
      dispatch(createCustomer(formData)).then((res) => {
        console.log(res.payload)
        if (!res.payload.errors) {
          navigate('/customers')
        } else if (res.payload.errors) {
          const errors = res.payload.errors
          let tempError = {}
          errors.forEach((error) => {
            if (error.path === 'firstName') {
              tempError.firstName = {
                notValid: true,
                msg: error.msg,
              }
            }
            if (error.path === 'lastName') {
              tempError.lastName = {
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
            if (error.path === 'street') {
              tempError.street = {
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
            if (error.path === 'state') {
              tempError.state = {
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
            if (error.path === 'zip') {
              tempError.zip = {
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
            if (error.path === 'gender') {
              tempError.gender = {
                notValid: true,
                msg: error.msg,
              }
            }
            if (error.path === 'image') {
              tempError.thumbnail = {
                notValid: true,
                msg: error.msg,
              }
            }
          })
          setValidationFromBackEnd(tempError)
          console.log(res.payload.errors)
        }
      })
    }
  }

  return (
    <>
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
            id="customerAddForm"
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
                invalid={validationFromBackEnd.firstName?.notValid}
                feedbackInvalid={validationFromBackEnd.firstName?.msg || 'Please Enter First Name '}
                name="firstName"
                id="firstName"
                pattern={regexPatterns.firstName}
                required
              />
            </CCol>
            <CCol md={6} className="mt-0">
              <CFormInput
                type="text"
                placeholder="Last name"
                invalid={validationFromBackEnd.lastName?.notValid}
                feedbackInvalid={validationFromBackEnd.lastName?.msg || 'Please Enter Last Name '}
                name="lastName"
                id="lastName"
                pattern={regexPatterns.lastName}
                required
                className="mt-3 mt-md-0"
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
                  invalid={validationFromBackEnd.email?.notValid}
                  feedbackInvalid={validationFromBackEnd.email?.msg || 'Please Enter Email '}
                  name="email"
                  id="email"
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
                  invalid={validationFromBackEnd.password?.notValid}
                  feedbackInvalid={
                    validationFromBackEnd.password?.msg || 'Please Provide A Password'
                  }
                  name="password"
                  id="password"
                  pattern={regexPatterns.password}
                  required
                  className="input-group-custom"
                />
              </CInputGroup>
            </CCol>
            <CFormLabel htmlFor="street">Address</CFormLabel>
            <CCol md={12} className="mt-0">
              <CFormInput
                type="text"
                invalid={validationFromBackEnd.country?.notValid}
                feedbackInvalid={
                  validationFromBackEnd.country?.msg || 'Please Provide Your Street '
                }
                placeholder="Street"
                name="street"
                id="street"
              />
            </CCol>
            <CCol md={6} lg={3}>
              <CFormSelect
                name="country"
                id="country"
                invalid={validationFromBackEnd.country?.notValid}
                feedbackInvalid={
                  validationFromBackEnd.country?.msg || 'Please Choose Your Country '
                }
                value={location.country}
                onChange={handleLocationChange}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.Iso3} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={6} lg={3}>
              <CFormSelect
                name="state"
                id="state"
                invalid={validationFromBackEnd.state?.notValid}
                feedbackInvalid={validationFromBackEnd.state?.msg || 'Please Choose Your State '}
                value={location.state}
                onChange={handleLocationChange}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.state_code} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={6} lg={3}>
              <CFormSelect
                invalid={validationFromBackEnd.city?.notValid}
                feedbackInvalid={validationFromBackEnd.city?.msg || 'Please Choose Your City '}
                name="city"
                id="city"
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={6} lg={3}>
              <CFormInput
                type="text"
                placeholder="Zip Code"
                invalid={validationFromBackEnd.zip?.notValid}
                feedbackInvalid={
                  validationFromBackEnd.zip?.msg || 'Please Provide Your Location Postal Code'
                }
                name="zip"
                id="zip"
                pattern={regexPatterns.zip}
              />
            </CCol>
            <CFormLabel htmlFor="phoneCodeShown">Phone</CFormLabel>
            <CCol md={6} className="mt-0">
              <CFormSelect
                name="phoneCodeShown"
                id="phoneCodeShown"
                onChange={handlePhoneInputChange}
              >
                <option value="">Select Phone Code</option>
                {phoneCodes.map((item, index) => (
                  <option key={`code_${index}`} value={index}>
                    {`${item.country} (${item.code})`}
                  </option>
                ))}
              </CFormSelect>
              <CFormInput name="phoneCode" id="phoneCode" value={phone.code} hidden />
            </CCol>
            <CCol md={6} className="mt-0">
              <CInputGroup>
                <CInputGroupText>
                  <i className="pi pi-phone"></i>
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder={`eg. ${phoneExample}`}
                  invalid={validationFromBackEnd.phoneNumber?.notValid}
                  feedbackInvalid={
                    validationFromBackEnd.phoneNumber?.msg || 'Please Provide Phone Number '
                  }
                  name="phoneNumber"
                  id="phoneNumber"
                  // pattern={phone.regex}
                  className="input-group-custom mt-3 mt-md-0"
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="date"
                invalid={validationFromBackEnd.dateOfBirth?.notValid}
                feedbackInvalid={
                  validationFromBackEnd.dateOfBirth?.msg || 'Please Choose Ypur Date Of Birth '
                }
                label="Date of Birth"
                id="dateOfBirth"
                name="dateOfBirth"
              />
            </CCol>
            <CCol md={6}>
              <CFormSelect
                label="Gender"
                invalid={validationFromBackEnd.gender?.notValid}
                feedbackInvalid={validationFromBackEnd.gender?.msg || 'Please Choose The Gender'}
                name="gender"
                id="gender"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </CFormSelect>
            </CCol>
            <CCol md={12}>
              <CFormInput
                type="file"
                invalid={validationFromBackEnd.image?.notValid}
                feedbackInvalid={
                  validationFromBackEnd.image?.msg || 'Please Provide Us With Image '
                }
                name="image"
                label="Image"
                id="image"
              />
            </CCol>
            <CCol xs={12} className="d-flex justify-content-end mt-5">
              <CButton
                className="bg-secondary me-3"
                type="submit"
                onClick={() => navigate('/customers')}
              >
                Back
              </CButton>
              <CButton className="bg-base" onClick={handleSubmit}>
                Submit
              </CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
      <ToastContainer></ToastContainer>
    </>
  )
}

export default CustomerAdd
