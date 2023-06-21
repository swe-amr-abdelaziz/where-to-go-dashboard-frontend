import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CFormSelect,
  CRow,
} from '@coreui/react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from 'src/Axios'
import axios from 'axios'
import { Multiselect } from 'multiselect-react-dropdown'
import { getCountries, getStates, getCities } from '../../../Redux/LocationSlice/locationSlice'
import { useDispatch, useSelector } from 'react-redux'

const VendorEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [validated, setValidated] = useState(false)
  const countries = useSelector((state) => state.location.countries)
  const states = useSelector((state) => state.location.states)
  const cities = useSelector((state) => state.location.cities)
  const [categories, setCategories] = useState([])
  const [validationFromBackEnd, setValidationFromBackEnd] = useState({
    firstName: {
      notValid: false,
      msg: 'Please Enter Owner First Name',
    },
    lastName: {
      notValid: false,
      msg: 'Please Enter Owner Last Name',
    },
    placeName: {
      notValid: false,
      msg: 'Please enter Place Name',
    },
    category: {
      notValid: false,
      msg: 'Please Select Category',
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
    email: {
      notValid: false,
      msg: 'Please Provide Email',
    },
    description: {
      notValid: false,
      msg: 'Please Provide Thumbnail Image For The Place',
    },
    thumbnail: {
      notValid: false,
      msg: 'Please Provide Thumbnail Image For The Place',
    },
    gallery: {
      notValid: false,
      msg: 'Please Provide Gallery Images For The Place',
    },
  })
  const [vendorData, setVendorData] = useState({
    firstName: '',
    lastName: '',
    placeName: '',
    category: '',
    tags: [],
    country: '',
    state: '',
    city: '',
    street: '',
    zip: '',
    phoneNumber: '',
    email: '',
    description: '',
    thumbnail: '',
    gallery: '',
  })

  useEffect(() => {
    dispatch(getCountries())
    getCategories()
    getCurrentVendor()
  }, [])

  useEffect(() => {
    if (vendorData.country) {
      dispatch(getStates({ country: vendorData.country }))
    }
  }, [vendorData.country])

  useEffect(() => {
    if (vendorData.country && vendorData.state) {
      dispatch(getCities({ country: vendorData.country, state: vendorData.state }))
    }
  }, [vendorData.state])

  const getCurrentVendor = async () => {
    try {
      const response = await axiosInstance.get(`api/v1/Vendors/${id}`)
      const data = response.data.data
      if (data) {
        setVendorData((prevData) => ({
          ...prevData,
          ...data,
          country: data.address.country,
          state: data.address.state,
          street: data.address.street,
          city: data.address.city,
          zip: data.address.zip,
        }))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setVendorData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const getCategories = async () => {
    try {
      const res = await axiosInstance.get('api/v1/categories')
      setCategories(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      return setValidated(true)
    }
    const data = new FormData(form)
    console.log('i am here')
    axiosInstance
      .patch(`/api/v1/vendors/${id}`, data)
      .then((res) => navigate('/vendors'))
      .catch((error) => {
        console.log(error)
        const errors = error.response.data.errors
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
          if (error.path === 'placeName') {
            tempError.placeName = {
              notValid: true,
              msg: error.msg,
            }
          }
          if (error.path === 'category') {
            tempError.category = {
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
          if (error.path === 'email') {
            tempError.email = {
              notValid: true,
              msg: error.msg,
            }
          }
          if (error.path === 'description') {
            tempError.description = {
              notValid: true,
              msg: error.msg,
            }
          }
          if (error.path === 'thumbnail') {
            tempError.thumbnail = {
              notValid: true,
              msg: error.msg,
            }
          }
          if (error.path === 'gallery') {
            tempError.gallery = {
              notValid: true,
              msg: error.msg,
            }
          }
        })
        setValidationFromBackEnd(tempError)
      })
  }

  const handleBack = () => {
    navigate('/vendors')
  }

  const regexPatterns = {
    firstName: '^[A-Za-z]+$',
    lastName: '^[A-Za-z]+$',
    password: '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
    zip: '^(\\d{5}(?:[-\\s]\\d{4})?)?$',
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="m-3 mb-5 p-4 shadow">
          <CCardBody>
            <h3 className="mb-4 mt-2">Edit Vendor</h3>
            <CForm
              encType="multipart/form-data"
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CFormLabel>Owner</CFormLabel>
              <div>
                <CFormInput
                  type="text"
                  placeholder="First Name"
                  // pattern={regexPatterns.firstName}
                  invalid={validationFromBackEnd.firstName?.notValid}
                  feedbackInvalid={
                    validationFromBackEnd.firstName?.msg || 'Please Enter Owner First Name '
                  }
                  name={'firstName'}
                  value={vendorData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <CFormInput
                  type="text"
                  placeholder="Last Name"
                  invalid={validationFromBackEnd.lastName?.notValid}
                  // pattern={regexPatterns.lastName}
                  feedbackInvalid={
                    validationFromBackEnd.lastName?.msg || 'Please Enter Owner First Name '
                  }
                  name={'lastName'}
                  value={vendorData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel>Place Name</CFormLabel>
                <CFormInput
                  className="me-2"
                  type="text"
                  placeholder="Place Name"
                  invalid={validationFromBackEnd.placeName?.notValid}
                  feedbackInvalid={
                    validationFromBackEnd.placeNam?.msg || 'Please Enter Owner First Name '
                  }
                  name={'placeName'}
                  value={vendorData.placeName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel>Category</CFormLabel>
                <CFormSelect
                  name={'category'}
                  invalid={validationFromBackEnd.category?.notValid}
                  feedbackInvalid={
                    validationFromBackEnd.category?.msg || 'Please Enter Owner First Name '
                  }
                  className="me-2"
                  value={vendorData.country}
                  onChange={handleInputChange}
                  required
                >
                  <option key={'selectCategory_ca'} disabled>
                    Select Category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormLabel>Location</CFormLabel>
                <CFormInput
                  className="me-2"
                  type="text"
                  placeholder="Street"
                  invalid={validationFromBackEnd.street?.notValid}
                  feedbackInvalid={
                    validationFromBackEnd.street?.msg || 'Please Enter Owner First Name '
                  }
                  name={'street'}
                  value={vendorData.street}
                  onChange={handleInputChange}
                  required
                />
                <div className="mb-3 d-flex my-3">
                  <CFormSelect
                    name={'country'}
                    invalid={validationFromBackEnd.country?.notValid}
                    feedbackInvalid={validationFromBackEnd.country?.msg || 'Please country '}
                    className="me-2"
                    value={vendorData.country}
                    onChange={handleInputChange}
                    required
                  >
                    <option key={'selectCountry_co'} disabled>
                      ---- Select Country ----
                    </option>
                    {countries.map((country) => (
                      <option key={country.iso3} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </CFormSelect>

                  <CFormSelect
                    name={'state'}
                    invalid={validationFromBackEnd.state?.notValid}
                    feedbackInvalid={
                      validationFromBackEnd.state?.msg || 'Please choose Governorate '
                    }
                    className="mx-2"
                    value={vendorData.state}
                    onChange={handleInputChange}
                    required
                  >
                    <option key={'selectState_s'} disabled>
                      Select State
                    </option>
                    {states.map((state) => (
                      <option key={state.state_code} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </CFormSelect>

                  <CFormSelect
                    name="city"
                    value={vendorData.city}
                    invalid={validationFromBackEnd.city?.notValid}
                    feedbackInvalid={validationFromBackEnd.city?.msg || 'Please Select City '}
                    onChange={handleInputChange}
                    className="mx-2"
                  >
                    <option key={'selectCity_c'} disabled>
                      Select City
                    </option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </CFormSelect>
                  <CCol md={6} lg={3} className="ms-2">
                    <CFormInput
                      type="text"
                      placeholder="eg. 12345 or 12345-6789"
                      name={'zip'}
                      invalid={validationFromBackEnd.zip?.notValid}
                      feedbackInvalid={validationFromBackEnd.zip?.msg || 'Enter a valid zip code'}
                      value={vendorData.zip}
                      onChange={handleInputChange}
                      // pattern={regexPatterns.zip}
                    />
                  </CCol>
                </div>
              </div>
              <div className="mb-3">
                <CFormLabel>Contact Number</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Contact Number"
                  name={'phoneNumber'}
                  invalid={validationFromBackEnd.phoneNumber?.notValid}
                  feedbackInvalid={
                    validationFromBackEnd.phoneNumber?.msg || 'Please enter Phone Number'
                  }
                  value={vendorData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel>Email address</CFormLabel>
                <CFormInput
                  type="email"
                  placeholder="Enter Your Email"
                  name={'email'}
                  value={vendorData.email}
                  invalid={validationFromBackEnd.email?.notValid}
                  feedbackInvalid={validationFromBackEnd.email?.msg || 'Please enter Email'}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel>Description</CFormLabel>
                <CFormTextarea
                  rows="5"
                  name={'description'}
                  invalid={validationFromBackEnd.description?.notValid}
                  feedbackInvalid={
                    validationFromBackEnd.description?.msg || 'Please provide Some Description '
                  }
                  value={vendorData.description}
                  onChange={handleInputChange}
                  required
                ></CFormTextarea>
              </div>
              <div className="mb-3">
                <CFormLabel>Thumbnail</CFormLabel>
                <CFormInput
                  type="file"
                  name={'thumbnail'}
                  invalid={validationFromBackEnd.thumbnail?.notValid}
                  feedbackInvalid={
                    validationFromBackEnd.thumbnail?.msg || 'Please provide a valid image.'
                  }
                  required
                />
                {/* <UploadImage
                  name={'thumbnail'}
                  content={'thumbnail'}
                  feedbackInvalid="Please provide a Thumbnail Image"
                  required
                ></UploadImage> */}
              </div>
              <div className="mb-3">
                <CFormLabel>Gallery</CFormLabel>
                <CFormInput
                  type="file"
                  aria-describedby="validationCustom05Feedback"
                  id="validationCustom05"
                  name={'gallery'}
                  invalid={validationFromBackEnd.gallery?.notValid}
                  feedbackInvalid={
                    validationFromBackEnd.gallery?.msg || 'Please provide a valid image.'
                  }
                  multiple
                  required
                />
                {/* <UploadImage
                  name={'gallery'}
                  content={'gallery'}
                  feedbackValid="Please provide Gallery Images"
                  required
                ></UploadImage> */}
              </div>
              <div className="text-end">
                <CButton className="bg-base" type="submit">
                  Submit
                </CButton>
                <CButton onClick={handleBack} className="bg-secondary ms-3">
                  Back
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default VendorEdit
