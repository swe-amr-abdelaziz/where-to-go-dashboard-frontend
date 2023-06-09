import React, { useEffect, useState } from 'react'
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

const VendorList = () => {
  const [vendorList, setVendorList] = useState([])

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

  return (
    <CCard className="m-3 mb-5 p-4">
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
                  <CDropdown>
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
                  </CDropdown>
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
