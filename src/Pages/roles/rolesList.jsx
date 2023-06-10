import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Menu } from 'primereact/menu'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import { Dialog } from 'primereact/dialog'
import { ThreeDotsVertical } from 'react-bootstrap-icons'
import { MultiSelect } from 'primereact/multiselect'

import { CButton, CFormInput, CFormLabel } from '@coreui/react'

import { getRoles, deleteRole } from '../../Redux/RolesSlice/rolesSlice'
import { getPermissions } from '../../Redux/PermissionsSlice/permissionsSlice'

const RolesList = () => {
  const dispatch = useDispatch()
  const roles = useSelector((state) => state.roles.roles)
  const permissions = useSelector((state) => state.permissions.permissions)
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const menu = useRef(null)
  const [currentRole, setCurrentRole] = useState({ permissions: [] })

  useEffect(() => {
    dispatch(getRoles())
    dispatch(getPermissions())
  }, [dispatch])

  const handleDetails = async () => {
    setDetailsVisible(true)
  }
  const handleEdit = async (roleId) => {
    setEditVisible(true)
  }

  const handleDelete = async (roleId) => {
    dispatch(deleteRole(roleId))
  }

  const handlePermissionsChange = (e) => {
    setCurrentRole((prevRole) => ({
      ...prevRole,
      permissions: e.value,
    }))
  }

  const actionsBodyTemplate = (rowData) => {
    return (
      <>
        <Menu
          model={[
            {
              label: 'Details',
              icon: 'pi pi-info-circle',
              command: (e) => {
                return handleDetails(rowData._id)
              },
            },
            {
              label: 'Edit',
              icon: 'pi pi-pencil',
              command: (e) => handleEdit(rowData._id),
            },
            {
              label: 'Delete',
              icon: 'pi pi-trash',
              command: (e) => handleDelete(rowData._id),
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
      <DataTable
        value={roles}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: '50rem' }}
      >
        <Column field="name" header="Name" style={{ width: '50%' }}></Column>
        <Column
          body={actionsBodyTemplate}
          bodyClassName="text-center"
          style={{ width: '30%' }}
        ></Column>
      </DataTable>

      <Dialog
        header="Role Details"
        visible={detailsVisible}
        style={{ width: '50vw' }}
        onHide={() => setDetailsVisible(false)}
      >
        <p className="m-0">
          <strong>Permission Names:</strong>
          <br />
          {currentRole.permissions.map((el) => (
            <>
              {el.name} <br />
            </>
          ))}
        </p>
      </Dialog>

      <Dialog
        header="Edit Role Details"
        visible={editVisible}
        style={{ width: '50vw' }}
        onHide={() => setEditVisible(false)}
      >
        <CFormLabel htmlFor="exampleFormControlInput1">Role Name</CFormLabel>

        <CFormInput
          className="ms-2"
          type="text"
          placeholder="Role Name"
          value={currentRole.name}
          aria-label="default input example"
        />
        <br />
        <CFormLabel htmlFor="exampleFormControlInput1">Role Permissions</CFormLabel>
        <MultiSelect
          value={currentRole.permissions}
          onChange={handlePermissionsChange}
          options={permissions}
          optionLabel="name"
          filter
          placeholder="Select Permissions"
          maxSelectedLabels={3}
          className="w-full md:w-20rem"
        />
        {console.log(currentRole.permissions)}
        <div>
          <CButton className="bg-base">Submit</CButton>
        </div>
      </Dialog>
    </>
  )
}

export default RolesList
