import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react'
import axiosInstance from 'src/Axios'

const CategoryDetails = () => {
  const { id } = useParams()
  const [category, setCategory] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    // Fetch category details from the server using axios
    axiosInstance
      .get(`/api/v1/categories/${id}`)
      .then((res) => {
        setCategory(res.data.data)
      })
      .catch((error) => console.log(error))
  }, [id])

  if (!category) {
    return null // You can display a loading indicator here
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="m-3 p-4 shadow">
          <CCardHeader>
            <h3>Category Details</h3>
          </CCardHeader>
          <CCardBody>
            <p>
              <strong>ID:</strong> {category._id}
            </p>
            <p>
              <strong>Name:</strong> {category.name}
            </p>
            <p>
              <strong>Created At:</strong> {category.createdAt}
            </p>
            <p>
              <strong>Updated At:</strong> {category.updatedAt}
            </p>
            <CButton onClick={() => navigate('/categories')} className="bg-secondary">
              Back
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CategoryDetails
