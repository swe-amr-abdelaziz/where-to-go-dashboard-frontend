import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from 'src/Axios'

const TagAdd = () => {
  const navigate = useNavigate()
  const [validated, setValidated] = useState(false)
  const [tagObject, setTagObject] = useState({
    name: '',
    category: '',
  })
  const [categories, setCategories] = useState([])
  const [validationFromBackEnd, setValidationFromBackEnd] = useState({
    name: {
      notValid: false,
      msg: 'Please Provide Tag Name',
    },
    categoryId: {
      notValid: false,
      msg: 'Please Choose Category ',
    },
  })

  useEffect(() => {
    // Fetch categories from the server using axios
    axiosInstance
      .get('/api/v1/categories')
      .then((res) => {
        setCategories(res.data.data)
      })
      .catch((error) => console.log(error))
  }, [])

  const handleChange = (e) => {
    setTagObject((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
    console.log(tagObject)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(tagObject)
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)
    if (form.checkValidity() === true) {
      axiosInstance
        .post('/api/v1/tags', tagObject)
        .then((res) => {
          navigate(`/tags`)
        })
        .catch((error) => {
          console.log(error)
          const errors = error.response.data.errors
          let tempError = {}
          errors.forEach((error) => {
            if (error.path === 'name') {
              tempError.name = {
                notValid: true,
                msg: error.msg,
              }
            }
            if (error.path === 'categoryId') {
              tempError.categoryId = {
                notValid: true,
                msg: error.msg,
              }
            }
          })
          setValidationFromBackEnd(tempError)
        })
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="m-3 mb-5 p-4 shadow">
          <CCardBody>
            <h3 className="mb-4 mt-2">New Tag</h3>
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Tag Name"
                feedbackInvalid={validationFromBackEnd.name.msg}
                invalid={validationFromBackEnd.name.notValid}
                name="name"
                value={tagObject.name}
                onChange={handleChange}
                required
              />
              <CFormLabel htmlFor="exampleFormControlInput1">Category</CFormLabel>
              <CFormSelect
                name="categoryId"
                feedbackInvalid={validationFromBackEnd.categoryId.msg}
                invalid={validationFromBackEnd.categoryId.notValid}
                value={tagObject.category._id}
                onChange={handleChange}
                required
              >
                <option value="category">Select a Category</option>
                {categories &&
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
              </CFormSelect>
              <div>
                <CButton className="bg-base" type="submit">
                  Submit
                </CButton>
                <CButton onClick={() => navigate('/tags')} className="bg-secondary ms-3">
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

export default TagAdd
