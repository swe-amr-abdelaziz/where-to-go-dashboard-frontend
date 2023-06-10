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

const VendorAdd = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [validated, setValidated] = useState(false)

  useEffect(() => {
    getCategories()
  }, [])
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
        .post('http://localhost:8001/api/v1/vendors', data)
        .then((res) => console.log(res))
        .catch((error) => console.log(error))
    }
  }

  const handleBack = () => {
    navigate('/vendors')
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="m-3 mb-5 p-4 shadow">
          <CCardBody>
            <h3 className="mb-4 mt-2">New Vendor</h3>
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
                  feedbackInvalid="Please Enter Owner Last Name"
                  name={'firstName'}
                  required
                />
                <CFormInput
                  className="ms-2"
                  type="text"
                  placeholder="Last Name"
                  feedbackInvalid="Please Enter Owner First Name"
                  name={'lastName'}
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
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel>Category</CFormLabel>
                <CFormSelect
                  name={'category'}
                  feedbackInvalid="Please choose Country"
                  className="me-2"
                  required
                >
                  <option disabled>--- Select Category ---</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormLabel>Tags</CFormLabel>
                <CFormInput
                  className="me-2"
                  type="text"
                  placeholder="Tags"
                  feedbackInvalid="Please enter Tags"
                  name={'tags'}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel>Location</CFormLabel>
                <CFormInput
                  className="me-2"
                  type="text"
                  placeholder="Street"
                  feedbackInvalid="Please enter Street"
                  name={'street'}
                  required
                />
                <div className="mb-3 d-flex my-3">
                  <CFormSelect
                    name={'country'}
                    feedbackInvalid="Please choose Country"
                    className="me-2"
                    required
                  >
                    <option disabled>Country</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </CFormSelect>
                  <CFormSelect
                    name={'governorate'}
                    feedbackInvalid="Please choose Governorate"
                    className="mx-2"
                    required
                  >
                    <option disabled>Governorate</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3" disabled>
                      Three
                    </option>
                  </CFormSelect>
                  <CFormInput
                    className="mx-2"
                    type="text"
                    placeholder="City"
                    feedbackInvalid="Please enter City"
                    name={'city'}
                    required
                  />
                  <CFormInput
                    className="ms-2"
                    type="text"
                    placeholder="Postal Code"
                    feedbackInvalid="Please enter Postal Code"
                    name={'zip'}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <CFormLabel>Contact Number</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Contact Number"
                  feedbackValid="Looks good!"
                  feedbackInvalid="Please enter Phone Number"
                  name={'phoneNumber'}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Email address</CFormLabel>
                <CFormInput
                  type="email"
                  id="exampleFormControlInput1"
                  placeholder="Enter Your Email"
                  feedbackInvalid="Please enter Email"
                  name={'email'}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Description</CFormLabel>
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  rows="5"
                  name={'description'}
                  feedbackInvalid="Please provide Some Description"
                  required
                ></CFormTextarea>
              </div>
              <div className="mb-3">
                <CFormLabel>Thumbnail</CFormLabel>
                {/* <CFormInput
                  type="file"
                  aria-describedby="validationCustom05Feedback"
                  feedbackInvalid="Please provide a valid image."
                  id="validationCustom05"
                  name={'thumbnail'}
                  required
                /> */}
                {/* <CFormInput
                  type="file"
                  feedbackInvalid="Upload Thumbnail"
                  name={'thumbnail'}
                  required
                /> */}
                <UploadImage
                  name={'thumbnail'}
                  content={'thumbnail'}
                  feedbackInvalid="Please provide a Thumbnail Image"
                  required
                ></UploadImage>
              </div>
              <div className="mb-3">
                <CFormLabel>Gallery</CFormLabel>
                {/* <CFormInput
                  type="file"
                  aria-describedby="validationCustom05Feedback"
                  feedbackInvalid="Please provide a valid image."
                  id="validationCustom05"
                  name={'gallery'}
                  required
                /> */}
                {/* <CFormInput
                  type="file"
                  feedbackInvalid="Upload Gallery"
                  name={'gallery'}
                  required
                /> */}
                <UploadImage
                  name={'gallery'}
                  content={'gallery'}
                  feedbackValid="Please provide Gallery Images"
                  required
                ></UploadImage>
              </div>
              <div>
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

export default VendorAdd
