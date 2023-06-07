import React, { useEffect } from 'react'
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
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload, cilPeople } from '@coreui/icons'
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
import { PlusCircleFill } from 'react-bootstrap-icons'

const EmployeeList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const employees = useSelector((state) => state.employee.employees)
  const [visible, setVisible] = React.useState(false)
  const [demployee, setDemployee] = React.useState(null)

  useEffect(() => {
    dispatch(getEmployees())
  }, [])

  const handleBanEmployee = (employee) => {
    if (!employee.bannedAtt) {
      dispatch(banEmployee(employee._id))
    } else {
      dispatch(unbanEmployee(employee._id))
    }
  }

  const handleActiveEmployee = (employee) => {
    if (!employee.deactivatedAt) {
      dispatch(deactivateEmployee(employee._id))
    } else {
      dispatch(activateEmployee(employee._id))
    }
  }

  const handleAddEmployee = () => {
    navigate('/employees/new')
  }

  const handleEditEmployee = (employee) => {
    dispatch(setEmployee(employee))
    navigate(`/employees/edit`)
  }

  const checkDeleteEmployee = (employee) => {
    setVisible(true)
    setDemployee(employee)
  }

  const handleDeleteEmployee = () => {
    dispatch(deleteEmployee(demployee._id))
    setVisible(false)
  }

  return (
    <CCard className="m-3 mb-5 p-4">
      <CCardBody>
        <CRow>
          <div className="d-flex justify-content-between mb-4 mt-2">
            <h3>Employees List</h3>
            <div className="d-flex justify-content-between">
              <CButton
                className="me-2 bg-success d-flex align-items-center"
                onClick={() => navigate('/employees')}
              >
                <PlusCircleFill className="me-1" />
                New
              </CButton>
              <CFormInput type="search" className="me-2" placeholder="Search" />
            </div>
          </div>
        </CRow>
        <CTable align="middle" className="border mt-4" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell className="text-center" scope={'col'}>
                Avatar
              </CTableHeaderCell>
              <CTableHeaderCell className="text-center" scope={'col'}>
                Name
              </CTableHeaderCell>
              <CTableHeaderCell className="text-center" scope={'col'}>
                Email
              </CTableHeaderCell>
              <CTableHeaderCell className="text-center" scope={'col'}>
                Phone
              </CTableHeaderCell>
              <CTableHeaderCell className="text-center" scope={'col'}>
                Active
              </CTableHeaderCell>
              <CTableHeaderCell className="text-center" scope={'col'}>
                Banned
              </CTableHeaderCell>
              <CTableHeaderCell className="text-center" scope={'col'}>
                Role
              </CTableHeaderCell>
              <CTableHeaderCell className="text-center" scope={'col'}>
                Actions
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {employees.map((employee) => (
              <CTableRow key={employee._id}>
                <CTableHeaderCell className="text-center" scope={'row'}>
                  <img
                    style={{ width: 60, height: 60, borderRadius: '50%' }}
                    src={`http://localhost:8001/api/v1/images/employees/${employee.image}`}
                    alt="employee avatar"
                  />
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" scope={'row'}>
                  {employee.name}
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" scope={'row'}>
                  {employee.email}
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" scope={'row'}>
                  {employee.phoneNumber}
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" scope={'row'}>
                  <FontAwesomeIcon
                    color={employee.deactivatedAt ? 'red' : 'green'}
                    icon={faCircleDot}
                  />
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" scope={'row'}>
                  <FontAwesomeIcon
                    color={employee.bannedAtt ? 'red' : 'green'}
                    icon={faCircleDot}
                  />
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" scope={'row'}>
                  {employee.role.name}
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" scope={'row'}>
                  <CButton
                    title={'Show Details'}
                    color="primary"
                    variant={'outline'}
                    className="me-1"
                  >
                    <FontAwesomeIcon icon={faCircleInfo} />
                  </CButton>
                  <CButton
                    title={'Edit Employee'}
                    color="secondary"
                    variant={'outline'}
                    className="me-1"
                    onClick={() => handleEditEmployee(employee)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </CButton>
                  <CButton
                    title={'Delete Employee'}
                    color="danger"
                    variant={'outline'}
                    onClick={() => checkDeleteEmployee(employee)}
                    className="me-1"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </CButton>
                  <CButton
                    title={'Ban / Unban Employee'}
                    color="secondary"
                    variant={'outline'}
                    className="me-1"
                    onClick={() => handleBanEmployee(employee)}
                  >
                    <FontAwesomeIcon icon={faBan} />
                  </CButton>
                  <CButton
                    title={'Activate / Deactivate Employee'}
                    color="info"
                    variant={'outline'}
                    className="me-1"
                    onClick={() => handleActiveEmployee(employee)}
                  >
                    <FontAwesomeIcon icon={faDollarSign} />
                  </CButton>
                </CTableHeaderCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
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
