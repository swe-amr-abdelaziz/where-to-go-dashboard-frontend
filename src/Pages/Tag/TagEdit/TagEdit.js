import { useParams } from 'react-router-dom'
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
  const { id } = useParams()
  const navigate = useNavigate()
  const [validated, setValidated] = useState(false)
  const [tagObject, setTagObject] = useState({
    name: '',
    category: {},
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
    // Fetch tag details from the server using axios
    axiosInstance
      .get(`/api/v1/tags/${id}`)
      .then((res) => {
        console.log(res.data.data)
        const { name, category } = res.data.data
        setTagObject({ name: res.data.data.name, category: res.data.data.category })
      })
      .catch((error) => console.log(error))
  }, [id])

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
    console.log(e.target.name)
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
      const name = tagObject.name
      const category = tagObject.category._id
      axiosInstance
        .put(`/api/v1/tags/${id}`, { name, category })
        .then((res) => {
          navigate(`/tags/${id}`)
        })
        .catch((error) => {
          console.log('============================')
          console.log(error)
          console.log('--------------------------')
          const errors = error.response.data.errors
          let tempError = {
            notValid: false,
            msg: '',
          }
          errors.forEach((err) => {
            console.log('+++++++++++++++++++++++++++++')
            console.log(err.msg)
            console.log('+++++++++++++++++++++++++++++')
            if (err.path === 'name') {
              tempError.name = {
                notValid: true,
                msg: err.msg,
              }
            } else if (err.path === 'categoryId') {
              tempError.categoryId = {
                notValid: true,
                msg: err.msg,
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
                feedbackInvalid={validationFromBackEnd.name?.msg}
                invalid={validationFromBackEnd.name?.notValid}
                name="name"
                value={tagObject.name}
                onChange={handleChange}
                required
              />
              <CFormLabel htmlFor="exampleFormControlInput1">Category</CFormLabel>
              <CFormSelect
                name="categoryId"
                feedbackInvalid={validationFromBackEnd.categoryId?.msg}
                invalid={validationFromBackEnd.categoryId?.notValid}
                value={tagObject.category._id}
                onChange={handleChange}
                required
              >
                <option value="category">Select a Category</option>
                {categories &&
                  categories.map((category) => {
                    console.log(category)
                    if (category.name === tagObject.category.name) {
                      return (
                        <option key={category._id} value={category._id} selected>
                          {category.name}
                        </option>
                      )
                    } else {
                      return (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      )
                    }
                  })}
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
