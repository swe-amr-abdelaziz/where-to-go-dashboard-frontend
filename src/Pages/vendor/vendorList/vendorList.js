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
} from '@coreui/react'
import { PlusCircleFill, ThreeDotsVertical } from 'react-bootstrap-icons'

import axiosInstance from 'src/Axios'

import KebabMenu from 'src/components/KebabMenu'

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

  return (
    <CCard className="m-3 mb-5 p-4">
      <CCardBody>
        <div className="d-flex justify-content-between mb-4 mt-2">
          <h3>Vendors List</h3>
          <div className="d-flex justify-content-between">
            <CButton className="me-2 bg-success d-flex align-items-center">
              <PlusCircleFill className="me-1" />
              New
            </CButton>
            <CFormInput type="search" className="me-2" placeholder="Search" />
          </div>
        </div>
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
                  <ThreeDotsVertical />
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
