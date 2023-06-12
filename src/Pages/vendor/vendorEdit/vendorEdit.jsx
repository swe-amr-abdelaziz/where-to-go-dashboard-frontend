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
import UploadImage from '../../../components/uploadImage/uploadImage'
import { useNavigate } from 'react-router-dom'
import axiosInstance from 'src/Axios'
import axios from 'axios'
import { Multiselect } from 'multiselect-react-dropdown'
import { getCountries, getStates, getCities } from '../../../Redux/LocationSlice/locationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const VendorEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [validated, setValidated] = useState(false)
  const countries = useSelector((state) => state.location.countries)
  const states = useSelector((state) => state.location.states)
  const cities = useSelector((state) => state.location.cities)
  const [categories, setCategories] = useState([])
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
    const data = await axiosInstance.get(`api/v1/Vendors/${id}`)
    console.log(data.data.data)
    if (data.data) {
      setVendorData({
        ...data.data.data,
        country: data.data.data.address.country,
        state: data.data.data.address.state,
        street: data.data.data.address.street,
        city: data.data.data.address.city,
      })
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setVendorData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const getCategories = async () => {
    try {
      let res = await axiosInstance.get('api/v1/categories')

      setCategories(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

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

      axios
        .patch(`http://localhost:8001/api/v1/vendors/${id}`, data)
        .then((res) => navigate('/vendors'))
        .catch((error) => console.log(error))
    }
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
              <div className="mb-3 d-flex">
                <CFormInput
                  className="me-2"
                  type="text"
                  placeholder="First Name"
                  pattern={regexPatterns.firstName}
                  feedbackInvalid="Please Enter Owner Last Name"
                  name={'firstName'}
                  value={vendorData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <CFormInput
                  className="ms-2"
                  type="text"
                  placeholder="Last Name"
                  pattern={regexPatterns.lastName}
                  feedbackInvalid="Please Enter Owner First Name"
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
                  feedbackInvalid="Please enter Place Name"
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
                  feedbackInvalid="Please choose Category"
                  className="me-2"
                  value={vendorData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option disabled>Select Category</option>
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
                  feedbackInvalid="Please enter Street"
                  name={'street'}
                  value={vendorData.street}
                  onChange={handleInputChange}
                  required
                />
                <div className="mb-3 d-flex my-3">
                  <CFormSelect
                    name={'country'}
                    feedbackInvalid="Please choose Country"
                    className="me-2"
                    value={vendorData.country}
                    onChange={handleInputChange}
                    required
                  >
                    <option disabled>---- Select Country ----</option>
                    {countries.map((country) => (
                      <option key={country.iso3} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </CFormSelect>

                  <CFormSelect
                    name={'state'}
                    feedbackInvalid="Please choose Governorate"
                    className="mx-2"
                    value={vendorData.state}
                    onChange={handleInputChange}
                    required
                  >
                    <option disabled>Select State</option>
                    {states.map((state) => (
                      <option key={state.state_code} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </CFormSelect>

                  <CFormSelect
                    name="city"
                    value={vendorData.city}
                    onChange={handleInputChange}
                    className="mx-2"
                  >
                    <option disabled>Select City</option>
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
                      feedbackInvalid="Enter a valid zip code"
                      name={'zip'}
                      value={vendorData.zip}
                      onChange={handleInputChange}
                      pattern={regexPatterns.zip}
                    />
                  </CCol>
                </div>
              </div>
              <div className="mb-3">
                <CFormLabel>Contact Number</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Contact Number"
                  feedbackInvalid="Please enter Phone Number"
                  name={'phoneNumber'}
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
                  feedbackInvalid="Please enter Email"
                  name={'email'}
                  value={vendorData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel>Description</CFormLabel>
                <CFormTextarea
                  rows="5"
                  name={'description'}
                  value={vendorData.description}
                  onChange={handleInputChange}
                  feedbackInvalid="Please provide Some Description"
                  required
                ></CFormTextarea>
              </div>
              <div className="mb-3">
                <CFormLabel>Thumbnail</CFormLabel>
                <CFormInput
                  type="file"
                  aria-describedby="validationCustom05Feedback"
                  feedbackInvalid="Please provide a valid image."
                  name={'thumbnail'}
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
                  feedbackInvalid="Please provide a valid image."
                  id="validationCustom05"
                  name={'gallery'}
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
