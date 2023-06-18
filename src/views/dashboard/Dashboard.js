import React from 'react'

import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CProgress,
  CRow,
} from '@coreui/react'
import { CChart, CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload } from '@coreui/icons'

import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const customerReports = useSelector((state) => state.statistics.customers)
  const vendorReports = useSelector((state) => state.statistics.vendors)
  const topPlaces = useSelector((state) => state.statistics.places)
  const logedInUser = useSelector((state) => state.notification.role)
  const newCustomers = useSelector((state) => state.statistics.newCustomers)
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  return (
    <>
      {logedInUser === 'Employee' ? (
        <>
          <CRow>
            <CCol className="mb-4" sm={6} lg={4}>
              <CChart
                type="doughnut"
                data={{
                  labels: ['Verified Customers', 'Deleted Customers', 'banned Customers', 'Rest'],
                  datasets: [
                    {
                      data: [
                        customerReports.verifiedCustomers,
                        customerReports.deletedCustomers,
                        customerReports.bannedCustomers,
                        customerReports.totalCustomers -
                          (customerReports.verifiedCustomers +
                            customerReports.deletedCustomers +
                            customerReports.bannedCustomers),
                      ],
                      backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#00D8FF'],
                    },
                  ],
                }}
              />
            </CCol>
            <CCol className="mb-4" sm={6} lg={4}>
              <CChart
                type="doughnut"
                data={{
                  labels: ['Approved Vendors', 'Not Approved', 'banned Vendors', 'Rest'],
                  datasets: [
                    {
                      data: [
                        (
                          (vendorReports.approvedVendors / vendorReports.totalVendors) *
                          100
                        ).toFixed(2),
                        (
                          (customerReports.deletedCustomers / customerReports.totalCustomers) *
                          100
                        ).toFixed(2),
                        (
                          (customerReports.bannedCustomers / customerReports.totalCustomers) *
                          100
                        ).toFixed(2),
                        (
                          100 -
                          ((customerReports.deletedCustomers +
                            customerReports.bannedCustomers +
                            customerReports.verifiedCustomers) /
                            customerReports.totalCustomers) *
                            100
                        ).toFixed(2),
                      ],
                      backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#00D8FF'],
                    },
                  ],
                }}
              />
            </CCol>
            <CCol className="mb-4" sm={6} lg={4}>
              <CChart
                type="doughnut"
                data={{
                  labels: [
                    topPlaces[0].placeName,
                    topPlaces[1].placeName,
                    topPlaces[2].placeName,
                    topPlaces[3].placeName,
                    topPlaces[4].placeName,
                  ],
                  datasets: [
                    {
                      data: [
                        topPlaces[0].numberOfReviews,
                        topPlaces[1].numberOfReviews,
                        topPlaces[2].numberOfReviews,
                        topPlaces[3].numberOfReviews,
                        topPlaces[4].numberOfReviews,
                      ],
                      backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB'],
                    },
                  ],
                }}
              />
            </CCol>
          </CRow>
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0">
                    New Users
                  </h4>
                  <div className="small text-medium-emphasis">Jan - Dec 2021</div>
                </CCol>
                <CCol sm={7} className="d-none d-md-block">
                  <CButtonGroup className="float-end me-3">
                    {['Month', 'Year'].map((value) => (
                      <CButton
                        color="outline-secondary"
                        key={value}
                        className="mx-0"
                        active={value === 'Year'}
                      >
                        {value}
                      </CButton>
                    ))}
                  </CButtonGroup>
                </CCol>
              </CRow>
              <CChart
                type="bar"
                data={{
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                  ],
                  datasets: [
                    {
                      label: 'New Users',
                      backgroundColor: '#f87979',
                      data: [
                        newCustomers[0].newUsers,
                        newCustomers[1].newUsers,
                        newCustomers[2].newUsers,
                        newCustomers[3].newUsers,
                        newCustomers[4].newUsers,
                        newCustomers[5].newUsers,
                        newCustomers[6].newUsers,
                        newCustomers[7].newUsers,
                        newCustomers[8].newUsers,
                        newCustomers[9].newUsers,
                        newCustomers[10].newUsers,
                        newCustomers[11].newUsers,
                      ],
                    },
                  ],
                }}
                labels="Months"
              />
            </CCardBody>
          </CCard>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default Dashboard
