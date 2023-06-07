import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormInput,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import {
  activateCustomer,
  banCustomer,
  deactivateCustomer,
  deleteCustomer,
  getCustomers,
  getCustomer,
  unbanCustomer,
} from '../../Redux/CustomerSlice/customerSlice'

import WidgetsBrand from '../../views/widgets/WidgetsBrand'
import WidgetsDropdown from '../../views/widgets/WidgetsDropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { PlusCircleFill, ThreeDotsVertical } from 'react-bootstrap-icons'

const CustomerList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const customers = useSelector((state) => state.customer.customers)
  const [visible, setVisible] = React.useState(false)
  const [dcustomer, setDcustomer] = React.useState(null)

  useEffect(() => {
    dispatch(getCustomers())
  }, [])

  return (
    <>
      {/* <WidgetsDropdown /> */}
      <CCard className="m-3 mb-5 p-4 shadow">
        <CCardBody>
          <CRow>
            <div className="d-flex justify-content-between mb-4 mt-2">
              <h3>Customers List</h3>
              <div className="d-flex justify-content-between">
                <CButton
                  className="me-2 bg-base d-flex align-items-center"
                  onClick={() => navigate('/employees')}
                >
                  <PlusCircleFill className="me-1" />
                  New
                </CButton>
                <CFormInput type="search" className="me-2" placeholder="Search" />
              </div>
            </div>
          </CRow>
          <CTable align="middle" className="mt-4 mb-2 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center">
                  {/* <CIcon icon={cilPeople} /> */}
                </CTableHeaderCell>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Phone</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Banned</CTableHeaderCell>
                <CTableHeaderCell></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {customers.map((customer) => (
                <CTableRow key={customer.id}>
                  <CTableDataCell className="text-center">
                    <CAvatar
                      size="md"
                      src={`http://localhost:8001/api/v1/images/customers/${customer.image}`}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>
                      <strong>{`${customer.firstName} ${customer.lastName}`}</strong>
                    </div>
                    {/* <div className="small text-medium-emphasis">
                      <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                      {item.user.registered}
                    </div> */}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div>{customer.phoneNumber}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="clearfix">
                      <div className="float-start">
                        <div>{customer.email}</div>
                      </div>
                      <div className="float-end">
                        {/* <small className="text-medium-emphasis">{item.usage.period}</small> */}
                      </div>
                    </div>
                    {/* <CProgress thin color={item.usage.color} value={item.usage.value} /> */}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <FontAwesomeIcon
                      size="xs"
                      color={customer.bannedAt ? 'red' : 'green'}
                      icon={faCircle}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <ThreeDotsVertical />
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default CustomerList
