import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Menu } from 'primereact/menu'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import { Dialog } from 'primereact/dialog'
import { ThreeDotsVertical, PlusCircle } from 'react-bootstrap-icons'

import { CButton, CFormInput, CFormLabel } from '@coreui/react'

import {
  getPermissions,
  deletePermission,
  updatePermission,
  createPermission,
} from '../../Redux/PermissionsSlice/permissionsSlice'
import { ThreeCircles } from 'react-loader-spinner'

const PermissionsList = () => {
  const dispatch = useDispatch()
  const permissions = useSelector((state) => state.permissions.permissions)
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const menu = useRef(null)
  const [currentPermission, setCurrentPermission] = useState({
    name: '', // Provide a default value for name
    description: '',
    permissions: [], // Provide a default value for description
  })
  const [createVisible, setCreateVisible] = useState(false)
  const [createvalidationFromBackEnd, setCreateValidationFromBackEnd] = useState({
    name: {
      notValid: false,
      msg: 'Please Insert Permision Name',
    },
    description: {
      notValid: false,
      msg: 'Please Provide Permision Description',
    },
  })
  const [editValidationFromBackEnd, setEditValidationFromBackEnd] = useState({
    name: {
      notValid: false,
      msg: 'Please Insert Permision Name',
    },
    description: {
      notValid: false,
      msg: 'Please Provide Permision Description',
    },
  })

  useEffect(() => {
    dispatch(getPermissions())
  }, [dispatch])

  const handleDetails = (permission) => {
    setDetailsVisible(true)
    // Use 'permission' parameter instead of 'currentPermission'
  }

  const handleEdit = (permission) => {
    setEditVisible(true)
    // Use 'permission' parameter instead of 'currentPermission'
  }
  const handleCreate = () => {
    setCurrentPermission({
      name: '',
      description: '',
    })
    setCreateVisible(true)
  }

  const handleCreatePermission = () => {
    dispatch(createPermission(currentPermission)).then((res) => {
      if (!res.payload.errors) {
        setCreateVisible(false)
      } else {
        const errors = res.payload.errors
        // console.log(errors)
        const tempError = {}
        errors.forEach((error) => {
          if (error.path === 'name') {
            tempError.name = {
              notValid: true,
              msg: error.msg,
            }
          } else if (error.path === 'description') {
            tempError.description = {
              notValid: true,
              msg: error.msg,
            }
          }
        })
        setCreateValidationFromBackEnd(tempError)
      }
    })
  }

  const handleDelete = (rowData) => {
    if (rowData && rowData._id) {
      console.log('Deleting permission:', rowData)

      dispatch(deletePermission(rowData._id)).then((action) => {
        const { meta, error } = action
        if (!error && meta.requestStatus === 'fulfilled') {
        }
      })
    }
  }

  const handlePermissionNameChange = (e) => {
    setCurrentPermission((prevPermission) => ({
      ...prevPermission,
      name: e.target.value,
    }))
  }

  const handlePermissionDescriptionChange = (e) => {
    setCurrentPermission((prevPermission) => ({
      ...prevPermission,
      description: e.target.value,
    }))
  }

  const handleUpdatePermission = () => {
    dispatch(updatePermission(currentPermission)).then((res) => {
      if (!res.payload.errors) {
        setEditVisible(false)
      } else {
        const errors = res.payload.errors
        // console.log(errors)
        const tempError = {}
        errors.forEach((error) => {
          if (error.path === 'name') {
            tempError.name = {
              notValid: true,
              msg: error.msg,
            }
          } else if (error.path === 'description') {
            tempError.description = {
              notValid: true,
              msg: error.msg,
            }
          }
        })
        setEditValidationFromBackEnd(tempError)
        console.log(tempError)
      }
    })
  }
  // if (permissions.loading) {
  //   return <div>Loading...</div>
  // }

  // if (!permissions || permissions.length === 0) {
  //   return <div>No permissions available.</div>
  // }

  const actionsBodyTemplate = (rowData) => {
    return (
      <>
        <Menu
          model={[
            {
              label: 'Details',
              icon: 'pi pi-info-circle',
              command: () => handleDetails(rowData),
            },
            {
              label: 'Edit',
              icon: 'pi pi-pencil',
              command: () => handleEdit(rowData),
            },
            {
              label: 'Delete',
              icon: 'pi pi-trash',
              command: () => handleDelete(rowData),
            },
          ]}
          popup
          ref={menu}
          id={`actions_${rowData._id}`}
        />
        <Button
          label={<ThreeDotsVertical />}
          icon=""
          className="mr-2 three-dots"
          onClick={(event) => {
            menu.current.toggle(event)
            setCurrentPermission(rowData)
          }}
          aria-controls={`actions_${rowData._id}`}
          aria-haspopup
        />
      </>
    )
  }

  return (
    <>
      <div className="mb-4">
        <CButton className="bg-success text-white" onClick={handleCreate}>
          <PlusCircle className="me-2" />
          Create
        </CButton>
      </div>
      {permissions.length === 0 ? (
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
            value={permissions}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: '50rem' }}
          >
            <Column field="name" header="Name" style={{ width: '50%' }}></Column>
            <Column field="description" header="Description" style={{ width: '50%' }}></Column>
            <Column
              body={actionsBodyTemplate}
              bodyClassName="text-center"
              style={{ width: '30%' }}
            ></Column>
          </DataTable>
        </>
      )}
      <Dialog
        header="Create Permission"
        visible={createVisible}
        style={{ width: '50vw' }}
        onHide={() => setCreateVisible(false)}
      >
        <CFormLabel htmlFor="createPermissionName">Permission Name</CFormLabel>
        <CFormInput
          className="ms-2"
          type="text"
          placeholder="Permission Name"
          value={currentPermission.name}
          aria-label="Permission Name"
          onChange={handlePermissionNameChange}
          pattern="[A-Za-z\s]+"
          notValid={createvalidationFromBackEnd.name.notValid}
          feedbackInvalid={createvalidationFromBackEnd.name?.msg || 'Please Provide Permision Name'}
        />
        <br />
        <CFormLabel htmlFor="createPermissionDescription">Permission Description</CFormLabel>
        <CFormInput
          id="createPermissionDescription"
          className="ms-2"
          type="text"
          placeholder="Permission Description"
          value={currentPermission.description}
          aria-label="Permission Description"
          onChange={handlePermissionDescriptionChange}
        />
        <br />
        <div>
          <CButton className="bg-base" onClick={handleCreatePermission}>
            Create
          </CButton>
        </div>
      </Dialog>

      <Dialog
        header="Permission Details"
        visible={detailsVisible}
        style={{ width: '50vw' }}
        onHide={() => setDetailsVisible(false)}
      >
        <p className="m-0">
          <strong>Name:</strong>
          <br />
          {currentPermission.name}
        </p>
        <p className="m-0 mt-3">
          <strong>Description:</strong>
          <br />
          {currentPermission.description}
        </p>
      </Dialog>

      <Dialog
        header="Edit Permission Details"
        visible={editVisible}
        style={{ width: '50vw' }}
        onHide={() => setEditVisible(false)}
      >
        <CFormLabel htmlFor="permissionName">Permission Name</CFormLabel>
        <CFormInput
          id="permissionName"
          className="ms-2"
          type="text"
          placeholder="Permission Name"
          value={currentPermission.name}
          aria-label="Permission Name"
          onChange={handlePermissionNameChange}
        />
        <br />
        <CFormLabel htmlFor="permissionDescription">Permission Description</CFormLabel>
        <CFormInput
          id="permissionDescription"
          className="ms-2"
          type="text"
          placeholder="Permission Description"
          value={currentPermission.description}
          aria-label="Permission Description"
          onChange={handlePermissionDescriptionChange}
        />
        <br />
        <div>
          <CButton className="bg-base" onClick={handleUpdatePermission}>
            Submit
          </CButton>
        </div>
      </Dialog>
    </>
  )
}

export default PermissionsList
