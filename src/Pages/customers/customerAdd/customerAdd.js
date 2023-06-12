import React, { useEffect, useRef, useState } from 'react'
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
import { createCustomer } from '../../../Redux/CustomerSlice/customerSlice'
import { getCountries, getStates, getCities } from '../../../Redux/LocationSlice/locationSlice'
import phoneCodes from '../../../assets/js/phoneCodes'

const RandExp = require('randexp')

const CustomerAdd = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [validated, setValidated] = useState(false)
  const [phoneExample, setPhoneExample] = useState('')
  const [phoneRegex, setPhoneRegex] = useState(phoneCodes[49].regex)

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

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    street: '',
    country: '',
    state: '',
    city: '',
    zip: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
  })

  const [location, setLocation] = useState({
    country: '',
    state: '',
    city: '',
  })

  const [phoneCode, setPhoneCode] = useState('')

  const [FD, setFD] = useState(null)

  const [image, setImage] = useState(new File([], ''))

  useEffect(() => {
    dispatch(getCountries())
    setFD(new FormData(document.getElementById('customerAddForm')))
  }, [])

  // useEffect(() => {
  //   const form = document.getElementById('customerAddForm')
  //   form.addEventListener('keydown', handleKeyDown)
  //   return () => {
  //     form.removeEventListener('keydown', handleKeyDown)
  //   }
  // }, [formData])

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
    const randexp = new RandExp(new RegExp(phoneRegex))
    setPhoneExample(randexp.gen())
  }, [phoneRegex])

  const regexPatterns = {
    firstName: '^[A-Za-z]+$',
    lastName: '^[A-Za-z]+$',
    password: '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
    zip: '^(\\d{5}(?:[-\\s]\\d{4})?)?$',
  }

  // const handleInputChange = (event) => {
  //   console.log(FD.get('firstName'))
  //   const { name, value, files } = event.target
  //   if (name === 'image') {
  //     setImage(files[0])
  //   } else {
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       [name]: value,
  //     }))
  //   }
  // }

  const handleLocationChange = (event) => {
    const { name, value } = event.target
    setLocation((prevLocation) => ({
      ...prevLocation,
      [name]: value,
    }))
  }

  const handlePhoneInputChange = (event) => {
    setPhoneRegex(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()
    const form = event.currentTarget

    // if (form.checkValidity() === false) {
    // }

    if (form.checkValidity() === true) {
      // const formDataToSend = new FormData()
      // if (formData.dateOfBirth === '') {
      //   delete formData.dateOfBirth
      // }
      // if (formData.gender === '') {
      //   delete formData.gender
      // }
      // for (const [key, value] of Object.entries(formData)) {
      //   formDataToSend.append(key, value)
      // }
      // formDataToSend.append('image', image)
      // console.log(formDataToSend)

      const data = new FormData(event.target)
      console.log(data)
      dispatch(createCustomer(data)).then((res) => {
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
              feedbackInvalid="Enter a valid first name"
              name="firstName"
              id="firstName"
              pattern={regexPatterns.firstName}
              // value={formData.firstName}
              // onChange={handleInputChange}
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
              // value={formData.lastName}
              // onChange={handleInputChange}
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
                // value={formData.email}
                // onChange={handleInputChange}
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
                // value={formData.password}
                // onChange={handleInputChange}
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
              name="street"
              id="street"
              // value={formData.street}
              // onChange={handleInputChange}
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
            <CFormSelect name="city" id="city">
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
              pattern={regexPatterns.zip}
              // value={formData.zip}
              // onChange={handleInputChange}
            />
          </CCol>
          <CFormLabel htmlFor="phoneCode">Phone</CFormLabel>
          <CCol md={6} className="mt-0">
            <CFormSelect
              name="phoneCode"
              id="phoneCode"
              value={phoneRegex}
              onChange={handlePhoneInputChange}
            >
              {phoneCodes.map((item, index) => (
                <option key={`code_${index}`} value={item.regex}>
                  {`${item.country} (${item.code})`}
                </option>
              ))}
            </CFormSelect>
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
                pattern={phoneRegex}
                // value={formData.phoneNumber}
                // onChange={handleInputChange}
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
              // value={formData.dateOfBirth}
              // onChange={handleInputChange}
            />
          </CCol>
          <CCol md={6}>
            <CFormSelect
              label="Gender"
              name="gender"
              id="gender"
              // value={formData.gender}
              // onChange={handleInputChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </CFormSelect>
          </CCol>
          <CCol md={12}>
            <CFormInput
              type="file"
              name="image"
              label="Image"
              id="image"
              // onChange={handleInputChange}
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
