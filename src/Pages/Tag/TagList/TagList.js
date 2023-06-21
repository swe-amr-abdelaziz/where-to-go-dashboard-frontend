import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { CCard, CCardBody, CButton, CRow, CFormInput } from '@coreui/react'
import { Column } from 'primereact/column'
import { Menu } from 'primereact/menu'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { PlusCircleFill, ThreeDotsVertical } from 'react-bootstrap-icons'
import axiosInstance from 'src/Axios'
import { ThreeCircles } from 'react-loader-spinner'

const TagList = () => {
  const [tagList, setTagList] = useState([])
  const [selectedTag, setSelectedTag] = useState(null)
  const menu = useRef(null)
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

  const actionsBodyTemplate = (rowData) => {
    const _model = [
      {
        label: 'Details',
        icon: 'pi pi-info-circle',
        command: (e) => {
          handleShowTagDetails(selectedTag._id)
        },
      },
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: (e) => {
          handleEditTag(selectedTag._id)
        },
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
        command: (e) => {
          handleDeleteTag(selectedTag._id)
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
            setSelectedTag(rowData)
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
        {tagList.length === 0 ? (
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
              value={tagList}
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

export default TagList
