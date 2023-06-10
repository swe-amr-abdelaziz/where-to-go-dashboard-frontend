import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CRow,
  CFormInput,
} from '@coreui/react'
import { PlusCircleFill, PencilSquare, Trash } from 'react-bootstrap-icons'
import axiosInstance from 'src/Axios'

const TagList = () => {
  const [tagList, setTagList] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getTagsList()
  }, [])

  const getTagsList = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/tags')
      setTagList(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleShowTagDetails = (id) => {
    navigate(`/tags/${id}`)
  }

  const handleEditTag = (id) => {
    navigate(`/tags/${id}/edit`)
  }

  const handleDeleteTag = async (id) => {
    try {
      await axiosInstance.delete(`/api/v1/tags/${id}`)
      getTagsList()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <CCard className="m-3 mb-5 p-4 shadow">
      <CCardBody>
        <CRow>
          <div className="d-flex justify-content-between mb-4 mt-2">
            <h3>Tag List</h3>
            <div className="d-flex justify-content-between">
              <CButton
                className="me-2 bg-base d-flex align-items-center"
                onClick={() => navigate('/tags/create')}
              >
                <PlusCircleFill className="me-1" />
                New
              </CButton>
              <CFormInput type="search" className="me-2" placeholder="Search" />
            </div>
          </div>
        </CRow>
        <CTable striped hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Category</CTableHeaderCell>
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {tagList.map((tag) => (
              <CTableRow key={tag._id}>
                <CTableDataCell>{tag.name}</CTableDataCell>
                <CTableDataCell>{tag.category.name}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    className="me-2"
                    color="primary"
                    size="sm"
                    onClick={() => handleShowTagDetails(tag._id)}
                  >
                    Show Details
                  </CButton>
                  <CButton
                    className="me-2"
                    color="primary"
                    size="sm"
                    onClick={() => handleEditTag(tag._id)}
                  >
                    Edit
                  </CButton>
                  <CButton color="danger" size="sm" onClick={() => handleDeleteTag(tag._id)}>
                    Delete
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default TagList
