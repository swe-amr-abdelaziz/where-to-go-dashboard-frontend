import React, { useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
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
  banEmployee,
  getEmployees,
  unbanEmployee,
} from '../../../Redux/EmployeeSlice/employeeSlice'

const EmployeeList = () => {
  const dispatch = useDispatch()
  const employees = useSelector((state) => state.employee.employees)

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

  return (
    <CCard className="mb-4">
      <CCardBody>
        <CRow>
          <CCol sm={5}>
            <h3 id="users-list" className="card-title mb-0">
              Employees List
            </h3>
          </CCol>
          <CCol sm={7} className="d-none d-md-block">
            <CButton color="primary" className="float-end">
              <FontAwesomeIcon icon={faPlus} />
            </CButton>
          </CCol>
        </CRow>
        <CTable align="middle" hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope={'col'}>Avatar</CTableHeaderCell>
              <CTableHeaderCell scope={'col'}>Name</CTableHeaderCell>
              <CTableHeaderCell scope={'col'}>Email</CTableHeaderCell>
              <CTableHeaderCell scope={'col'}>Phone</CTableHeaderCell>
              <CTableHeaderCell scope={'col'}>Active</CTableHeaderCell>
              <CTableHeaderCell scope={'col'}>Banned</CTableHeaderCell>
              <CTableHeaderCell scope={'col'}>Role</CTableHeaderCell>
              <CTableHeaderCell scope={'col'}>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {employees.map((employee) => (
              <CTableRow key={employee._id}>
                <CTableHeaderCell scope={'row'}>
                  <img
                    style={{ width: 60, height: 60, borderRadius: '50%' }}
                    src={`http://localhost:8001/api/v1/images/employees/${employee.image}`}
                  />
                </CTableHeaderCell>
                <CTableHeaderCell scope={'row'}>{employee.name}</CTableHeaderCell>
                <CTableHeaderCell scope={'row'}>{employee.email}</CTableHeaderCell>
                <CTableHeaderCell scope={'row'}>{employee.phoneNumber}</CTableHeaderCell>
                <CTableHeaderCell scope={'row'}>
                  <FontAwesomeIcon
                    color={employee.deactivatedAt ? 'red' : 'green'}
                    icon={faCircleDot}
                  />
                </CTableHeaderCell>
                <CTableHeaderCell scope={'row'}>
                  <FontAwesomeIcon
                    color={employee.bannedAtt ? 'red' : 'green'}
                    icon={faCircleDot}
                  />
                </CTableHeaderCell>
                <CTableHeaderCell scope={'row'}>{employee.role.name}</CTableHeaderCell>
                <CTableHeaderCell scope={'row'}>
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
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </CButton>
                  <CButton
                    title={'Delete Employee'}
                    color="danger"
                    variant={'outline'}
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
                  >
                    <FontAwesomeIcon icon={faDollarSign} />
                  </CButton>
                </CTableHeaderCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default EmployeeList
