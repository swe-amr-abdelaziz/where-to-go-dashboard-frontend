import React, { useEffect, useState, useRef } from 'react'
import {
  CCard,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormInput,
  CButton,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CNav,
  CNavItem,
  CNavLink,
} from '@coreui/react'
import {
  PlusCircleFill,
  ThreeDotsVertical,
  PencilSquare,
  EyeFill,
  Trash,
} from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import axiosInstance from 'src/Axios'
import { Column } from 'primereact/column'
import { Menu } from 'primereact/menu'
import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'

const VendorList = () => {
  const [vendorList, setVendorList] = useState([])
  const [id, setId] = useState(null)

  useEffect(() => {
    getVendorsList()
  }, [])

  const getVendorsList = async () => {
    await axiosInstance
      .get('/api/v1/vendors')
      .then((res) => {
        console.log(res.data.data)
        setVendorList(res.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleDelete = async (id) => {
    await axiosInstance
      .patch(`api/v1/vendors/${id}/deactivate`)
      .then((res) => console.log(res))
      .catch((error) => console.log(error))
  }

  const navigate = useNavigate()
  const menu = useRef(null)

  const actionsBodyTemplate = (rowData) => {
    return (
      <>
        <Menu
          model={[
            {
              label: 'Details',
              icon: 'pi pi-info-circle',
              command: (e) => {
                console.log(e)
              },
            },
            {
              label: 'Edit',
              icon: 'pi pi-pencil',
              command: (e) => {
                navigate('/customers/edit')
              },
            },
            // {
            //   label: rowData.deactivatedAt ? 'Activate' : 'Deactivate',
            //   icon: rowData.deactivatedAt ? 'pi pi-check' : 'pi pi-times',
            //   command: (e) => {
            //     navigate('/customers/edit')
            //   },
            // },
          ]}
          popup
          ref={menu}
          id={`actions_${rowData.id}`}
        />
        <Button
          label={<ThreeDotsVertical />}
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
    <CCard className="m-3 mb-5 p-4 shadow">
      <CCardBody>
        <div className="d-flex justify-content-between mb-4 mt-2">
          <h3>Vendors List</h3>
          <div className="d-flex justify-content-between">
            <Link to="/vendors/create">
              <CButton className="me-2 bg-base d-flex align-items-center">
                <PlusCircleFill className="me-1" />
                New
              </CButton>
            </Link>
            <CFormInput type="search" className="me-2" placeholder="Search" />
          </div>
        </div>
        <CNav variant="underline">
          <CNavItem>
            <CNavLink href="#" active>
              Active
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Link</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Link</CNavLink>
          </CNavItem>
        </CNav>
        {/* <div className="d-flex justify-content-start">
          <div>
            <span className="badge badge-pill bg-success me-1 p-2">
              <strong>All Vendors</strong>
            </span>
            <span className="badge badge-pill bg-primary mx-1 p-2">
              <strong>Approved</strong>
            </span>
            <span className="badge badge-pill bg-secondary ms-1 p-2">
              <strong>Not Approved</strong>
            </span>
          </div>
        </div> */}
        <CTable striped hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Place</CTableHeaderCell>
              <CTableHeaderCell scope="col">Owner</CTableHeaderCell>
              <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Approved</CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {vendorList.map((vendor) => (
              <CTableRow key={vendor._id}>
                <CTableHeaderCell scope="row">{vendor.placeName}</CTableHeaderCell>
                <CTableDataCell>{vendor.firstName + ' ' + vendor.lastName}</CTableDataCell>
                <CTableDataCell>{vendor.phoneNumber}</CTableDataCell>
                <CTableDataCell>{vendor.email}</CTableDataCell>
                <CTableDataCell>{vendor.isApproved}</CTableDataCell>
                <CTableDataCell>
                  <Column
                    body={actionsBodyTemplate}
                    bodyClassName="text-center"
                    style={{ width: '50%' }}
                  ></Column>
                  {/* <CDropdown>
                    <CDropdownToggle color="secondary">
                      <ThreeDotsVertical />
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem href="#">
                        <EyeFill className="me-2 text-primary" />
                        View
                      </CDropdownItem>
                      <CDropdownItem href="#">
                        <PencilSquare className="me-2 text-secondary" />
                        Edit
                      </CDropdownItem>
                      <CDropdownItem onClick={() => handleDelete(vendor._id)}>
                        <Trash className="me-2 text-danger" />
                        Delete
                      </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown> */}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default VendorList
