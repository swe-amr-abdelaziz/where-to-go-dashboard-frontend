import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { CCard, CCardBody, CButton, CRow, CFormInput } from '@coreui/react'
import { Column } from 'primereact/column'
import { Menu } from 'primereact/menu'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import axiosInstance from 'src/Axios'
import { PlusCircleFill, ThreeDotsVertical } from 'react-bootstrap-icons'
import { ThreeCircles } from 'react-loader-spinner'

const CategoryList = () => {
  const [categoryList, setCategoryList] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const menu = useRef(null)
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

  const actionsBodyTemplate = (rowData) => {
    const _model = [
      {
        label: 'Details',
        icon: 'pi pi-info-circle',
        command: (e) => {
          handleShowCategoryDetails(selectedCategory._id)
        },
      },
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: (e) => {
          handleEditCategory(selectedCategory._id)
        },
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
        command: (e) => {
          handleDeleteCategory(selectedCategory._id)
        },
      },
    ]

    return (
      <>
        <Menu model={_model} popup ref={menu} id={`actions_${rowData.id}`} />
        <Button
          label={<ThreeDotsVertical />}
          icon=""
          className="mr-2 three-dots"
          onClick={(event) => {
            setSelectedCategory(rowData)
            menu.current.toggle(event)
          }}
          aria-controls={`actions_${rowData.id}`}
          aria-haspopup
        />
      </>
    )
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
        {categoryList.length === 0 ? (
          <div className="d-flex justify-content-center align-items-center my-5">
            <ThreeCircles
              height="100"
              width="100"
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor=""
              innerCircleColor=""
              middleCircleColor=""
            />
          </div>
        ) : (
          <>
            <DataTable
              value={categoryList}
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ minWidth: '50rem' }}
            >
              <Column field="name" header="Name" style={{ width: '15%' }}></Column>
              <Column
                body={actionsBodyTemplate}
                bodyClassName="text-center"
                style={{ width: '5%' }}
              ></Column>
            </DataTable>
          </>
        )}
      </CCardBody>
    </CCard>
  )
}

export default CategoryList
