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

import { editCustomer } from '../../../Redux/CustomerSlice/customerSlice'
import { getCountries, getStates, getCities } from '../../../Redux/LocationSlice/locationSlice'
import phoneCodes from '../../../assets/js/phoneCodes'

const RandExp = require('randexp')

const CustomerEdit = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [validated, setValidated] = useState(false)
  const [phoneExample, setPhoneExample] = useState('')
  const customer = useSelector((state) => state.customer.customer)

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
    if (!customer.address) {
      toast.error(
        'Please navigate to this page from options on customer list page, you will be directed there',
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        },
      )
      setTimeout(() => {
        navigate('/customers')
      }, 7000)
    }
    dispatch(getCountries())
      .then(() => {
        dispatch(getStates({ country: customer.address?.country }))
      })
      .then(() => {
        dispatch(getCities({ country: customer.address?.country, state: customer.address?.state }))
      })
      .then(() => {
        setLocation({
          country: customer.address?.country,
          state: customer.address?.state,
          city: customer.address?.city,
        })
      })
      .catch((error) => {
        console.log(error)
      })

    const index = getPhoneCode()
    setPhone({
      code: phoneCodes[index].code,
      regex: phoneCodes[index].regex,
    })

    const form = document.getElementById('customerEditForm')
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

  const getPhoneCode = () => {
    return phoneCodes.findIndex((phoneCode) => {
      return phoneCode.code === customer.phoneCode
    })
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
    const form = document.getElementById('customerEditForm')
    const formData = new FormData(form)
    setValidated(true)

    if (validateAge(formData.get('dateOfBirth'))) {
      return toast.error('Invalid Date of Birth, customer must be at least 13 years old', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      })
    } else if (form.checkValidity() === true) {
      dispatch(editCustomer(formData)).then((res) => {
        navigate('/customers')
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
                Edit Customer
              </h3>
            </CCol>
          </CRow>
          <CForm
            id="customerEditForm"
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <CFormInput name="id" id="id" defaultValue={customer._id} hidden />
            <CFormLabel htmlFor="firstName">Name</CFormLabel>
            <CCol md={6} className="mt-0">
              <CFormInput
                type="text"
                placeholder="First name"
                feedbackInvalid="Enter a valid first name"
                name="firstName"
                id="firstName"
                defaultValue={customer.firstName}
                pattern={regexPatterns.firstName}
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
                defaultValue={customer.lastName}
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
                  feedbackInvalid="Enter a valid email address"
                  name="email"
                  id="email"
                  defaultValue={customer.email}
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
                  className="input-group-custom"
                />
              </CInputGroup>
            </CCol>
            <CFormLabel htmlFor="street">Address</CFormLabel>
            <CCol md={12} className="mt-0">
              <CFormInput
                type="text"
                placeholder="Street"
                name="street"
                id="street"
                defaultValue={customer.address?.street}
              />
            </CCol>
            <CCol md={6} lg={3}>
              <CFormSelect
                name="country"
                id="country"
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
              <CFormSelect name="city" id="city" defaultValue={customer.address?.city}>
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
                feedbackInvalid="Enter a valid zip code , eg. 12345 or 12345-6789"
                name="zip"
                id="zip"
                defaultValue={customer.address?.zip}
                pattern={regexPatterns.zip}
              />
            </CCol>
            <CFormLabel htmlFor="phoneCodeShown">Phone</CFormLabel>
            <CCol md={6} className="mt-0">
              <CFormSelect
                name="phoneCodeShown"
                id="phoneCodeShown"
                defaultValue={getPhoneCode()}
                onChange={handlePhoneInputChange}
              >
                <option value="">Select Phone Code</option>
                {phoneCodes.map((item, index) => (
                  <option key={`code_${index}`} value={index}>
                    {`${item.country} (${item.code})`}
                  </option>
                ))}
              </CFormSelect>
              <CFormInput name="phoneCode" id="phoneCode" defaultValue={phone.code} hidden />
            </CCol>
            <CCol md={6} className="mt-0">
              <CInputGroup>
                <CInputGroupText>
                  <i className="pi pi-phone"></i>
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder={`eg. ${phoneExample}`}
                  feedbackInvalid={`Enter a valid phone number (eg. ${phoneExample})`}
                  name="phoneNumber"
                  id="phoneNumber"
                  defaultValue={customer.phoneNumber}
                  pattern={phone.regex}
                  className="input-group-custom mt-3 mt-md-0"
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="date"
                label="Date of Birth"
                id="dateOfBirth"
                name="dateOfBirth"
                defaultValue={customer.dateOfBirth?.split('T')[0]}
              />
            </CCol>
            <CCol md={6}>
              <CFormSelect label="Gender" name="gender" id="gender" defaultValue={customer.gender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </CFormSelect>
            </CCol>
            <CCol md={12}>
              <CFormInput type="file" name="image" label="Image" id="image" />
            </CCol>
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
      <ToastContainer></ToastContainer>
    </>
  )
}

export default CustomerEdit
