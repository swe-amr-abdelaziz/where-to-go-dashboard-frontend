import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react'
import axiosInstance from 'src/Axios'

const TagDetails = () => {
  const { id } = useParams()
  const [tag, setTag] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    // Fetch tag details from the server using axios
    axiosInstance
      .get(`/api/v1/tags/${id}`)
      .then((res) => {
        setTag(res.data.data)
      })
      .catch((error) => console.log(error))
  }, [id])

  if (!tag) {
    return null // You can display a loading indicator here
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="m-3 p-4 shadow">
          <CCardHeader>
            <h3>Tag Details</h3>
          </CCardHeader>
          <CCardBody>
            <p>
              <strong>Name:</strong> {tag.name}
            </p>
            <p>
              <strong>Category:</strong> {tag.category.name}
            </p>
            <p>
              <strong>Created At:</strong> {tag.createdAt}
            </p>
            <p>
              <strong>Updated At:</strong> {tag.updatedAt}
            </p>
            <CButton onClick={() => navigate('/tags')} className="bg-secondary">
              Back
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default TagDetails
