import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Menu } from 'primereact/menu'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import { Dialog } from 'primereact/dialog'

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
} from '../../../Redux/CustomerSlice/customerSlice'

import WidgetsBrand from '../../../views/widgets/WidgetsBrand'
import WidgetsDropdown from '../../../views/widgets/WidgetsDropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleDot } from '@fortawesome/free-solid-svg-icons'
import { PlusCircleFill, ThreeDotsVertical } from 'react-bootstrap-icons'

const CustomerList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const customers = useSelector((state) => state.customer.customers)
  const customer = useSelector((state) => state.customer.customer)
  const [id, setId] = useState(null)
  const [detailsVisible, setDetailsVisible] = React.useState(false)
  const menu = useRef(null)

  useEffect(() => {
    dispatch(getCustomers())
  }, [])

  const avatarBodyTemplate = (customer) => {
    return (
      <CAvatar size="md" src={`http://localhost:8001/api/v1/images/customers/${customer.image}`} />
    )
  }

  const nameBodyTemplate = (customer) => {
    return <strong>{`${customer.firstName} ${customer.lastName}`}</strong>
  }

  const activeBodyTemplate = (customer) => {
    return <FontAwesomeIcon color={customer.deactivatedAt ? 'red' : 'green'} icon={faCircleDot} />
  }

  const bannedBodyTemplate = (customer) => {
    return <FontAwesomeIcon color={customer.bannedAt ? 'red' : 'green'} icon={faCircleDot} />
  }

  const handleDetails = async () => {
    await dispatch(getCustomer(id))
    setDetailsVisible(true)
  }

  const actionsBodyTemplate = (rowData) => {
    return (
      <>
        <Menu
          model={[
            {
              label: 'Details',
              icon: 'pi pi-info-circle',
              command: (e) => handleDetails(),
            },
            {
              label: 'Edit',
              icon: 'pi pi-pencil',
              command: (e) => {
                navigate('/customers/edit')
              },
            },
            {
              label: rowData.deletedAt ? 'Delete Permanently' : 'Soft Delete',
              icon: 'pi pi-trash',
              command: (e) => {
                navigate('/customers/edit')
              },
            },
            {
              label: rowData.bannedAt ? 'Unban' : 'Ban',
              icon: rowData.bannedAt ? 'pi pi-check' : 'pi pi-times',
              command: (e) => {
                navigate('/customers/edit')
              },
            },
            {
              label: rowData.deactivatedAt ? 'Activate' : 'Deactivate',
              icon: rowData.deactivatedAt ? 'pi pi-check' : 'pi pi-times',
              command: (e) => {
                navigate('/customers/edit')
              },
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
            setId(rowData.id)
          }}
          aria-controls={`actions_${rowData.id}`}
          aria-haspopup
        />
      </>
    )
  }

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
                  onClick={() => navigate('/customers/new')}
                >
                  <PlusCircleFill className="me-1" />
                  New
                </CButton>
                <CFormInput type="search" className="me-2" placeholder="Search" />
              </div>
            </div>
          </CRow>
          <DataTable
            value={customers}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: '50rem' }}
          >
            <Column
              field="avatar"
              header=""
              body={avatarBodyTemplate}
              style={{ width: '5%' }}
            ></Column>
            <Column
              field="name"
              header="Name"
              body={nameBodyTemplate}
              style={{ width: '30%' }}
            ></Column>
            <Column field="phoneNumber" header="Phone" style={{ width: '15%' }}></Column>
            <Column field="email" header="Email" style={{ width: '35%' }}></Column>
            <Column
              field="active"
              header="Active"
              body={activeBodyTemplate}
              bodyClassName="text-center"
              style={{ width: '5%' }}
            ></Column>
            <Column
              field="banned"
              header="Banned"
              body={bannedBodyTemplate}
              bodyClassName="text-center"
              style={{ width: '5%' }}
            ></Column>
            <Column
              body={actionsBodyTemplate}
              bodyClassName="text-center"
              style={{ width: '5%' }}
            ></Column>
          </DataTable>
        </CCardBody>
      </CCard>
      <Dialog
        header="Customer Details"
        visible={detailsVisible}
        style={{ width: '50vw' }}
        onHide={() => setDetailsVisible(false)}
      >
        <p className="m-0">
          <strong>First Name:</strong> {customer.firstName}
          <strong>Last Name:</strong> {customer.lastName}
        </p>
      </Dialog>
    </>
  )
}

export default CustomerList
