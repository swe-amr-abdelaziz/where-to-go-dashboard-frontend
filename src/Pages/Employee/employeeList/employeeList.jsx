import React, { useEffect, useRef, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBan,
  faCircleDot,
  faCircleInfo,
  faDollarSign,
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  activateEmployee,
  banEmployee,
  deactivateEmployee,
  deleteEmployee,
  getEmployees,
  setEmployee,
  unbanEmployee,
} from '../../../Redux/EmployeeSlice/employeeSlice'
import { useNavigate } from 'react-router-dom'
import { PlusCircleFill, ThreeDotsVertical } from 'react-bootstrap-icons'
import { Menu } from 'primereact/menu'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'

const EmployeeList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const employees = useSelector((state) => state.employee.employees)
  const [visible, setVisible] = React.useState(false)
  const [emp, setEmp] = useState(null)
  const [demployee, setDemployee] = React.useState(null)
  const menu = useRef(null)

  useEffect(() => {
    dispatch(getEmployees())
  }, [])

  const handleBanEmployee = () => {
    if (!emp.bannedAtt) {
      dispatch(banEmployee(emp._id))
    } else {
      dispatch(unbanEmployee(emp._id))
    }
  }

  const handleActiveEmployee = () => {
    if (!emp.deactivatedAt) {
      dispatch(deactivateEmployee(emp._id))
    } else {
      dispatch(activateEmployee(emp._id))
    }
  }

  const handleAddEmployee = () => {
    navigate('/employees/new')
  }

  const handleEditEmployee = () => {
    dispatch(setEmployee(emp))
    navigate(`/employees/edit`)
  }

  const checkDeleteEmployee = () => {
    setVisible(true)
    setDemployee(emp)
  }

  const handleDeleteEmployee = () => {
    dispatch(deleteEmployee(demployee._id))
    setVisible(false)
  }

  const actionsBodyTemplate = (rowData) => {
    return (
      <>
        <Menu
          model={[
            {
              label: 'Details',
              icon: 'pi pi-info-circle',
            },
            {
              label: 'Edit',
              icon: 'pi pi-pencil',
              command: (e) => handleEditEmployee(),
            },
            {
              label: 'Delete',
              icon: 'pi pi-trash',
              command: (e) => checkDeleteEmployee(),
            },
            {
              label: 'Unban / Ban',
              icon: 'pi pi-check',
              command: (e) => handleBanEmployee(),
            },
            {
              label: 'Activate/Deactivate',
              icon: 'pi pi-times',
              command: (e) => handleActiveEmployee(),
            },
          ]}
          popup
          ref={menu}
          id={`actions_${rowData.id}`}
        />
        <Button
          label={<ThreeDotsVertical />}
          icon=""
          className="mr-2 three-dots"
          onClick={(event) => {
            menu.current.toggle(event)
            setEmp(rowData)
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
            <h3>Employees List</h3>
            <div className="d-flex justify-content-between">
              <CButton
                className="me-2 bg-base d-flex align-items-center"
                onClick={handleAddEmployee}
              >
                <PlusCircleFill className="me-1" />
                New
              </CButton>
              <CFormInput type="search" className="me-2" placeholder="Search" />
            </div>
          </div>
        </CRow>
        <DataTable
          value={employees}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: '50rem' }}
        >
          <Column
            field="avatar"
            header="Avater"
            body={(employee) => (
              <img
                src={`http://localhost:8001/api/v1/images/employees/${employee.image}`}
                alt="avatar"
                className="avatar"
              />
            )}
            style={{ width: '5%' }}
          ></Column>
          <Column field="name" header="Name" style={{ width: '20%' }}></Column>
          <Column field="email" header="Email" style={{ width: '30%' }}></Column>
          <Column field="phoneNumber" header="Phone" style={{ width: '15%' }}></Column>
          <Column
            field="active"
            header="Active"
            body={(employee) => (
              <FontAwesomeIcon
                color={employee.deactivatedAt ? 'red' : 'green'}
                icon={faCircleDot}
              />
            )}
            bodyClassName="text-center"
            style={{ width: '5%' }}
          ></Column>
          <Column
            field="banned"
            header="Banned"
            body={(employee) => (
              <FontAwesomeIcon color={employee.bannedAtt ? 'red' : 'green'} icon={faCircleDot} />
            )}
            bodyClassName="text-center"
            style={{ width: '5%' }}
          ></Column>
          <Column
            field="role"
            header="Role"
            body={(employee) => <p className="mb-0">{employee.role.name}</p>}
            style={{ width: '10%' }}
          ></Column>
          <Column
            body={(employee) => actionsBodyTemplate(employee)}
            bodyClassName="text-center"
            style={{ width: '5%' }}
          ></Column>
        </DataTable>
      </CCardBody>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Warning !!! ????</CModalTitle>
        </CModalHeader>
        <CModalBody>You Sure Want To Delete : {demployee ? demployee.name : ''} ? </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setVisible(false)
              setEmployee(null)
            }}
          >
            Close
          </CButton>
          <CButton onClick={handleDeleteEmployee} color="danger">
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  )
}

export default EmployeeList
