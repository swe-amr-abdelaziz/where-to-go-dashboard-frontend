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
import axiosInstance from 'src/Axios'
import { PlusCircleFill, ThreeDotsVertical, PencilSquare, Trash } from 'react-bootstrap-icons'

const CategoryList = () => {
  const [categoryList, setCategoryList] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getCategoriesList()
  }, [])

  const getCategoriesList = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/categories')
      setCategoryList(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleShowCategoryDetails = (id) => {
    navigate(`/categories/${id}`)
  }

  const handleEditCategory = (id) => {
    navigate(`/categories/${id}/edit`)
  }

  const handleDeleteCategory = async (id) => {
    try {
      await axiosInstance.delete(`/api/v1/categories/${id}`)
      getCategoriesList()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <CCard className="m-3 mb-5 p-4 shadow">
      <CCardBody>
        <CRow>
          <div className="d-flex justify-content-between mb-4 mt-2">
            <h3>Category List</h3>
            <div className="d-flex justify-content-between">
              <CButton
                className="me-2 bg-base d-flex align-items-center"
                onClick={() => navigate('/categories/create')}
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
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {categoryList.map((category) => (
              <CTableRow key={category._id}>
                <CTableDataCell>{category.name}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    className="me-2"
                    color="primary"
                    size="sm"
                    onClick={() => handleShowCategoryDetails(category._id)}
                  >
                    Show Details
                  </CButton>
                  <CButton
                    className="me-2"
                    color="primary"
                    size="sm"
                    onClick={() => handleEditCategory(category._id)}
                  >
                    <PencilSquare />
                  </CButton>
                  <CButton
                    color="danger"
                    size="sm"
                    onClick={() => handleDeleteCategory(category._id)}
                  >
                    <Trash />
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

export default CategoryList
