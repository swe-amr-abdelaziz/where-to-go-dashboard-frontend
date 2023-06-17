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
  softDeleteCustomer,
  restoreCustomer,
} from '../../../Redux/CustomerSlice/customerSlice'

import WidgetsBrand from '../../../views/widgets/WidgetsBrand'
import WidgetsDropdown from '../../../views/widgets/WidgetsDropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCircle, faCircleDot, faTimes } from '@fortawesome/free-solid-svg-icons'
import { PlusCircleFill, ThreeDotsVertical } from 'react-bootstrap-icons'
import { array } from 'prop-types'

const CustomerList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const customers = useSelector((state) => state.customer.customers)
  const customer = useSelector((state) => state.customer.customer)
  const placeholderCustomer = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    bannedAt: null,
    deactivatedAt: null,
    image: '',
  }
  const [selectedCustomer, setSelectedCustomer] = useState(placeholderCustomer)
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)
  const menu = useRef([])

  useEffect(() => {
    dispatch(getCustomers())
  }, [])

  const avatarBodyTemplate = (customer) => {
    return (
      <CAvatar
        className={customer.deletedAt ? 'soft-delete' : ''}
        size="md"
        src={`http://localhost:8001/api/v1/images/customers/${customer.image}`}
      />
    )
  }

  const nameBodyTemplate = (customer) => {
    return (
      <strong
        className={customer.deletedAt ? 'soft-delete' : ''}
      >{`${customer.firstName} ${customer.lastName}`}</strong>
    )
  }

  const phoneBodyTemplate = (customer) => {
    return <span className={customer.deletedAt ? 'soft-delete' : ''}>{customer.phoneNumber}</span>
  }

  const emailBodyTemplate = (customer) => {
    return <span className={customer.deletedAt ? 'soft-delete' : ''}>{customer.email}</span>
  }

  const activeBodyTemplate = (customer) => {
    return (
      <FontAwesomeIcon
        className={customer.deletedAt ? 'soft-delete' : ''}
        color={customer.deactivatedAt ? 'red' : 'green'}
        icon={faCircleDot}
      />
    )
  }

  const bannedBodyTemplate = (customer) => {
    return (
      <FontAwesomeIcon
        className={customer.deletedAt ? 'soft-delete' : ''}
        color={customer.bannedAt ? 'red' : 'green'}
        icon={faCircleDot}
      />
    )
  }

  const handleDetails = async () => {
    await dispatch(getCustomer(selectedCustomer.id))
    setDetailsVisible(true)
  }

  const handleEditCustomer = async () => {
    await dispatch(getCustomer(selectedCustomer.id))
    navigate('/customers/edit')
  }

  const handleBanCustomer = async () => {
    if (!selectedCustomer.bannedAt) {
      dispatch(banCustomer(selectedCustomer.id))
    } else {
      dispatch(unbanCustomer(selectedCustomer.id))
    }
  }

  const handleActiveCustomer = async () => {
    if (!selectedCustomer.deactivatedAt) {
      dispatch(deactivateCustomer(selectedCustomer.id))
    } else {
      dispatch(activateCustomer(selectedCustomer.id))
    }
  }

  const handleDeleteCustomer = async () => {
    if (selectedCustomer.deletedAt) {
      dispatch(deleteCustomer(selectedCustomer.id))
      setDeleteVisible(false)
    }
  }

  const handleSoftDeleteCustomer = async () => {
    if (!selectedCustomer.deletedAt) {
      dispatch(softDeleteCustomer(selectedCustomer.id))
    }
  }

  const handleRestoreCustomer = async () => {
    if (selectedCustomer.deletedAt) {
      dispatch(restoreCustomer(selectedCustomer.id))
    }
  }

  const deleteFooterContent = (
    <div>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => setDeleteVisible(false)}
        className="bg-secondary"
      />
      <Button
        label="Delete"
        icon="pi pi-trash"
        onClick={() => handleDeleteCustomer()}
        className="p-button-danger"
      />
    </div>
  )

  const actionsBodyTemplate = (rowData) => {
    const _model = [
      {
        label: 'Details',
        icon: 'pi pi-info-circle',
        command: (e) => handleDetails(),
      },
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: (e) => handleEditCustomer(),
      },
      {
        label: selectedCustomer.deletedAt ? 'Delete Forever' : 'Soft Delete',
        icon: 'pi pi-trash',
        command: (e) => {
          selectedCustomer.deletedAt ? setDeleteVisible(true) : handleSoftDeleteCustomer()
        },
      },
      {
        label: selectedCustomer.bannedAt ? 'Unban' : 'Ban',
        icon: selectedCustomer.bannedAt ? 'pi pi-check' : 'pi pi-times',
        command: (e) => handleBanCustomer(),
      },
      {
        label: selectedCustomer.deactivatedAt ? 'Activate' : 'Deactivate',
        icon: selectedCustomer.deactivatedAt ? 'pi pi-check' : 'pi pi-times',
        command: (e) => handleActiveCustomer(),
      },
    ]

    if (selectedCustomer.deletedAt) {
      const restoreObject = {
        label: 'Restore',
        icon: 'pi pi-undo',
        command: (e) => handleRestoreCustomer(),
      }
      _model.splice(3, 0, restoreObject)
    }

    return (
      <>
        <Menu model={_model} popup ref={menu} id={`actions_${rowData.id}`} />
        <Button
          label={<ThreeDotsVertical />}
          icon=""
          className="mr-2 three-dots"
          onClick={(event) => {
            setSelectedCustomer(rowData)
            menu.current.toggle(event)
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
            <Column
              field="phoneNumber"
              header="Phone"
              body={phoneBodyTemplate}
              style={{ width: '15%' }}
            ></Column>
            <Column
              field="email"
              header="Email"
              body={emailBodyTemplate}
              style={{ width: '35%' }}
            ></Column>
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
                <td>{customer.firstName || ''}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{customer.email || ''}</td>
              </tr>
              <tr>
                <th>Role</th>
                <td>{customer.role || ''}</td>
              </tr>
              <tr>
                <th>City</th>
                <td>{customer.address ? customer.address.city : ''}</td>
              </tr>
              <tr>
                <th>Zip</th>
                <td>{customer.address ? customer.address.zip : ''}</td>
              </tr>
              <tr>
                <th>Deactivated At</th>
                <td>
                  {customer.deactivatedAt
                    ? new Date(customer.deactivatedAt).toLocaleDateString('en-UK')
                    : 'Activated'}
                </td>
              </tr>
              <tr>
                <th>Deleted At</th>
                <td>
                  {customer.deletedAt
                    ? new Date(customer.deletedAt).toLocaleDateString('en-UK')
                    : 'Not Deleted'}
                </td>
              </tr>
              <tr>
                <th>Gender</th>
                <td>{customer.gender || ''}</td>
              </tr>
            </tbody>
          </table>
          <table className="table mx-4">
            <tbody>
              <tr>
                <th>Last Name</th>
                <td>{customer.lastName || ''}</td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td>{customer.phoneNumber || ''}</td>
              </tr>
              <tr>
                <th>Country</th>
                <td>{customer.address ? customer.address.country : ''}</td>
              </tr>
              <tr>
                <th>State</th>
                <td>{customer.address ? customer.address.state : ''}</td>
              </tr>
              <tr>
                <th>Street</th>
                <td>{customer.address ? customer.address.street : ''}</td>
              </tr>
              <tr>
                <th>Banned At</th>
                <td>
                  {customer.bannedAt
                    ? new Date(customer.bannedAt).toLocaleDateString('en-UK')
                    : 'Not Banned'}
                </td>
              </tr>
              <tr>
                <th>Verified At</th>
                <td>
                  {customer.verifiedAt
                    ? new Date(customer.verifiedAt).toLocaleDateString('en-UK')
                    : 'Not Verified'}
                </td>
              </tr>
              <tr>
                <th>Date of Birth</th>
                <td>
                  {customer.dateOfBirth
                    ? new Date(customer.dateOfBirth).toLocaleDateString('en-UK')
                    : ''}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        header="Delete Customer"
        visible={deleteVisible}
        style={{ width: '50vw' }}
        onHide={() => setDeleteVisible(false)}
        footer={deleteFooterContent}
      >
        <p className="m-0">
          Are you sure you want to delete the customer &apos;
          <strong>
            {selectedCustomer.firstName} {selectedCustomer.lastName}
          </strong>
          &apos;? <br />
          <em className="text-danger">This action cannot be undone</em>
        </p>
      </Dialog>
    </>
  )
}

export default CustomerList
