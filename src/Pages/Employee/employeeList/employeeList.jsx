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
import { Dialog } from 'primereact/dialog'
import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { ThreeCircles } from 'react-loader-spinner'

const EmployeeList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const employees = useSelector((state) => state.employee.employees)
  const [visible, setVisible] = React.useState(false)
  const [detailsVisible, setDetailsVisible] = React.useState(false)
  const [emp, setEmp] = useState({})
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })
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

  const handleSearch = (e) => {
    const value = e.target.value
    let _filters = { ...filters }

    _filters['global'].value = value

    setFilters(_filters)
    setSearch(value)
  }

  const actionsBodyTemplate = (rowData) => {
    return (
      <>
        <Menu
          model={[
            {
              label: 'Details',
              icon: 'pi pi-info-circle',
              command: (e) => setDetailsVisible(true),
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
              label: emp.bannedAtt ? 'Unban' : 'Ban',
              icon: 'pi pi-check',
              command: (e) => handleBanEmployee(),
            },
            {
              label: emp.deactivatedAt ? 'Activate' : 'Deactivate',
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
              <CFormInput
                type="search"
                value={search}
                onChange={(e) => handleSearch(e)}
                className="me-2"
                placeholder="Search"
              />
            </div>
          </div>
        </CRow>

        {employees.length === 0 ? (
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
              value={employees}
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ minWidth: '50rem' }}
              filters={filters}
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
                  <FontAwesomeIcon
                    color={employee.bannedAtt ? 'red' : 'green'}
                    icon={faCircleDot}
                  />
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
                header={'Actions'}
                body={(employee) => actionsBodyTemplate(employee)}
                bodyClassName="text-center"
                style={{ width: '5%' }}
              ></Column>
            </DataTable>
          </>
        )}
      </CCardBody>
      {/* Details Dialog */}
      <Dialog
        header="Customer Details"
        visible={detailsVisible}
        style={{ width: '75vw' }}
        onHide={() => setDetailsVisible(false)}
      >
        <div className="details-table d-flex flex-column flex-lg-row justify-content-between align-items-center">
          <table className="table mx-4">
            <tbody>
              <tr>
                <th>First Name</th>
                <td>{emp.name || ''}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{emp.email || ''}</td>
              </tr>
              <tr>
                <th>Role</th>
                <td>{emp.role?.name || ''}</td>
              </tr>
              <tr>
                <th>City</th>
                <td>{emp.address ? emp.address.city : ''}</td>
              </tr>
              <tr>
                <th>Deactivated At</th>
                <td>
                  {emp.deactivatedAt
                    ? new Date(emp.deactivatedAt).toLocaleDateString('en-UK')
                    : 'Activated'}
                </td>
              </tr>
              <tr>
                <th>Gender</th>
                <td>{emp.gender || ''}</td>
              </tr>
            </tbody>
          </table>
          <table className="table mx-4">
            <tbody>
              <tr>
                <th>Phone Number</th>
                <td>{emp.phoneNumber || ''}</td>
              </tr>
              <tr>
                <th>Country</th>
                <td>{emp.address ? emp.address.country : ''}</td>
              </tr>
              <tr>
                <th>City</th>
                <td>{emp.address ? emp.address.city : ''}</td>
              </tr>
              <tr>
                <th>Street</th>
                <td>{emp.address ? emp.address.street : ''}</td>
              </tr>
              <tr>
                <th>Banned At</th>
                <td>
                  {emp.bannedAt ? new Date(emp.bannedAt).toLocaleDateString('en-UK') : 'Not Banned'}
                </td>
              </tr>
              <tr>
                <th>Date of Birth</th>
                <td>
                  {emp.dateOfBirth ? new Date(emp.dateOfBirth).toLocaleDateString('en-UK') : ''}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Dialog>

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
