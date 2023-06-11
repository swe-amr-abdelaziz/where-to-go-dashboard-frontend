import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Menu } from 'primereact/menu'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import { MultiSelect } from 'primereact/multiselect'
import { Dialog } from 'primereact/dialog'
import { ThreeDotsVertical, PlusCircle } from 'react-bootstrap-icons'

import { CButton, CFormLabel, CFormInput } from '@coreui/react'

import { getRoles, deleteRole, updateRole, createRole } from '../../Redux/RolesSlice/rolesSlice'
import { getPermissions } from '../../Redux/PermissionsSlice/permissionsSlice'

const RolesList = () => {
  const dispatch = useDispatch()
  const roles = useSelector((state) => state.roles.roles)
  const permissions = useSelector((state) => state.permissions.permissions)
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [currentRole, setCurrentRole] = useState({
    name: '',
    permissions: [],
  })
  const [createVisible, setCreateVisible] = useState(false)
  const [selectedPermissions, setSelectedPermissions] = useState(null) // New state for selected permissions

  useEffect(() => {
    dispatch(getRoles())
    dispatch(getPermissions()) // Fetch permissions from the backend
  }, [dispatch])

  useEffect(() => {
    dispatch(getRoles())
  }, [dispatch])

  const handleCreate = () => {
    setCurrentRole({
      name: '',
      permissions: [],
    })
    setSelectedPermissions([]) // Initialize selected permissions
    setCreateVisible(true)
  }

  const handleCreateRole = async () => {
    const newRole = {
      ...currentRole,
      permissions: selectedPermissions,
    }
    await dispatch(createRole(newRole)).unwrap()
    setCreateVisible(false)
    dispatch(getRoles())
  }

  const handleDelete = async (rowData) => {
    if (rowData && rowData._id) {
      console.log('Deleting role:', rowData)

      try {
        await dispatch(deleteRole(rowData._id))
        dispatch(getRoles()) // Fetch roles again after deletion
      } catch (error) {
        // Handle error
      }
    }
  }

  const handleRoleNameChange = (e) => {
    setCurrentRole((prevRole) => ({
      ...prevRole,
      name: e.target.value,
    }))
  }

  const handleUpdateRole = async () => {
    const updatedRole = {
      _id: currentRole._id,
      name: currentRole.name,
    }

    try {
      await dispatch(updateRole(updatedRole)).unwrap()
      setEditVisible(false)
      dispatch(getRoles())
    } catch (error) {
      // Handle error
    }
  }

  if (roles.loading) {
    return <div>Loading...</div>
  }

  if (!roles || roles.length === 0) {
    return <div>No roles available.</div>
  }
  const ActionsBodyTemplate = (rowData) => {
    const menuRef = useRef(null)

    const handleDetails = () => {
      setDetailsVisible(true)
      setCurrentRole(rowData)
    }

    const handleEdit = () => {
      setEditVisible(true)
      setCurrentRole(rowData)
    }

    const handleDeleteRole = () => {
      handleDelete(rowData)
    }

    return (
      <>
        <Menu
          model={[
            {
              label: 'Details',
              icon: 'pi pi-info-circle',
              command: handleDetails,
            },
            {
              label: 'Edit',
              icon: 'pi pi-pencil',
              command: handleEdit,
            },
            {
              label: 'Delete',
              icon: 'pi pi-trash',
              command: handleDeleteRole,
            },
          ]}
          popup
          ref={menuRef}
          id={`actions_${rowData._id}`}
        />
        <Button
          label={<ThreeDotsVertical />}
          icon=""
          className="mr-2 three-dots"
          onClick={(event) => {
            menuRef.current.toggle(event)
            setCurrentRole(rowData)
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
      <DataTable
        value={roles}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: '50rem' }}
      >
        <Column field="name" header="Name" style={{ width: '50%' }}></Column>
        <Column
          body={ActionsBodyTemplate}
          bodyClassName="text-center"
          style={{ width: '30%' }}
        ></Column>
      </DataTable>
      <Dialog
        header="Create Role"
        visible={createVisible}
        style={{ width: '50vw' }}
        onHide={() => setCreateVisible(false)}
      >
        <CFormLabel htmlFor="createRoleName">Role Name</CFormLabel>
        <CFormInput
          id="createRoleName"
          className="ms-2"
          type="text"
          placeholder="Role Name"
          value={currentRole.name}
          aria-label="Role Name"
          onChange={handleRoleNameChange}
          pattern="[A-Za-z\s]+"
          title="Only text characters are allowed"
        />
        <br />
        <CFormLabel htmlFor="createRolePermissions">Permissions</CFormLabel>
        <MultiSelect
          id="createRolePermissions"
          className="ms-2"
          value={selectedPermissions}
          options={permissions}
          onChange={(e) => setSelectedPermissions(e.value)}
          optionLabel="name"
          optionValue="_id"
          placeholder="Select Permissions"
          filter
          showClear
          style={{ width: '100%' }}
          scrollHeight="200px"
        />
        <br />
        <div>
          <CButton className="bg-base" onClick={handleCreateRole}>
            Create
          </CButton>
        </div>
      </Dialog>

      <Dialog
        header="Role Details"
        visible={detailsVisible}
        style={{ width: '50vw' }}
        onHide={() => setDetailsVisible(false)}
      >
        <div className="m-0">
          <strong>Name:</strong>
          <br />
          {currentRole.name}
        </div>
        <div className="m-0 mt-3">
          <strong>Permissions:</strong>
          <br />
          <ul>
            {currentRole.permissions.map((permission) => {
              return (
                <li key={permission._id} style={{ marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 'bold' }}>{permission.name}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </Dialog>

      <Dialog
        header="Edit Role Details"
        visible={editVisible}
        style={{ width: '50vw' }}
        onHide={() => setEditVisible(false)}
      >
        <CFormLabel htmlFor="roleName">Role Name</CFormLabel>
        <CFormInput
          id="roleName"
          className="ms-2"
          type="text"
          placeholder="Role Name"
          value={currentRole.name}
          aria-label="Role Name"
          onChange={handleRoleNameChange}
        />
        <br />
        <div>
          <CButton className="bg-base" onClick={handleUpdateRole}>
            Submit
          </CButton>
        </div>
      </Dialog>
    </>
  )
}

export default RolesList
