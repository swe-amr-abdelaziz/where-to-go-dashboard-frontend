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
} from '@coreui/react'

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
    <CCard className="mb-4">
      <CCardBody>
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
            {vendorList.map((vendor) => {
              return (
                <CTableRow key={vendor.id}>
                  <CTableHeaderCell scope="row">1</CTableHeaderCell>
                  <CTableDataCell>Mark</CTableDataCell>
                  <CTableDataCell>Otto</CTableDataCell>
                  <CTableDataCell>@mdo</CTableDataCell>
                  <CTableDataCell>@mdo</CTableDataCell>
                  <CTableDataCell>
                    <KebabMenu></KebabMenu>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default VendorList
