import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'
import axiosInstance from 'src/Axios'

const CategoryEdit = () => {
  const { id } = useParams()
  const [category, setCategory] = useState(null)
  const [name, setName] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    // Fetch category details from the server using axios
    axiosInstance
      .get(`/api/v1/categories/${id}`)
      .then((res) => {
        setCategory(res.data.data)
        setName(res.data.data.name)
      })
      .catch((error) => console.log(error))
  }, [id])

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Update category details on the server using axios
    axiosInstance
      .put(`/api/v1/categories/${id}`, { name })
      .then((res) => {
        navigate(`/categories/${id}`)
      })
      .catch((error) => console.log(error))
  }

  if (!category) {
    return null // You can display a loading indicator here
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="m-3 p-4 shadow">
          <CCardHeader>
            <h3>Edit Category</h3>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CFormLabel htmlFor="name">Name</CFormLabel>
              <CFormInput
                type="text"
                id="name"
                placeholder="Category Name"
                value={name}
                onChange={handleNameChange}
                required
              />
              <CButton className="mt-3" type="submit" color="primary">
                Save
              </CButton>
              <CButton onClick={() => navigate('/categories')} className="bg-secondary mt-3 ms-3">
                Back
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CategoryEdit
