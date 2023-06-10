import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCol, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from 'src/Axios'

const CategoryAdd = () => {
  const navigate = useNavigate()
  const [validated, setValidated] = useState(false)
  const [categoryObject, setCategoryObject] = useState(new FormData())

  const handleChange = (e) => {
    setCategoryObject({ [e.target.name]: e.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)
    if (form.checkValidity() === true) {
      const data = new FormData(event.target)
      axiosInstance
        .post('/api/v1/categories', data)
        .then((res) => {})
        .catch((error) => console.log(error))
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="m-3 mb-5 p-4 shadow">
          <CCardBody>
            <h3 className="mb-4 mt-2">New Category</h3>
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Category Name"
                feedbackInvalid="Please enter Category Name"
                name="name"
                onChange={handleChange}
                required
              />
              <div className="mb-3">
                {/* <CFormLabel htmlFor="exampleFormControlTextarea1">Thumbnail</CFormLabel>
                <UploadImage
                  name={'thumbnail'}
                  feedbackValid="Looks good!"
                  feedbackInvalid="Please provide a Thumbnail Image"
                  required
                ></UploadImage> */}
              </div>
              <div>
                <CButton className="bg-base" type="submit">
                  Submit
                </CButton>
                <CButton onClick={() => navigate('/categories')} className="bg-secondary ms-3">
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

export default CategoryAdd
